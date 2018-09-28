import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles/Button.js'




// create a new component
const Button = ({ children, onButtonPress }) => {
    console.log("abjsdkjaskldklsadknl");
    
  return(
    <TouchableOpacity  style={styles.button} onPress={onButtonPress}>
        <Text  style={styles.textStyle}> 
            {children}
        </Text>     
    </TouchableOpacity>
  )    
}; 

/*
const styles={ 
    buttonStyle:{
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor:'#fff',
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
  };
*/

//render that component to our device
export { Button };