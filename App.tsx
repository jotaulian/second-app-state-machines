// App.tsx
import React from 'react'
import { useMachine } from '@xstate/react'
import { navigationMachine } from '@/navigationMachine'
import { SplashScreen } from '@/components/SpashScreen'
import { HomeScreen } from '@/components/HomeScreen'
import { SecondaryScreen } from '@/components/SecondaryScreen'

export default function App() {
  const [state, send] = useMachine(navigationMachine)

  const screenMap: Record<string, JSX.Element> = {
    splash: <SplashScreen onTimeout={() => send({ type: 'TIMEOUT' })} />,
    home: (
      <HomeScreen
        onNavigateToSecondary={() => send({ type: 'NAVIGATE_SECONDARY' })}
      />
    ),
    secondary: (
      <SecondaryScreen
        onNavigateToHome={() => send({ type: 'NAVIGATE_HOME' })}
      />
    ),
  }

  const currentScreenKey = Object.keys(screenMap).find((key) =>
    state.matches(key)
  )

  return screenMap[currentScreenKey ?? ''] || null
}
