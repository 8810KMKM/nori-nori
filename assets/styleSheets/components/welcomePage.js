import { StyleSheet } from 'react-native'
import colors from '../../variables/colors';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: colors.white,
    backgroundColor: colors.main
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.white,
    // fontFamily: 'bangers-r',
    fontFamily: 'erica',
    textAlign: "center",
    marginBottom: 40
  }
});