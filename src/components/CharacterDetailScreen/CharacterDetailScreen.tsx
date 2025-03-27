// CharacterDetailScreen.tsx
import React from 'react'
import { View, Text, Image, Button, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './CharacterDetailScreen.style'
import { Character } from '@/types'

interface CharacterDetailScreenProps {
  character: Character | null
  onNavigateHome: () => void
}

export const CharacterDetailScreen: React.FC<CharacterDetailScreenProps> = ({
  character,
  onNavigateHome,
}) => {
  if (!character) {
    return <Text>No character selected.</Text>
  }
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={onNavigateHome} style={styles.backBtn}>
        <Text style={styles.backBtnText}>Back </Text>
      </Pressable>
      <Text style={styles.name}>{character.name}</Text>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.info}>{character.species}</Text>
      <Text style={styles.info}>{character.status}</Text>
      <Text style={styles.info}>{character.gender}</Text>
      <Text style={styles.info}>{character.location.name}</Text>
    </SafeAreaView>
  )
}
