import { StyleSheet } from 'react-native'

const CharacterCardStyles = StyleSheet.create({
  touchableCard: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    margin: 10,
    gap: 15,
  },
  text: {
    fontSize: 20,
    fontWeight: '800',
    alignSelf: 'flex-start',
    flex: 1,
    flexWrap: 'wrap',
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 15,
  },
})

export default CharacterCardStyles
