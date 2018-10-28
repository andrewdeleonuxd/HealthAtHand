import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles/Button.js'

// create a new component
const Button = ({objStyle, textStyle, children, onButtonPress }) => {
    console.log("abjsdkjaskldklsadknl");
    return(
        <TouchableOpacity 
            style={[styles.obj, objStyle]}
            onPress={onButtonPress}>
            <Text  
                style={[styles.text, textStyle]}> 
                {children}
            </Text>
        </TouchableOpacity>
    )    
}; 

//render that component to our device
export { Button };
