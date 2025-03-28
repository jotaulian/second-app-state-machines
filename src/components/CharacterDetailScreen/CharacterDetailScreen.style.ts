import { StyleSheet } from 'react-native'

const SecondaryScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E7E0DB',
    padding: 20,
    gap: 15,
  },

  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#3D373C',
  },
  image: { width: '100%', height: 350, resizeMode: 'cover', borderRadius: 40 },
  backBtn: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: '#C19978',
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  backBtnText: { color: 'white', fontWeight: '700' },
  info: {
    fontSize: 20,
    alignSelf: 'stretch',
  },
})

export default SecondaryScreenStyles
