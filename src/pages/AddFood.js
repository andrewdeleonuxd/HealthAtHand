import React,{Component} from 'react';
import _ from 'lodash';
import {View, Text, FlatList, Image, TouchableHighlight, StyleSheet} from 'react-native'
import { Card, Header, Icon , SearchBar, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {initializefood, removeMeal } from '../actions';

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

        /*
        let obj={
            id:"mango",
            itemName:"mango",
            totalCalories:25
        }
        
       
        if(this.props.item.food.length == 0){
         //   this.props.initializefood(obj,this.props.foodArray);
            this.loadData(this.props); 

        } else{
            this.loadData(this.props);
        }

        */
        this.loadData(this.props); 


    }


    componentWillReceiveProps = (nextProps) => { 
      //  alert("inside componentWillReceiveProps")
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
        Actions.meallog();
    }

    showFoodSearch = () => {
        Actions.push("searchfood", {mealNo:this.props.item.mealNo, onBack:this.props.item});
    }

    deleteMeal = () => {
        this.props.removeMeal(this.props.foodArray,this.props.item.mealNo);
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
                    left = {backButton}
                    text = {'Meal ' + this.props.item.mealNo}
                    right = {search}
                />
                {
                    (data.length == 0) ? <View style={{flex: 1, backgroundColor:"white", height:"75%"}}></View>: 
                    <View style={{flex: 1, backgroundColor:"white", height:"75%"}}>
                        <View style={{flex: 1, margin: 0}}>
                            {data} 
                        </View>
                        <View style = {{flex: 1}}/>
                        <View style={styles.deleteView}>
                            <Button 
                                titleStyle = {styles.confirmText}
                                title = 'Delete Meal'
                                onPress = {this.deleteMeal}
                                buttonStyle = {styles.deleteButton}
                                containerStyle = {styles.confirmContainer}
                            />
                        </View>
                        <View style={styles.confirmView}>
                            <Button 
                                titleStyle = {styles.confirmText}
                                title = 'Add Meal to Log'
                                onPress = {this.goBack}
                                buttonStyle = {styles.confirmButton}
                                containerStyle = {styles.confirmContainer}
                            />
                        </View>
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
		opacity: 0.8,
		//marginLeft: '10%',
		//marginRight: '10%',
		borderRadius: 5,
		//borderWidth: 1
    },
    deleteButton: {
		backgroundColor: "red",
		opacity: 0.8,
		//marginLeft: '10%',
		//marginRight: '10%',
		borderRadius: 5,
		//borderWidth: 1
	},
	confirmContainer: {
		flexDirection:'row',
		//alignItems: 'center',
		//justifyContent: 'center',
		
	},
	confirmView: {
		backgroundColor: colors.brandwhite,
		paddingBottom: '10%'
		//paddingBottom: padding.sm,
    },
    deleteView: {
		backgroundColor: colors.brandwhite,
		paddingBottom: '3%'
		//paddingBottom: padding.sm,
    },
    confirmText: {
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed', 
        color: colors.primary,

        fontSize: 100,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    servingSizeUnit: {
        fontSize: 15,
        fontFamily: 'sans-serif-condensed', 
        color: colors.brandgrey,
        textAlign:'right',
        alignSelf: 'flex-end',
    },
});

//export default AddFood;

const mapStateToProps = state => {
    return {
        foodArray: state.food.foodArray
    };
};

export default connect(mapStateToProps, {initializefood, removeMeal}) (AddFood);
