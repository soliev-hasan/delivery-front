import {Platform, StyleSheet} from 'react-native';
import colors from '../../helper/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  productsContainer: {
    marginTop: 10,
  },
  products: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: Platform.OS === 'ios' ? 180 : 150,
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  tab: {
    paddingVertical: 8,
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 14,
    color: '#888',
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  orderToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  orderButton: {
    padding: 12,
    backgroundColor: '#e9ecef',
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#007bff',
  },
  orderText: {
    fontSize: 16,
    color: '#fff',
  },
  recommendedContainer: {
    marginTop: 20,
  },
  recommendedProducts: {
    paddingBottom: 16,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  recommendedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recommendedImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  recommendedInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  recommendedName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  recommendedCategory: {
    fontSize: 14,
    color: '#666',
  },
  recommendedDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 10,
  },
  recommendedRating: {
    fontSize: 12,
    color: '#333',
  },
  recommendedDistance: {
    fontSize: 12,
    color: '#666',
  },
});
