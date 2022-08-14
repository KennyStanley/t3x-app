import { createRouter } from './context'
import { z } from 'zod'

export const machineRouter = createRouter()
  .query('state', {
    async resolve({ ctx }) {
      try {
        const machine = await ctx.prisma.machine.findFirst({
          where: { name: 'toggle' },
          select: { state: true },
        })
        return machine?.state
      } catch (error) {
        console.error('error', error)
      }
    },
  })
  .mutation('toggle', {
    async resolve({ ctx }) {
      try {
        const toggleMachine = await ctx.prisma.machine.findFirst({
          select: { state: true },
          where: { name: 'toggle' },
        })
        if (!toggleMachine) return
        return await ctx.prisma.machine.updateMany({
          where: { name: 'toggle' },
          data: { state: toggleMachine.state === 'on' ? 'off' : 'on' },
        })
      } catch (error) {
        console.error('error', error)
      }
    },
  })
