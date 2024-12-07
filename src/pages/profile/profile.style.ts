import { StyleSheet } from 'react-native';
import colors from '../../helper/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  profileInfo: {
    alignItems: 'center',
    gap: 17,
    marginTop: 40,
  },
  imageContainer: {
    position: 'relative',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: -17,
    right: -23,
    zIndex: 2,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 125,
  },
  profileName: {
    fontSize: 22,
    color: colors.black,
  },
  profileEmail: {
    fontSize: 20,
    color: colors.grayDark,
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: colors.grayLight,
    marginTop: 22
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.grayLight2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconName: {
    fontSize: 18,
    color: colors.black,
    fontWeight: '500'
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  optionsContainer: {
    marginVertical: 15
  },
  exitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 50,
    height: 75,
    gap: 10,
    marginBottom: 30
  },
  exitText: {
    fontSize: 18,
    color: colors.redShade,
    fontWeight: 'bold',
  },
});
