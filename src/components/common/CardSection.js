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
        borderColor: '#000',
        borderWidth: 1,
        padding:10,
        backgroundColor:'#D3D3D3',
        justifyContent:'flex-start',
        flexDirection:'row',
        borderColor:'#000',
        position:'relative'
    }
};

//render that component to our device
export { CardSection };