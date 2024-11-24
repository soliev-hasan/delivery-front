import {StyleSheet} from 'react-native';
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
    width: '100%',
  },
  input: {
    fontSize: 16,
    color: 'black',
    height: 20,
    backgroundColor: 'transparent',
    borderColor: colors.gray,
    flex: 1,
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
