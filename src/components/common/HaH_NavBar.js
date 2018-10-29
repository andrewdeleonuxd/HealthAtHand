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

    email = () => {
        // Communications.text("4123205413");
        // Communications.email(to, cc, bcc, subject, body)
     //   Communications.email(['abcd@gmail.com'],null,null,'update','Hello');
          Actions.push("email");
    }

    return(
        <View style={{flexDirection: 'row', height:60, backgroundColor: colors.primary, justifyContent:"space-around", opacity: 0.8}}>
            <Icon
                name='tachometer'
                type='font-awesome'
                color={colors.secondary}
                onPress={this.showHome}
                size={30}
                underlayColor='transparent'>
            </Icon>
            <Icon
                name='food'
                type='material-community'
                color={colors.brandwhite}
                onPress={this.showAddFood}
                size={30}
                underlayColor='transparent'>
            </Icon>
            <Icon
                name='run'
                type='material-community'
                color={colors.brandwhite}
                onPress={this.showAddExercise}
                size={30}
                underlayColor='transparent'>
            </Icon>
            <Icon
                name='message'
                type='Entypo'
                color={colors.brandwhite}
                onPress={this.showReport}
                size={30}
                underlayColor='transparent'> 
            </Icon>
            <Icon
                name='settings'
                type='Feather'
                color={colors.brandwhite}
                onPress={this.showAddExercise}
                size={30}
                underlayColor='transparent'>
            </Icon>
        </View>
    )
}

export { HaH_NavBar }