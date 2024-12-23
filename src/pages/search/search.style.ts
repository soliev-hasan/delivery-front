import {StyleSheet} from 'react-native';
import colors from '../../helper/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  productsContainer: {
    marginTop: 20,
    flex: 1,
  },
  products: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: 180,
    height: 200,
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
    gap: 8,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    maxWidth: '100%',
    overflow: 'hidden',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.main,
  },
  inputContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  none: {
    fontSize: 18,
    color: colors.black,
    textAlign: 'center',
  },
});
