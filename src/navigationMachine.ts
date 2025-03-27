import { createMachine } from 'xstate'

export const navigationMachine = createMachine({
  id: 'navigation',
  initial: 'splash',
  states: {
    splash: {
      on: {
        TIMEOUT: 'home',
      },
    },
    home: {
      on: {
        NAVIGATE_SECONDARY: 'secondary',
      },
    },
    secondary: {
      on: {
        NAVIGATE_HOME: 'home',
      },
    },
  },
})
