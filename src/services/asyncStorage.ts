import AsyncStorage from '@react-native-async-storage/async-storage'
import { Character } from '@/types'

export const storeCharacters = async (value: Character[]) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('characters', jsonValue)
  } catch (e) {
    console.error('Error storing Characters in the DB')
  }
}
export const addFavCharactersToStorage = async (value: Character) => {
  try {
    const currentFavCharactersString = await AsyncStorage.getItem('favourites')
    if (currentFavCharactersString !== null) {
      //Add new fav character to the stored ones
      const currentFavCharacters = JSON.parse(currentFavCharactersString)
      const updatedFavCharacters = [...currentFavCharacters, value]
      const updatedFavCharactersString = JSON.stringify(updatedFavCharacters)
      await AsyncStorage.setItem('favourites', updatedFavCharactersString)
    } else {
      //Add first favourite character
      const jsonValue = JSON.stringify([value])
      await AsyncStorage.setItem('favourites', jsonValue)
    }
  } catch (e) {
    console.error('Error storing Favourite Characters in the DB')
  }
}

export const getCharacters = async (): Promise<Character[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem('characters')
    if (jsonValue !== null) {
      const characters: Character[] = JSON.parse(jsonValue)
      console.log('Characters retrieved successfully from AsyncStorage.')
      return characters
    } else {
      console.log('No characters found in AsyncStorage.')
      return [] // Devuelve array vacío si no hay nada guardado
    }
  } catch (e) {
    console.error('Error retrieving characters from AsyncStorage:', e)
    return [] // Devuelve array vacío en caso de error de parseo u otro
  }
}

export const getFavCharacters = async (): Promise<Character[]> => {
  try {
    const favCharactersString = await AsyncStorage.getItem('favourites')
    if (favCharactersString !== null) {
      const favCharacters: Character[] = JSON.parse(favCharactersString)
      console.log('Characters retrieved successfully from AsyncStorage.')
      return favCharacters
    } else {
      console.log('No favourite characters found in AsyncStorage.')
      return [] // Devuelve array vacío si no hay nada guardado
    }
  } catch (e) {
    console.error('Error retrieving favourite characters from AsyncStorage:', e)
    return [] // Devuelve array vacío en caso de error de parseo u otro
  }
}
