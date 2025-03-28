export interface Character {
  id: number // The id of the character
  name: string // The name of the character
  status: 'Alive' | 'Dead' | 'unknown' // The status of the character
  species: string // The species of the character
  type: string // The type or subspecies of the character
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown' // The gender of the character
  origin: {
    name: string // Name of the character's origin location
    url: string // Link to the character's origin location
  }
  location: {
    name: string // Name of the character's last known location
    url: string // Link to the character's last known location endpoint
  }
  image: string // Link to the character's image (URL)
  episode: string[] // List of episodes in which this character appeared (array of URLs)
  url: string // Link to the character's own URL endpoint
  created: string // Time at which the character was created in the database
}
