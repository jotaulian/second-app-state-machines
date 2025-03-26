// App.tsx
import React from 'react'
import { useMachine } from '@xstate/react'
import { navigationMachine } from '@/navigationMachine'
import { SplashScreen } from '@/components/SpashScreen'
import { HomeScreen } from '@/components/HomeScreen'
import { SecondaryScreen } from '@/components/SecondaryScreen'

export default function App() {
  const [state, send] = useMachine(navigationMachine)

  if (state.matches('splash')) {
    return <SplashScreen onTimeout={() => send({ type: 'TIMEOUT' })} />
  }

  if (state.matches('home')) {
    return (
      <HomeScreen
        onNavigateToSecondary={() => send({ type: 'NAVIGATE_SECONDARY' })}
      />
    )
  }

  if (state.matches('secondary')) {
    return (
      <SecondaryScreen
        onNavigateToHome={() => send({ type: 'NAVIGATE_HOME' })}
      />
    )
  }

  return null
}
