import { StyleSheet } from 'react-native';
import colors from '../../helper/colors';

export default StyleSheet.create({
    header: {
        width: '100%',
        paddingVertical: 10,
        marginTop: 15,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    title: {
        fontSize: 22,
        color: colors.black,
        textAlign: 'center',
        fontWeight: '600'
    },
    backIconContainer: {
        position: 'absolute',
        left: 15,
    },
});