import { createMachine } from 'xstate'

export const toggleMachine = createMachine({
  id: 'toggle',
  tsTypes: {} as import('./ToggleMachine.typegen').Typegen0,
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
