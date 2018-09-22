import React from 'react';
import {View, ActivityIndicator} from 'react-native';


// create a new component
const Spinner = ({size}) => { 
       
  return(
    <View style={styles.spinnerStyles}>
        <ActivityIndicator size={size || 'large'}/>
    </View>    
  );    
}; 

const styles = {
    spinnerStyles:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
}

//render that component to our device
export { Spinner };