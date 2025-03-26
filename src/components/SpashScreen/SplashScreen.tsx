import { useEffect } from 'react'
import { View, Text } from 'react-native'
import styles from './SplashScreen.style'

interface SplashScreenProps {
  onTimeout: () => void
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onTimeout }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onTimeout()
    }, 2000) // 2 seconds

    return () => clearTimeout(timer)
  }, [onTimeout])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Rick and morty</Text>
    </View>
  )
}
