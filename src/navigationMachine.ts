// navigationMachine.ts
import { setup, createMachine, fromPromise, assign } from 'xstate'
import { Character } from '@/types'
import fetchCharactersPromise from './services/fetchCharacters'

export const navigationMachine = setup({
  types: {
    context: {} as {
      characters: Character[]
      selectedCharacter: Character | null
    },
  },
  actors: {
    fetchCharacters: fromPromise(fetchCharactersPromise),
  },
}).createMachine({
  id: 'navigation',
  initial: 'loading',
  context: {
    characters: [],
    selectedCharacter: null,
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
          target: 'home', // or an error state.
          actions: () => console.error('Failed to fetch characters'),
        },
      },
    },
    home: {
      on: {
        SELECT_CHARACTER: {
          target: 'characterDetail',
          actions: assign({
            selectedCharacter: ({ context, event }) =>
              context.characters.find((c) => c.id === event.characterId) ||
              null,
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
