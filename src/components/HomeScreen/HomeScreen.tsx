import { FlatList, Pressable, TextInput, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './HomeScreen.style'
import { Character } from '@/types'
import { CharacterCard } from '@/components/CharacterCard'

interface HomeScreenProps {
  characters: Character[]
  favouriteCharacters: Character[]
  onSelectCharacter: (id: number) => void
  onFavouriteCharacter: (character: Character) => void
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  characters,
  favouriteCharacters,
  onSelectCharacter,
  onFavouriteCharacter,
}) => {
  const idsFavCharacters = new Set(favouriteCharacters.map((char) => char.id))
  const nonFavouriteCharacters = characters.filter(
    (character) => !idsFavCharacters.has(character.id)
  )
  return (
    <>
      <SafeAreaView style={styles.container}>
        {favouriteCharacters.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>Favourites</Text>
            <FlatList
              data={favouriteCharacters}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <CharacterCard
                  character={item}
                  onSelectCharacter={onSelectCharacter}
                  onFavouriteCharacter={onFavouriteCharacter}
                  isFavourite={true}
                ></CharacterCard>
              )}
              horizontal={true} // horizontal
              showsHorizontalScrollIndicator={true}
            />
          </View>
        )}
        <Text style={styles.sectionTitle}>All Characters</Text>
        <FlatList
          data={nonFavouriteCharacters}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CharacterCard
              character={item}
              onSelectCharacter={onSelectCharacter}
              onFavouriteCharacter={onFavouriteCharacter}
            ></CharacterCard>
          )}
        />
      </SafeAreaView>
    </>
  )
}
