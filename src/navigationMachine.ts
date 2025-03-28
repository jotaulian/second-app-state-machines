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
  guards: {
    characterExists: ({ context, event }) =>
      context.characters.some((c) => c.id === event.characterId),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDsCGA3AllVAXTA9sgHQA2BqEmyUAxBEWMdegQNZMy4DCAFqgCdUAY1xgBsANoAGALqJQABwKxM+IgpAAPRAGYA7LuIAOXQFYAnAEZjxgGwAmK2el27AGhABPRA4d3iXQtXSwAWXTtpUP07XQBfOM80LBx1EnJKajpxAQIBYkVSPAAzPIBbYi4+QRExCRl5JBBlVTTNHQQDUOIXO1DjfStpV1c7M08fTrMzQLNnfQcLQYdpJYSkjGw8QhJeAjKwWgBlAFEAGRPuABUAfW4ACQBBACVH65Pnhs0WtR32xAWARcxjMjmM0n80n0FgmemIDn0lnBFgG-XMfXWIGSWzSxGE-CEonEABEwLhUJhSLQAHKPABqAEkAOKPK4nG73ADyAFkTl8mj82k0OnMZqEVrFQtJnA5dNFYQgrH5AvpQnYQRYzLoHNFQmYEoksQQIHBNNjUn8BSpfhphYgALT+fQmHVhKxWcUDUwK+3GbpROwWFYWXQRfzOTHm7ZEMgUKg0b7WoWgDqOqwWF16iyhd2e-Te7y+KImUKhFE50MRaS6YyRzYWmN7A6J1qWlMAsYmaRmBx+8OuGwKvzGeFlpZmMv9GJWfR1lLRkj4mpEgSk8mUls25D-BA96TEYYg6TGINQj36BXhQIWaz6O92eYPqwGuJAA */
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
          guard: 'characterExists',
          actions: assign({
            selectedCharacter: ({ context, event }) =>
              context.characters.find((c) => c.id === event.characterId)!,
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
