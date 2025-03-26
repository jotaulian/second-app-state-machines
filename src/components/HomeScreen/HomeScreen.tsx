import styles from './HomeScreen.style'
import { View, Text, Button } from 'react-native'

interface HomeScreenProps {
  onNavigateToSecondary: () => void
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateToSecondary,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Button title="Go to Secondary" onPress={onNavigateToSecondary} />
    </View>
  )
}
