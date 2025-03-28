import {StyleSheet} from 'react-native';
import colors from '../../helper/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: -35,
  },
  categories: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    height: 230,
    backgroundColor: 'gray',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  adress: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'space-between',
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.black,
    marginVertical: 20,
  },
  address: {
    gap: 15,
    paddingHorizontal: 20,
  },
  street: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    width: 160,
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
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: 180,
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  rowMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginLeft: -13,
  },
  button: {
    backgroundColor: colors.main,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  textMenu: {
    color: colors.black,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },

  addressList: {
    marginBottom: 20,
  },

  addButton: {
    alignSelf: 'center',
    marginTop: 10,
  },
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  addressActive: {
    gap: 10,
    flexDirection: 'row',
    marginTop: 15,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.grayDark,
  },
});
