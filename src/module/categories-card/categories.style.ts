import {StyleSheet} from 'react-native';
import colors from '../../helper/colors';

export default StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
    color: colors.black,
  },
  card: {
    backgroundColor: '#f6f6f6',
    width: 120,
    borderRadius: 10,
    height: 170,
    alignItems: 'center',
    gap: 35,
    padding: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    alignSelf: 'flex-start',
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Цвет тени
    textShadowOffset: {width: 1, height: 1}, // Смещение тени
    textShadowRadius: 3, // Радиус размытия тени
  },
  photo: {
    width: 90,
    height: 90,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
});
