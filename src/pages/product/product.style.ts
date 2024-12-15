import { StyleSheet } from 'react-native';
import colors from '../../helper/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  swiper: {
    height: 300,
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 15,
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  dash: {
    backgroundColor: colors.white,
    width: 24,
    height: 5,
    borderRadius: 2,
    marginHorizontal: 3,
  },
  activeDash: {
    backgroundColor: '#FE8C00',
    width: 24,
    height: 5,
    borderRadius: 2,
    marginHorizontal: 3,
  },
  productInfo: {
    padding: 15,
  },
  productName: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.black,
  },
  description: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.black,
  },
  similarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 15,
    color: colors.black,
  },
  productPrice: {
    fontSize: 20,
    color: '#FE8C00',
    marginBottom: 5,
  },
  productDeliveryInfo: {
    fontSize: 15,
    color: colors.grayDark,
  },
  productDescription: {
    marginVertical: 15,
    fontSize: 14,
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  iconCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  cartSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 10,
    color: colors.black
  },
  addToCartButton: {
    backgroundColor: '#FE8C00',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FE8C00',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 50,
    elevation: 3,
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  line: {
    width: '100%',
    height: 2,
    marginVertical: 15,
    backgroundColor: colors.grayLight
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 15
  },
  similarProductCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  similarProductImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  similarProductName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  similarProductInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  similarProductRating: {
    fontSize: 12,
    marginLeft: 3,
    marginRight: 10,
    color: '#555',
  },
  similarProductDistance: {
    fontSize: 12,
    color: '#555',
    marginLeft: 3,
  },
  similarProductPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FE8C00',
  },
  noSimilar: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
});
