import {StyleSheet} from 'react-native';
import colors from '../../helper/colors';

export default StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#f6f6f6',
    width: 126,
    borderRadius: 10,
    height: 170,
    alignItems: 'center',
    gap: 35,
    padding: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'flex-start',
  },
  photo: {
    width: 90,
    height: 90,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
