import { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useMachine } from '@xstate/react'
import { Zap, ZapOff } from 'react-feather'
import { toggleMachine } from '../machines/ToggleMachine'
import { trpc } from '../utils/trpc'

// import { inspect } from '@xstate/inspect'
// if (typeof window !== 'undefined') {
//   inspect({
//     url: 'https://stately.ai/viz?inspect',
//     iframe: false,
//   })
// }

const Home: NextPage = () => {
  const utils = trpc.useContext()

  const machine = trpc.useQuery(['machine.data'])
  const machineToggle = trpc.useMutation(['machine.toggle'], {
    onSuccess() {
      utils.invalidateQueries(['machine.data'])
    },
  }).mutate

  // Setup the machine
  const [state, send] = useMachine(toggleMachine, {
    devTools: false,
    actions: {
      toggle: () => machineToggle(),
    },
  })

  // Runs first time the component is rendered to setup the machine
  useEffect(() => {
    if (utils.client && machine.data) {
      send('SETUP', {
        client: utils.client,
        data: machine.data,
      })
    }
  }, [utils.client, machine.data, send])

  // Runs when the trpc data changes
  useEffect(() => {
    if (machine.data) {
      send('UPDATE_DATA', {
        data: machine.data,
      })
    }
  }, [machine.data, send])

  return (
    <>
      <Head>
        <title>Create T3X App</title>
        <meta name="description" content="t3x-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center h-screen p-4">
        <div id="icon" className="relative">
          <div
            className={`absolute -inset-1 rounded-full transition-all duration-300 blur-xl ${
              state.matches('on') && 'bg-amber-600'
            }`}
          ></div>
          <div className="relative">
            {state.matches('on') ? <Zap size={150} /> : <ZapOff size={150} />}
          </div>
        </div>
        <span id="spacer" className="my-2" />
        <h1 className="text-3xl font-bold">{JSON.stringify(state.value)}</h1>
        <span id="spacer" className="my-6" />
        <button
          onClick={() => send('TOGGLE')}
          className="bg-gray-600 hover:bg-gray-500 active:bg-gray-400 rounded-xl px-4 py-2 transition-all duration-300 hover:shadow-2xl"
        >
          Toggle State
        </button>
        <span id="spacer" className="my-8" />
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-200">
          <span className="text-purple-400">T3X</span> App
        </h1>
        <span id="spacer" className="my-2" />
        <div className="text-lg text-blue-400 flex justify-center items-center w-full">
          {machine.data ? (
            <>
              <h2 className="text-2xl mr-4">From tRPC: </h2>
              <div className="flex flex-col items-center border-2 rounded-xl p-2">
                <p>state: {machine.data.state}</p>
                <p>count: {machine.data.count}</p>
              </div>
            </>
          ) : (
            <p>Loading..</p>
          )}
        </div>
      </main>
    </>
  )
}

export default Home
