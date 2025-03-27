import { useEffect, useRef } from 'react'
import { View, Image, Animated } from 'react-native'
import styles from './SplashScreen.style'
import portal from '../../../assets/portal-splash-rickandmorty.png'

interface SplashScreenProps {
  onTimeout: () => void
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onTimeout }) => {
  const rotation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const timer = setTimeout(() => {
      onTimeout()
    }, 2000)

    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start()

    return () => {
      clearTimeout(timer)
      rotation.stopAnimation()
    }
  }, [onTimeout, rotation])

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <View style={styles.container}>
      <Animated.Image
        source={portal}
        style={[styles.spinner, { transform: [{ rotate: spin }] }]}
      />
    </View>
  )
}
