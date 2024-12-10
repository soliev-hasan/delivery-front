import {StyleSheet} from 'react-native';
import {ms} from 'react-native-size-matters';

export default StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F2F2F2',
    borderWidth: ms(0.5),
    borderColor: '#E5E5E5',
    height: ms(40),
    borderRadius: ms(3.5),
    paddingHorizontal: '3%',
    marginTop: ms(20),
  },
});
