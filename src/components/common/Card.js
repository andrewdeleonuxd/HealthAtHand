import React from 'react';
import {View} from 'react-native';
import styles from './styles/Card.js'

// create a new component
const Card = (props) => {
  return(
    <View style={[styles.containerStyle, props.style]}>
        {props.children}
    </View>    
  )     
};

//render that component to our device
export { Card };
