import {Platform, StyleSheet} from 'react-native';
import colors from '../../helper/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Platform.OS === 'android' ? 0 : 20,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.gray,
  },
  cartItem: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    margin: Platform.OS === 'ios' ? 20 : 5,
    justifyContent: 'space-between',
  },
  desc: {
    gap: 10,
    marginLeft: Platform.OS === 'android' ? 10 : 0,
    marginTop: Platform.OS === 'android' ? -40 : 0,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 160,
  },
  itemQuantity: {
    fontSize: 18,
    color: colors.black,
  },
  itemPrice: {
    fontSize: 16,
    color: colors.main,
  },
  emptyCart: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    color: colors.gray,
  },
  photo: {
    width: Platform.OS === 'ios' ? 90 : 60,
    height: Platform.OS === 'ios' ? 90 : 60,
    marginLeft: Platform.OS === 'android' ? 10 : 0,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  icon: {
    borderWidth: 1,
    borderRadius: 90,
    padding: 1,
  },
  check: {
    borderWidth: 1,
    width: 20,
    height: 20,
  },
  totalContainer: {
    borderWidth: 1,
    borderColor: colors.gray,
    margin: 20,
    padding: 20,
    borderRadius: 10,
    gap: 10,
  },
  totalText: {
    fontSize: 18,
    color: colors.grayDark,
  },
  num: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.main,
  },
  rowCalc: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
