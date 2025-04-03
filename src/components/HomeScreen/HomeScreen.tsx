import { FlatList, Pressable, TextInput, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './HomeScreen.style'
import { Character } from '@/types'
import { CharacterCard } from '@/components/CharacterCard'
import { useState } from 'react'

interface HomeScreenProps {
  characters: Character[]
  onSelectCharacter: (id: number) => void
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  characters,
  onSelectCharacter,
}) => {
  const [text, onChangeText] = useState('')

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            onSelectCharacter={onSelectCharacter}
          ></CharacterCard>
        )}
      />
    </SafeAreaView>
  )
}
