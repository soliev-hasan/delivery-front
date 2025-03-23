import {Platform, StyleSheet} from 'react-native';
import colors from '../../helper/colors';

export default StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: colors.gray,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 8,
    height: 40,

    width: '100%',
    color: colors.black,
  },
  input: {
    fontSize: 16,
    color: 'black',
    backgroundColor: 'transparent',
    borderColor: colors.gray,
    flex: 1,
    height: 40,
    marginTop: Platform.OS === 'android' && (5 as any),
  },
  eyeIcon: {
    marginLeft: 12,
  },
  focusedInput: {
    borderColor: '#1B9FFC',
    borderWidth: 0.5,
    borderStyle: 'solid',
  },
  placheholder: {
    color: colors.grayDark,
    fontSize: 16,
  },
});
