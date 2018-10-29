import React from 'react';
import {StyleSheet} from 'react-native'
import {Header} from 'react-native-elements';
import {colors, margin, padding} from '../../styles/base.js'


const HaH_Header = (props) => {

    return(
        <Header
            outerContainerStyles={{height:60,backgroundColor:colors.primary, opacity:0.8}}
            leftComponent= {props.left}
            centerComponent={{ text: props.text, style: styles.headerCenter}}
            rightComponent={props.right}
        />
    )
};

const styles = StyleSheet.create ({
    headerCenter: {
        color: colors.brandwhite,
        fontSize:30, 
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed'
    }
})

export { HaH_Header };
        