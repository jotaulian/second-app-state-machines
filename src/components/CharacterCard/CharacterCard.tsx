import { Text, TouchableOpacity, Image } from 'react-native'
import { Character } from '@/types'
import styles from './CharacterCard.style'

interface CharacterCardProps {
  character: Character
  onSelectCharacter: (id: number) => void
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onSelectCharacter,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onSelectCharacter(character.id)}
      style={styles.touchableCard}
    >
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.text}>{character.name}</Text>
    </TouchableOpacity>
  )
}
