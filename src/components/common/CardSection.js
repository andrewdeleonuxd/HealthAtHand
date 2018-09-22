import React from 'react';
import {View,Text} from 'react-native';



// create a new component
const CardSection = (props) => {
  return(
    <View style={[styles.containerStyle, props.style]}>
         {props.children}
    </View>    
  )    
};  

const styles={ 
    containerStyle:{
        borderBottomWidth:1,
        padding:5,
        backgroundColor:'#fff',
        justifyContent:'flex-start',
        flexDirection:'row',
        borderColor:'#ddd',
        position:'relative'
    }
};

//render that component to our device
export { CardSection };