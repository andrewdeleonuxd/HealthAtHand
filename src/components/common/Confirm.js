import React from 'react';
import {View,Text,Modal} from 'react-native';
import{CardSection} from './CardSection';
import {Button} from './Button';

// create a new component
const Confirm = ({children,visible,onAccept,onDecline}) => {
    const{containerStyle,textStyle,cardSectionStyle} = styles;

  return(
    <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() =>{} }
    >
        <View style={containerStyle}>
            <CardSection style={cardSectionStyle}>
                <Text style={textStyle}>
                    {children}
                </Text>    
            </CardSection> 

            <CardSection>
                <Button onButtonPress={onAccept}>
                    Yes
                </Button>  
                <Button onButtonPress={onDecline}>
                    No
                </Button>   
            </CardSection>    
        </View>    
    </Modal>    
  );     
}; 

const styles = {
    cardSectionStyle:{
        justifyContent:'center'
    },
    textStyle:{
        flex:1,
        fontSize:18,
        textAlign:'center',
        lineHeight:40
    },
    containerStyle:{
        backgroundColor:'rgba(0,0,0,0.75)',
        position:'relative',
        flex:1,
        justifyContent:'center'
    }
};
//render that component to our device
export { Confirm };