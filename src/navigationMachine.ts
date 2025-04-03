// navigationMachine.ts
import { setup, createMachine, fromPromise, assign } from 'xstate'
import { Character } from '@/types'
import fetchCharactersPromise from './services/fetchCharacters'
import {
  addFavCharactersToStorage,
  getCharacters,
  getFavCharacters,
} from './services/asyncStorage'

export const navigationMachine = setup({
  types: {
    context: {} as {
      characters: Character[]
      selectedCharacter: Character | null
      favouriteCharacters: Character[]
    },
  },
  actors: {
    fetchCharacters: fromPromise(fetchCharactersPromise),
    getCharactersFromStorageActor: fromPromise(async () => {
      console.log('Attempting to load characters from AsyncStorage...')
      const chars = await getCharacters() // Llama a tu función de AsyncStorage
      console.log(`Loaded ${chars.length} characters from AsyncStorage.`)

      return chars ?? []
    }),
    getFavCharactersFromStorageActor: fromPromise(async () => {
      console.log('Attempting to load characters from AsyncStorage...')
      const favCharacters = await getFavCharacters() // Llama a tu función de AsyncStorage
      console.log(
        `Loaded ${favCharacters.length} characters from AsyncStorage.`
      )

      return favCharacters ?? []
    }),
  },
  guards: {
    characterExists: ({ context, event }) =>
      context.characters.some((c) => c.id === event.characterId),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDsCGA3AllVAXTA9sgHQA2BqEmyUAxBEWMdegQNZMy4DCAFqgCdUAY1xgBsANoAGALqJQABwKxM+IgpAAPRAEYArADZiAFgAcJowE4AzGatWzAdn1OANCACeek9NO6AJmldaTMbQ0N9XRMAXxiPNCwcdRJySmo6cQECAWJFUjwAMxyAW2IuPkERMQkZeSQQZVUUzR0EAFoAwytiSJMHG2kA4cNQkw9vBH19M2JdbtHIgP0bG364hIxsPEJUiioaAGVcHNQYekZmZFYOcrAefiFRcVgAMWyS49OYAEFRHLqmiaal2rT00j80ksTjMgSsvmkRgmiBMhl0xBs+gCtkCkTMhhsThsGxAiW2KTI+wyXyE5yyOTyBVwxQEZQqj2qL3eBE+J1pYD+fMBDWBLQabUMZn0cwCunmJiceP0DmRCEJfhMATCIX0wRsBmWJLJyV2xF4PLAtEOAFEADLW7gAFQA+twABI-ABKPyd1s9wqUKhBGnFiCcuh6UUMMLlyxCFlVZj8azMsNG0nh+KlRq2JqIxGEHOeAgAIvdUJhSLQAHI-ABqAEkAOI-R3W51ugDyAFlrQHGkGxaA2grjC4I1KrCFHFZVYFZk4rIuQnZNbCwnF4qSCBA4JpjTsQ4HmqDQx0VrNpoZZbDCRE0ar2gYnL1LKNdc4Y9JDDmkoe9ukNBAoOp7Dog7T9H4V43rod4RN+j5OMmIwWEhWI2FYATEluB4UmkBxQDSZxgMBJ5HtoYaWMQWr2NMLgwlis5eIgMzJmiirRk4JgGOEv7kqa5olCRIogeRbRYrMkpIbYS66C4NiqgEirEGYXT9C4KzLD+OG5v+BZFjUZa4BWpCkcGyBggg5jGGsuhJqO9hdAEqqaqYgz2Nx0jLpY+ixJuQA */
  id: 'navigation',
  initial: 'loading',
  context: {
    characters: [],
    selectedCharacter: null,
    favouriteCharacters: [],
  },
  states: {
    loading: {
      invoke: {
        id: 'getCharacters',
        src: 'fetchCharacters',
        onDone: {
          target: 'home',
          actions: assign({
            characters: ({ event }) => event.output,
          }),
        },
        onError: {
          target: 'loadingStorage',
          actions: () => console.error('Failed to fetch characters from API'),
        },
      },
    },
    loadingStorage: {
      invoke: {
        id: 'getCharactersFromStorageActor',
        src: 'getCharactersFromStorageActor',
        onDone: {
          target: 'home',
          actions: assign({
            characters: ({ event }) => event.output,
          }),
        },
        onError: {
          target: 'home',
          actions: () =>
            console.error('Failed to fetch characters from Storage'),
        },
      },
    },
    home: {
      invoke: {
        id: 'getFavCharactersFromStorageActor',
        src: 'getFavCharactersFromStorageActor',
        onDone: {
          actions: assign({
            favouriteCharacters: ({ event }) => event.output,
          }),
        },
        onError: {
          actions: () =>
            console.error('Failed to fetch characters from Storage'),
        },
      },
      on: {
        SELECT_CHARACTER: {
          target: 'characterDetail',
          guard: 'characterExists',
          actions: assign({
            selectedCharacter: ({ context, event }) =>
              context.characters.find((c) => c.id === event.characterId)!,
          }),
        },
        TOGGLE_FAVOURITE_CHARACTER: {
          actions: assign({
            favouriteCharacters: ({ context, event }) => {
              const isAlreadyFavourite = context.favouriteCharacters.some(
                (favChar) => favChar.id === event.character.id
              )

              if (isAlreadyFavourite) {
                return context.favouriteCharacters.filter(
                  (char) => char.id !== event.character.id
                )
              } else {
                addFavCharactersToStorage(event.character)
                return [event.character, ...context.favouriteCharacters]
              }
            },
          }),
        },
      },
    },
    characterDetail: {
      on: {
        NAVIGATE_HOME: 'home',
      },
    },
  },
})
