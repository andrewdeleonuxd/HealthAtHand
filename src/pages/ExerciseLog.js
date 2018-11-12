import React,{Component} from 'react';
import _ from 'lodash';
import {View, Text, FlatList, Image, TouchableHighlight, StyleSheet, TouchableOpacity} from 'react-native'
import { Card, Header, Icon , SearchBar, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {initializeExercise} from '../actions';

import { HaH_Header, HaH_NavBar } from '../components/common';
import {colors, margin, padding, fonts, button} from '../styles/base.js'

var data=[];

class ExerciseLog extends Component {

    state = {

    }

    componentWillMount = () => {

        if(this.props.exerciseArray.length == 0){
         //   this.props.initializeExercise(obj,this.props.exerciseArray);
            this.loadData(this.props); 

        } else{
            this.loadData(this.props);
        }

    }


    componentWillReceiveProps = (nextProps) => { 
        this.loadData(nextProps)
    } 

    onPress = (item) => {
        Actions.push("addexercise",{item:item});
    }

    loadData = (props) => {
        data=[]; 
        let array=props.exerciseArray;
        array.map((item, i) => {
            data.push(
                <TouchableHighlight
                    key={i}
                    onPress = {() => this.onPress(item)}
                    underLayColor="transparent"
                    style = {{paddingTop: 0, paddingBottom: 0}}>
                    <View style = {{margin: 0, paddingBottom: 7}}>   
                        <Card
                            flexDirection = 'row' 
                            containerStyle = {styles.cardContainer}
                            wrapperStyle = {styles.cardWrapper}>
                            <Text style = {styles.foodName}>
                                Exercise {item.exerciseNo}
                            </Text>
                        </Card>
                    </View>
                </TouchableHighlight>
            )
        })
    } 


    goBack = () => {
        Actions.home();
    }


    addExercisePg = () => {
          let newObj={'exerciseNo':this.props.exerciseArray.length + 1,'exercise':[]};   
        Actions.push("addexercise",{type:"addexercise",item:newObj});
                       
    }

    showAddExerciseNotes = () => {
        Actions.push("exercisenotes");
    }

    Complete = () => {
        Actions.home();
    }

    render = () => {
        let addExercise = (
            <Icon
                name='add-box'
                underlayColor={"transparent"}
                color="white"
                marginTop={50}
                onPress = {this.addExercisePg}
            />
    )

        let backButton = (
            <Icon
                name='ios-arrow-back'
                type='ionicon'
                color={"white"}
                onPress = {this.goBack}
                underlayColor={"transparent"}
            />
        )

        return (
            <View style={{flex:1, marginTop: Expo.Constants.statusBarHeight}}>
                <HaH_Header
                    text = 'Exercise Log'
                    right = {addExercise}
                />
                {
                    (this.props.exerciseArray.length == 0) ? <View style={{flex: 1, height:"75%"}}></View> : 
                    <View style={{flex: 1, height:"75%", paddingTop: 0}}>
                        {data}     
                    </View>    
                }
                <View style={{paddingLeft: '4%', paddingRight: '4%', paddingTop: '2%', paddingBottom: '4%'}}>  
                    <TouchableOpacity
                        style = {[button.touchable, {backgroundColor: colors.brandblue}]}
                        onPress={this.showAddExerciseNotes}>
                        <View style={button.view}>
                            <Text style = {button.text}>
                                Exercise Notes
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <HaH_NavBar
                    selected = {3}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        padding: 1,
        elevation: 7,
        borderRadius: 10
    },
    cardWrapper: {        
        alignItems: 'center',
        padding: 10,
    },
    foodName: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        fontFamily: fonts.primary, 
        color: colors.primary,
    },
    foodCals: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
        fontFamily: fonts.primary, 
        color: colors.primary,
        marginRight: '10%',
        flex: 4
    },
    headerCenter: {
        color: colors.brandwhite,
        fontSize:30, 
        fontWeight: 'bold',
        fontFamily: fonts.primary
    },
    noteButton: {
        backgroundColor: colors.brandblue,
        opacity: 0.8,
		borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 7
    },
    noteView: {
        flex: 1,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    noteText: {
        flex: 1,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: fonts.primary, 
        color: colors.brandwhite,
        alignSelf: 'center',
    },
});

const mapStateToProps = state => {
    return {
        exerciseArray: state.exercise.exerciseArray
    };
};

export default connect(mapStateToProps, {initializeExercise}) (ExerciseLog);
