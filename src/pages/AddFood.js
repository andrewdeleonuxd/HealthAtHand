import React,{Component} from 'react';
import _ from 'lodash';
import {View, Text, FlatList, Image, TouchableHighlight, StyleSheet, TouchableOpacity} from 'react-native'
import { Card, Header, Icon , SearchBar, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {initializefood, removeMeal, addMealToMealLog } from '../actions';

import { HaH_Header, HaH_NavBar } from '../components/common';

import {colors, margin, padding} from '../styles/base.js'

var data=[];

class AddFood extends Component {

    state = {
        showLoader:true, 
        showSearch:false, 
        searchText:"", 
        mealNo:""
    }

    componentWillMount = () => {

        this.loadData(this.props); 

    }


    componentWillReceiveProps = (nextProps) => { 
        console.log("componentWillReceiveProps ");
        this.loadData(nextProps)
    } 

    onPress = (item) => {
        Actions.push("foodcard",{item:item,firstTime:false,mealNo:this.props.item.mealNo,onBack:this.props.item});
    }

    loadData = (props) => {
       data=[]; 
       let array=this.props.item.food;
       if(array.length>0){
            array.map((item, i) => {

                data.push(
                    <TouchableHighlight
                        key={i}
                        onPress = {() => this.onPress(item)}
                        underLayColor="transparent"
                    >
                    <View>   
                        <Card 
                            flexDirection='row'
                            containerStyle = {styles.cardContainer}
                            wrapperStyle = {styles.cardWrapper}>
                            <Text style={styles.cardHeader}>
                                {this.capitalize(item.itemName)}
                            </Text>
                            <Text style={styles.cardHeader}>
                                {item.totalCalories / item.Calories}
                                <Text style={styles.servingSizeUnit}>
                                    {' ' + item.servingSize + '(s)'}
                                </Text>
                            </Text> 
                            <Text style={styles.cardHeader}>
                                {item.totalCalories}
                                <Text style={styles.servingSizeUnit}>
                                    {' cals'}
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
        this.props.addMealToMealLog(this.props.userId,this.props.date,this.props.foodArray);
      //  Actions.meallog();
    }

    showFoodSearch = () => {
        Actions.push("searchfood", {mealNo:this.props.item.mealNo, onBack:this.props.item}); 
    }

    deleteMeal = () => {
        this.props.removeMeal(this.props.foodArray,this.props.item.mealNo,this.props.userId,this.props.date);
    }

    submitEditing = () => {
        Actions.push("searchfood");
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
                onPress = {this.showFoodSearch}
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
                    text = {'Meal ' + this.props.item.mealNo}
                    right = {search}
                />
                <View style={{flex: 1, paddingTop: '2%', paddingBottom: '2%'}}>
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
                            style = {styles.deleteButton}
                            onPress={this.deleteMeal}>
                            
                            <Text style = {styles.deleteText}>
                                Delete Meal
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {
                        (data.length == 0) ? <View/>:
                        <View style={{paddingLeft: '4%', paddingRight: '4%', paddingTop: '2%', paddingBottom: '2%'}}>
                            <TouchableOpacity
                                style = {styles.confirmButton}
                                onPress = {this.goBack}>
                                <Text style = {styles.confirmText}>
                                    Add Meal To Log
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
                <HaH_NavBar
                    selected = {2}
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
        fontFamily: 'sans-serif-condensed', 
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
        fontFamily: 'sans-serif-condensed', 
        color: colors.primary,
        flex: 3
    },
    foodCals: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
        fontFamily: 'sans-serif-condensed', 
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
        fontFamily: 'sans-serif-condensed', 
        color: colors.brandwhite,
        textAlignVertical: 'center',
    },
	confirmContainer: {
		flexDirection:'row'
	},
    servingSizeUnit: {
        fontSize: 15,
        fontFamily: 'sans-serif-condensed', 
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
        fontFamily: 'sans-serif-condensed', 
        color: colors.brandwhite,
        textAlignVertical: 'center',
    },
});


const mapStateToProps = state => {
    return {
        foodArray: state.food.foodArray,
        userId: state.auth.userId,
        date : state.auth.date
    };
};

export default connect(mapStateToProps, {initializefood, removeMeal, addMealToMealLog}) (AddFood);
