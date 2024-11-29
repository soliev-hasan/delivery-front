import {Platform, StyleSheet} from 'react-native';
import colors from '../../helper/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  cell: {
    backgroundColor: 'transparent',
    width: 75,
    height: 72,
    borderRadius: 14,
    fontSize: 36,
    borderWidth: 1,
    borderColor: colors.grayLight,
    textAlign: 'center',
    color: 'black',
    textAlignVertical: 'center',
    paddingTop: Platform.OS === 'android' ? 0 : 10,
  },
  codeFieldRoot: {
    gap: 12,
  },
  header: {
    gap: 30,
  },
  title: {
    fontSize: 30,
    color: colors.black,
  },
  desc: {
    color: colors.grayDark,
    marginTop: 10,
    fontSize: 18,
  },
  noCode: {
    textAlign: 'center',
    letterSpacing: 2,
  },
  resend: {
    color: colors.main,
  },
  sendButton: {},
});
