import {StyleSheet} from 'react-native';
import {colors, fonts, padding, dimensions} from '../../../styles/base.js'

const styles = {
    obj:{
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: colors.brandblue,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.brandblue,
        marginLeft: 5,
        marginRight: 5
    },
    text:{
        alignSelf:'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }
}

export default (styles);