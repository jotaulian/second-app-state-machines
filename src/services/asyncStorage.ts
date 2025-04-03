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
