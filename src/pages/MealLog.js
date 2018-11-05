import React,{Component} from 'react';
import _ from 'lodash';
import {View, Text, FlatList, Image, TouchableHighlight, StyleSheet} from 'react-native'
import { Card, Header, Icon , SearchBar, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {initializefood } from '../actions';
import { HaH_Header, HaH_NavBar } from '../components/common';

import {colors, margin, padding} from '../styles/base.js'


var data=[];

class MealLog extends Component {

    state = {

    }

    componentWillMount = () => {
     /*
        let obj={
            id:"mango",
            itemName:"mango",
            totalCalories:25
        }
    */
        if(this.props.foodArray.length == 0){
         //   this.props.initializefood(obj,this.props.foodArray);
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

    onPress = (item) => {
        Actions.push("addfood",{item:item});
    }

    loadData = (props) => {
        data=[]; 
        let array=props.foodArray;
         array = array.sort((a, b) => Number(a.mealNo) - Number(b.mealNo));
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


    Complete = () => {
        Actions.home();
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
            <View style={{flex:1, marginTop: Expo.Constants.statusBarHeight}}>
                <HaH_Header
                    text = 'Meal Log'
                    right = {addMeal}
                />
                {
                    (this.props.foodArray.length == 0) ? <View style={{flex: 1, backgroundColor:"white", height:"75%"}}></View> : 
                    <View style={{flex: 1, backgroundColor:"white", height:"75%", paddingTop: 0}}>
                        {data}     
                    </View>   
                } 
                {
                    (this.props.foodArray.length == 0) ? <View style={{backgroundColor:"white"}}></View> : 
                    <View style={{backgroundColor:"white", padding: padding.sm}}>  
                        <Button 
                            titleStyle = {{fontSize: 100}}//{styles.notesTitle}
                            title = 'Notes'
                            onPress = {this.showAddFoodNotes}
                            
                            buttonStyle = {styles.notesButton}
                        />
                    </View>  
                }
                <HaH_NavBar
                    selected = {2}
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
        fontFamily: 'sans-serif-condensed', 
        color: colors.primary,
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
    headerCenter: {
        color: colors.brandwhite,
        fontSize:30, 
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed'
    },
    notesTitle: {
        fontSize: 700,
        //fontFamily: 'sans-serif-condensed'
    },
    notesButton: {
        backgroundColor: colors.primary,
        opacity: 0.8
    }
});

//export default AddFood;

const mapStateToProps = state => {
    return {
        foodArray: state.food.foodArray
    };
};

export default connect(mapStateToProps, {initializefood}) (MealLog);
