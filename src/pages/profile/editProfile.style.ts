import {StyleSheet} from 'react-native';
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
    right: -32,
    zIndex: 2,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 125,
  },
  editForm: {
    marginTop: 50,
    gap: 25,
  },
  inputRow: {
    gap: 12,
  },
  inputLabel: {
    fontSize: 18,
    color: colors.black,
    fontWeight: '500',
  },
  user: {
    padding: 20,
    backgroundColor: colors.grayLight2,
    borderRadius: 90,
  },
});
