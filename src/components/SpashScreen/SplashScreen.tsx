// SplashScreen.tsx
import React, { useEffect, useRef } from 'react'
import { View, Animated } from 'react-native'
import styles from './SplashScreen.style'
import portal from '../../../assets/portal-splash-rickandmorty.png'

export const SplashScreen: React.FC = () => {
  const rotation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start()

    return () => {
      rotation.stopAnimation()
    }
  }, [rotation])

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
