// App.tsx
import React from 'react'
import { useMachine } from '@xstate/react'
import { navigationMachine } from '@/navigationMachine'
import { SplashScreen } from '@/components/SpashScreen'
import { HomeScreen } from '@/components/HomeScreen'
import { CharacterDetailScreen } from '@/components/CharacterDetailScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function App() {
  const [state, send] = useMachine(navigationMachine)

  const screenMap: Record<string, JSX.Element> = {
    loading: <SplashScreen />,
    home: (
      <HomeScreen
        characters={state.context.characters}
        onSelectCharacter={(id) =>
          send({ type: 'SELECT_CHARACTER', characterId: id })
        }
      />
    ),
    characterDetail: (
      <CharacterDetailScreen
        character={state.context.selectedCharacter}
        onNavigateHome={() => send({ type: 'NAVIGATE_HOME' })}
      />
    ),
  }

  const currentScreenKey = Object.keys(screenMap).find((key) =>
    state.matches(key as 'loading' | 'home' | 'characterDetail')
  )

  return (
    <SafeAreaProvider>
      {screenMap[currentScreenKey ?? ''] || null}
    </SafeAreaProvider>
  )
}
