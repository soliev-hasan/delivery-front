import { StyleSheet } from 'react-native';
import colors from '../../helper/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: 40,
    marginTop: 40,
  },
  title: {
    fontSize: 30,
    color: colors.black,
  },
  desc: {
    color: colors.gray,
  },
  titlesContent: {
    gap: 16,
    marginBottom: 30,
  },
  form: {
    gap: 30,
  },
  rowLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    justifyContent: 'center',
    marginTop: 20,
  },
  line: {
    backgroundColor: colors.gray,
    height: 0.9,
    width: 100,
  },
  googleAuthContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  googleAuthIcon: {
    width: 45,
    height: 45,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.gray,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
