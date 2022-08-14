import { TRPCClient } from '@trpc/client'
import { assign, createMachine } from 'xstate'
import { AppRouter } from '../server/router'

export type ToggleMachineData = {
  state: 'on' | 'off'
  count: number
}

export type ToggleMachineContext = {
  client?: TRPCClient<AppRouter>
  data: ToggleMachineData
}

export type ToggleMachineEvent =
  | {
      type: 'TOGGLE'
    }
  | {
      type: 'SETUP'
      client: TRPCClient<AppRouter>
      data: ToggleMachineData
    }
  | {
      type: 'UPDATE_DATA'
      data: ToggleMachineData
    }

export const toggleMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswDoCWAdnsngIaZ4BehUAxAMoCiAKgKoAKioADqrMXlQEuIAB6IAjADYJOAOwBOOQAYJADjUAWCQt0BmAEwAaEAE9EBvQFYcavfasS5Vlwd0GAvh5NoM2HKgAZoG0zADyAOIRADKMIrz8JEIi4ghymlI4ClZ6ygpqclKWBjIm5gjqBjjKNTU5ClKaqsqaXj7oWLhCoZExcUggCQLJA6npmdm5+YXFpWYWUgrVtQZNLVJqynpybSC+nTjcAE6oAG54-EI0tPF8w8KjiJpWyjjPehK5yquWVpplFictns1jkEkcCimu322FoHAAIgBBZiMAD6SOYiNuiUED1AqU0bhwEiaVkWz0JaiKAIqnl2BFQEDgIhhuEIAnIVBo2PuKSechpBjkehwIOsuk0HzkBjU0I6-iCgR5STxYkQVM0xIKFKaSnBVkFzmBDglUplcr8XVVQxVfIQjU1kwkyg0zsUAvmCCFIrFVlNTnN3j28twxzOF1x3IGNtxdo+slqNQMxX0Bs93tFIL9CklAdlQdZytjjy9ehpzqWuirOU0ily6i8XiAA */
  createMachine(
    {
      context: {
        client: undefined,
        data: {
          state: 'off',
          count: 0,
        },
      } as ToggleMachineContext,
      tsTypes: {} as import('./ToggleMachine.typegen').Typegen0,
      schema: {
        events: {} as ToggleMachineEvent,
      },
      predictableActionArguments: true,
      id: 'toggle',
      initial: 'initializing',
      on: {
        UPDATE_DATA: {
          actions: 'updateData',
        },
      },
      states: {
        initializing: {
          on: {
            SETUP: {
              actions: ['setClient', 'updateData'],
              target: 'provisioning',
            },
          },
        },
        off: {
          on: {
            TOGGLE: {
              actions: 'toggle',
              target: 'on',
            },
          },
        },
        on: {
          on: {
            TOGGLE: {
              actions: 'toggle',
              target: 'off',
            },
          },
        },
        provisioning: {
          always: [
            {
              cond: 'isOn',
              target: 'on',
            },
            {
              target: 'off',
            },
          ],
        },
      },
    },
    {
      actions: {
        setClient: assign({
          client: (_, event) => {
            return event.client
          },
        }),
        updateData: assign({
          data: (_, event) => {
            return event.data
          },
        }),
      },
      guards: {
        isOn: context => {
          return context.data.state === 'on'
        },
      },
    }
  )
