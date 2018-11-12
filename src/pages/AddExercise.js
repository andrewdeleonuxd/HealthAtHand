import React,{Component} from 'react';
import _ from 'lodash';
import {View, Text, FlatList, Image, TouchableHighlight, StyleSheet, TouchableOpacity} from 'react-native'
import { Card, Header, Icon , SearchBar, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {initializeExercise } from '../actions';

import { HaH_Header, HaH_NavBar } from '../components/common';
import {colors, margin, padding, fonts, button} from '../styles/base.js'

var data=[];

class AddExercise extends Component {

    state = {
        showLoader:true,
        showSearch:false, 
        searchText:""
    }

    componentWillMount = () => {
       /*
        if(this.props.item.exercise.length == 0){
         //   this.props.initializeExercise(obj,this.props.exerciseArray);
            this.loadData(this.props); 

        } else{
            this.loadData(this.props);
        }

        */
        this.loadData(this.props); 


    }


    componentWillReceiveProps = (nextProps) => { 
        this.loadData(nextProps)
    } 

    onPress = (item) => {
        Actions.push("exercisecard",{item:item,firstTime:false,exerciseNo:this.props.item.exerciseNo,onBack:this.props.item});
    }

    loadData = (props) => {
        data=[]; 
        let array=this.props.item.exercise;
        if(array.length>0){
            array.map((item, i) => {
    
                data.push(
                    <TouchableHighlight
                        key={i}
                        onPress = {() => this.onPress(item)}
                        underLayColor="transparent">
                        <View>   
                            <Card 
                                flexDirection='row'
                                containerStyle = {styles.cardContainer}
                                wrapperStyle = {styles.cardWrapper}>
                                <Text style={styles.cardHeader}>
                                    {this.capitalize(item.itemName)}
                                </Text>
                                <Text style={styles.cardHeader}>
                                    {item.duration}
                                    <Text style={styles.servingSizeUnit}>
                                        {' sec'}
                                    </Text>
                                </Text> 
                            </Card>
                        </View>
                    </TouchableHighlight>
                )
            })
        }
    } 


    goBack = () => {
        Actions.exerciselog();
    }

    showExerciseSearch = () => {
        Actions.push("searchexercise",{text:this.state.searchText,exerciseNo:this.props.item.exerciseNo,onBack:this.props.item});
    }

    capitalize(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    render = () => {
        let search = (
            <Icon
                name='add-box'
                underlayColor={"transparent"}
                color="white"
                marginTop={50}
                onPress = {this.showExerciseSearch}
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
                    text = {'Exercise ' + this.props.item.exerciseNo}
                    right = {search}
                />
                <View style={{flex: 1, paddingTop: '2%', paddingBottom: '2%'}}></View>
                    {
                        (data.length == 0) ? <View style={{flex: 1, height:"75%"}}></View>: 
                        <View style={{flex: 1, height:"75%"}}>
                            <View style={{flex: 1, margin: 0}}>
                                {data} 
                            </View>
                        </View>
                    }  
                    <View style={{paddingLeft: '4%', paddingRight: '4%', paddingTop: '2%', paddingBottom: '2%'}}>
                        <TouchableOpacity
                            style = {[button.touchable, {backgroundColor: 'red'}]}
                            //onPress={this.deleteMeal}
                        >
                            <View style={button.view}>
                                <Text style = {styles.deleteText}>
                                    Delete Exercise
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {
                        (data.length == 0) ? <View/>:
                        <View style={{paddingLeft: '4%', paddingRight: '4%', paddingTop: '2%', paddingBottom: '2%'}}>
                            <TouchableOpacity
                                style = {[button.touchable, {backgroundColor: colors.brandgold}]}
                                onPress={this.goBack}>
                                <View style={button.view}>
                                    <Text style = {button.text}>
                                        Add Exercise To Log
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                    <HaH_NavBar
                        selected = {3}
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardHeader: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: fonts.primary, 
        color: colors.primary
    },
    cardContainer: {
        
        elevation: 7,
        borderRadius: 10
    },
    cardWrapper: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 2,
        paddingRight: 2
    },
    foodName: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        fontFamily: fonts.primary, 
        color: colors.primary,
        flex: 3
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
    confirmButton: {
		backgroundColor: colors.brandgold,
		borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 7,
    },
    confirmText: {
        flex: 1,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: fonts.primary, 
        color: colors.brandwhite,
        textAlignVertical: 'center',
    },
	confirmContainer: {
		flexDirection:'row',
		//alignItems: 'center',
		//justifyContent: 'center',
		
	},
    servingSizeUnit: {
        fontSize: 15,
        fontFamily: fonts.primary, 
        color: colors.brandgrey,
        textAlign:'right',
        alignSelf: 'flex-end',
    },
    deleteButton: {
		backgroundColor: 'red',
		borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 7
    },
    deleteText: {
        flex: 1,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: fonts.primary, 
        color: colors.brandwhite,
        textAlignVertical: 'center',
    },
});

const mapStateToProps = state => {
    return {
        exerciseArray: state.exercise.exerciseArray
    };
};

export default connect(mapStateToProps, {initializeExercise}) (AddExercise);

