import { Character } from '@/types'
import { storeCharacters } from './asyncStorage'

const fetchCharacters = async (): Promise<Character[]> => {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/character')
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }
    const data = await response.json()
    storeCharacters(data.results) // Storing data locally
    return data.results
  } catch (error) {
    console.error('Error fetching characters from API:', error)
    console.log('Loading characters from Async Storage')
    throw error
  }
}

export default fetchCharacters
