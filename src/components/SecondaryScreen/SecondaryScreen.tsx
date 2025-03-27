import { View, Text, Button } from 'react-native'
import styles from './SecondaryScreen.style'

interface SecondaryScreenProps {
  onNavigateToHome: () => void
}

export const SecondaryScreen: React.FC<SecondaryScreenProps> = ({
  onNavigateToHome,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Secondary Screen</Text>
      <Button title="Go Back Home" onPress={onNavigateToHome} />
    </View>
  )
}

export default SecondaryScreen
