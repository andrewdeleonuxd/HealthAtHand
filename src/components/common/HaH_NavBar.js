import React from 'react';
import {View, StyleSheet} from 'react-native'
import {Icon} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

import {colors, margin, padding} from '../../styles/base.js'


const HaH_NavBar = (props) => {

    showHome = () => {
        Actions.home();
    }

    showAddFood = () => {
        
        Actions.push("meallog",{type:"addfood"});
        
    }

    showAddExercise = () => {
        
        Actions.push("exerciselog",{type:"addexercise"});
        
    }

    showAddFoodNotes = () => {
        
        Actions.push("foodnotes");
        
    }

    showAddExerciseNotes = () => {
        
        Actions.push("exercisenotes");
    }

    showReport = () => {
		Actions.push("report");
    }
    
    showMessenger = () => {
        Actions.push("messenger");
    }

    email = () => {
        // Communications.text("4123205413");
        // Communications.email(to, cc, bcc, subject, body)
     //   Communications.email(['abcd@gmail.com'],null,null,'update','Hello');
          Actions.push("email");
    }

    return(
        <View style={{flexDirection: 'row', height:60, backgroundColor: colors.primary, justifyContent:"space-around", alignItems: 'center', opacity: 0.8}}>
            <Icon
                name='tachometer'
                type='font-awesome'
                color={props.selected == 1 ? colors.brandgold: colors.brandwhite}
                onPress={this.showHome}
                size={30}
                underlayColor='transparent'>
            </Icon>
            <Icon
                name='food'
                type='material-community'
                color={props.selected == 2 ? colors.brandgold: colors.brandwhite}
                onPress={this.showAddFood}
                size={30}
                underlayColor='transparent'>
            </Icon>
            <Icon
                name='run'
                type='material-community'
                color={colors.brandwhite}
                color={props.selected == 3 ? colors.brandgold: colors.brandwhite}
                onPress={this.showAddExercise}
                size={30}
                underlayColor='transparent'>
            </Icon>
            <Icon
                name='clipboard-check'
                type='material-community'
                color={props.selected == 4 ? colors.brandgold: colors.brandwhite}
                onPress={this.showReport}
                size={30}
                underlayColor='transparent'> 
            </Icon>
            <Icon
                name='mail'
                type='Entypo'
                color={props.selected == 5 ? colors.brandgold: colors.brandwhite}
                onPress={this.showMessenger}
                size={30}
                underlayColor='transparent'> 
            </Icon>
        </View>
    )
}

export { HaH_NavBar }