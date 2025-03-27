import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import styles from './HomeScreen.style'

interface Character {
  id: number
  name: string
  image: string
}

interface HomeScreenProps {
  characters: Character[]
  onSelectCharacter: (id: number) => void
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  characters,
  onSelectCharacter,
}) => {
  const insets = useSafeAreaInsets()
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelectCharacter(item.id)}
            style={{ padding: 10 }}
          >
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                borderRadius: 15,
                padding: 10,
                overflow: 'hidden',
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 125,
                  height: 125,
                  borderRadius: 15,
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: 10,
                  fontWeight: '800',
                  alignSelf: 'flex-start',
                  flex: 1, // Permite que el texto ocupe el espacio restante
                  flexWrap: 'wrap',
                }}
              >
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}
