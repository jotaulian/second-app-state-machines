// CharacterDetailScreen.tsx
import React from 'react'
import { View, Text, Image, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Character {
  id: number
  name: string
  image: string
  species: string
  status: string
  gender: string
}

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
    <SafeAreaView>
      <Image
        source={{ uri: character.image }}
        style={{ width: 200, height: 200 }}
      />
      <Text>{character.name}</Text>
      <Text>{character.species}</Text>
      <Text>{character.status}</Text>
      <Text>{character.gender}</Text>
      <Button title="Go Home" onPress={onNavigateHome} />
    </SafeAreaView>
  )
}
