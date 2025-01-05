import {StyleSheet} from 'react-native';
import colors from '../../helper/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  product: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  photo: {
    width: 70,
    height: 70,
  },
  desc: {
    gap: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.main,
  },
  contentProduct: {
    gap: 20,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
  },
  quantity: {
    color: colors.grayDark,
  },
  total: {
    fontSize: 18,
    color: colors.grayDark,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  right: {
    fontSize: 18,
    color: colors.black,
  },
});
