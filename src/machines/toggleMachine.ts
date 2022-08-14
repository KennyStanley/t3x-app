import { createMachine } from 'xstate'

export const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'off',
  states: {
    off: {
      on: {
        TOGGLE: {
          target: 'on',
        },
      },
    },
    on: {
      on: {
        TOGGLE: {
          target: 'off',
        },
      },
    },
  },
})
