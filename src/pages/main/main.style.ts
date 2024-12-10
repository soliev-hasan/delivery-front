import {StyleSheet} from 'react-native';
import colors from '../../helper/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(239, 237, 237)',
  },
  categories: {
    paddingHorizontal: 15,
  },
  header: {
    height: 230,
    backgroundColor: 'gray',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Заполнить весь родительский контейнер
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Полупрозрачный черный цвет
  },
  content: {
    zIndex: 1, // Убедиться, что контент поверх наложения
  },
  adress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    fontSize: 20,
    padding: 20,
  },
  rowAdress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
  newAdress: {
    fontSize: 18,
    color: colors.black,
  },
  title: {
    fontSize: 22,
    color: colors.black,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 15,
  },
  address: {
    gap: 20,
    paddingHorizontal: 10,
  },
  street: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  second: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.grayDark,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  active: {
    color: colors.white,
    fontSize: 18,
  },
  rowPin: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 18,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 150,
    paddingLeft: 20,
  },
});
