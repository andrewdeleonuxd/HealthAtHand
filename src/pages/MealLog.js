import React,{Component} from 'react';
import _ from 'lodash';
import {View, Text, FlatList, Image, TouchableHighlight, StyleSheet, TouchableOpacity} from 'react-native'
import { Card, Header, Icon , SearchBar, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {initializefood } from '../actions';
import { HaH_Header, HaH_NavBar } from '../components/common';

import {colors, margin, padding, fonts, button} from '../styles/base.js'

var data=[];
var dailyCal = 0;

class MealLog extends Component {

    /*
    componentWillMount = () => {

    this.props.initializefood(this.props.userId,this.props.date);
            if(this.props.foodArray.length == 0){
                this.loadData(this.props); 
            } else{
                console.log("foodArray :", this.props.foodArray);
                this.loadData(this.props);
            }

    }


    componentWillReceiveProps = (nextProps) => { 
        console.log("componentWillReceiveProps ");
        this.loadData(nextProps)
    } 
    */

    onPress = (item) => {
        Actions.push("addfood",{item:item});
    }

    loadData = (props) => {
        data=[]; 
        let array=props.foodArray;
        array.map((item, i) => { 
   
            data.push(
                <TouchableHighlight
                    key={i}
                    onPress = {() => this.onPress(item)} 
                    underLayColor="transparent"
                    style = {{paddingTop: 0, paddingBottom: 0}}
                >
                    <View style = {{margin: 0, paddingBottom: 7}}>   
                        <Card
                            flexDirection = 'row' 
                            containerStyle = {styles.cardContainer}
                            wrapperStyle = {styles.cardWrapper}>
                            <Text style = {styles.foodName}>
                                Meal {item.mealNo}
                            </Text>
                            <Text style = {styles.cardHeader}>
                                {this.calculateMealCal(item.food)}
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


    goBack = () => {
        Actions.home();
    }

    addMealPg = () => {
          let ogFoodObj = this.props.foodArray;
          let i=1;
          console.log(ogFoodObj.length);
          if(ogFoodObj.length>0){
          while(_.some(ogFoodObj, { 'mealNo':i })){
              i++;
          } 
          let newObj={'mealNo':i,'food':[]};   
        Actions.push("addfood",{type:"addfood",item:newObj});
        } else{
            let newObj={'mealNo':1,'food':[]};   
            Actions.push("addfood",{type:"addfood",item:newObj});
        }              
    }

    showAddFoodNotes = () => {
        Actions.push("foodnotes");
    }


    Complete = () => {
        Actions.home();
    }

    calculateMealCal(food) {
        totalCals = 0;
        for(i = 0; i < food.length; i++) {
            totalCals += food[i].totalCalories;
        }
        dailyCal += totalCals;
        return totalCals;
    }

    render = () => {
        let addMeal = (
            <Icon
                name='add-box'
                underlayColor={"transparent"}
                color="white"
                marginTop={50}
                onPress = {this.addMealPg}
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
            <View style={{flex:1}}>
                <HaH_Header
                    text = 'Meal Log'
                    right = {addMeal}
                />
                {
                    (this.props.foodArray.length == 0) ? <View style={{flex: 1, height:"75%"}}></View> :
                    <View style = {{flex: 1}}>
                        <FlatList
                                data={this.props.foodArray}
                                renderItem={({item}) => (
                                    <TouchableOpacity
                                        key={i}
                                        onPress = {() => this.onPress(item)} 
                                        underLayColor="transparent"
                                        style = {{padding: 7}}
                                    > 
                                        <Card
                                            flexDirection = 'row' 
                                            containerStyle = {styles.cardContainer}
                                            wrapperStyle = {styles.cardWrapper}>
                                            <Text style = {styles.foodName}>
                                                Meal {item.mealNo}
                                            </Text>
                                            <Text style = {styles.cardHeader}>
                                                {this.calculateMealCal(item.food)}
                                                <Text style={styles.servingSizeUnit}>
                                                    {' cals'}
                                                </Text>
                                            </Text>
                                        </Card>
                                    </TouchableOpacity>
                                )}
                                onEndReachedThreshold={0.5}
                                onEndReached={this.endReached}
                                keyExtractor={item => (item.mealNo.toString())}
                            />
                        <View style ={styles.totalCalView}>
                            <Text style={[styles.totalCal, {fontSize: 25}]}>
                                Daily Calories
                            </Text>
                            <Text style={[styles.totalCal, {fontSize: 25}]}>
                                {dailyCal.toFixed(2)}
                            </Text>
                        </View>
                    </View>
                }
                <View style={{paddingLeft: '4%', paddingRight: '4%', paddingTop: '2%', paddingBottom: '4%'}}> 
                    <TouchableOpacity
                        style = {[button.touchable, {backgroundColor: colors.brandblue}]}
                        onPress={this.showAddFoodNotes}>
                        <View style={button.view}>
                            <Text style = {button.text}>
                                Meal Notes
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <HaH_NavBar
                    selected = {2}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        marginTop: 0,
        elevation: 7,
        borderRadius: 10,
    },
    cardHeader: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'right',
        fontFamily: fonts.primary, 
        color: colors.primary
    },
    cardWrapper: {        
        flexDirection: 'row',
        flex: 1,
        marginLeft: 0,
        justifyContent: 'space-between'
    },
    foodName: {
        fontSize: 25,
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
    servingSizeUnit: {
        fontSize: 15,
        fontFamily: fonts.primary, 
        color: colors.brandgrey,
        textAlign:'right',
        alignSelf: 'flex-end',
    },
    totalCalView: {
        flexDirection: 'row',
        paddingLeft: '12%',
        paddingRight: '12%',
        justifyContent: 'space-between'
    },
    totalCal: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left',
        fontFamily: fonts.primary, 
        color: colors.primary,
        //backgroundColor: "red",
        paddingTop: '2%',
    },
});

//export default AddFood;

const mapStateToProps = state => {
    return {
        foodArray: state.food.foodArray,
        userId: state.auth.userId,
        date: state.auth.date
    };
};

export default connect(mapStateToProps, {initializefood}) (MealLog);
