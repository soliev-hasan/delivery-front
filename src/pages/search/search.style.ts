import { StyleSheet } from 'react-native';
import colors from '../../helper/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(239, 237, 237)',
    paddingHorizontal: 20,
  },
  productsContainer: {
    marginTop: 20,
    flex: 1,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888'
  },
  inputContainer: {
    marginVertical: 20,
  }
});
