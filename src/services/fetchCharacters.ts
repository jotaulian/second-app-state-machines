import { Character } from '@/types'
const fetchCharacters = async (): Promise<Character[]> => {
  const response = await fetch('https://rickandmortyapi.com/api/character')
  const data = await response.json()
  return data.results
}

export default fetchCharacters
