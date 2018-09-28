import {StyleSheet} from 'react-native';
import {colors, fonts, padding, dimensions} from '../../../styles/base.js'


const styles = StyleSheet.create({
    button:{
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5
    },
    textStyle:{
        alignSelf:'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10

    }
})

export default (styles);