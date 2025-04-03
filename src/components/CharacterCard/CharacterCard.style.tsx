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

  // Estilos para el botón interno (Pressable)
  button: {
    borderRadius: 5,
    alignSelf: 'flex-start', // Para que no ocupe todo el ancho
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  buttonPressed: {
    backgroundColor: '#E7E0DB', // Color más oscuro al presionar
  },
  buttonText: {
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
  },
})

export default CharacterCardStyles
