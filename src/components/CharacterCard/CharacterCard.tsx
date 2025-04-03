import {
  Text,
  TouchableOpacity,
  Image,
  GestureResponderEvent,
  View,
  Pressable,
} from 'react-native'
import { Character } from '@/types'
import styles from './CharacterCard.style'
import FontAwesome from '@expo/vector-icons/FontAwesome'

interface CharacterCardProps {
  character: Character
  onSelectCharacter: (id: number) => void
  onFavouriteCharacter: (character: Character) => void
  isFavourite?: boolean
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onSelectCharacter,
  onFavouriteCharacter,
  isFavourite = false,
}) => {
  const handleButtonPress = (event: GestureResponderEvent) => {
    event.stopPropagation()
    // TODO: Si ya es favorito, llamar a otra action
    onFavouriteCharacter(character)
  }

  return (
    <TouchableOpacity
      onPress={() => onSelectCharacter(character.id)}
      style={styles.touchableCard}
    >
      <Image source={{ uri: character.image }} style={styles.image} />
      <View>
        <Text style={styles.text}>{character.name}</Text>
        <Pressable
          onPress={handleButtonPress} // Handler que detiene la propagación
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed, // Estilo al presionar
          ]}
        >
          {isFavourite ? (
            <FontAwesome name="heart" size={24} color="black" />
          ) : (
            <FontAwesome name="heart-o" size={24} color="black" />
          )}
        </Pressable>
      </View>
    </TouchableOpacity>
  )
}
