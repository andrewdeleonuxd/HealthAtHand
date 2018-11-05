import React,{Component} from 'react'
import {View, Text, Picker, ActivityIndicator,TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux'
import { Card, Header, Icon, Button } from 'react-native-elements';
import {addfood,removefood} from '../actions';
import _ from 'lodash';
import { HaH_Header, HaH_NavBar } from '../components/common';

import testResponse from '../testdata/nutrients_pizza.json'

import {colors, margin, padding} from '../styles/base.js'

//import NumberInput from 'rn-number-input';
 
class FoodCard extends Component {

    state ={
        showLoader:false,
        food:{},
        servings:"1"
    }

    componentWillMount = () => {
        const request = new Request('https://http://sis-teach-01.sis.pitt.edu/projects/healthathand/nat/' + this.props.food_name)
        this.formData(request)
    }

    componentDidMount = () => {
        {/*
        if(this.props.firstTime){
            this.setState({
                Calories:5
            })
        } else{
            this.setState({
                Calories:this.props.item.Calories,
                servingSize:this.props.item.servingSize
            })
        }
        */}
    }

    formData = (request)  => {
        {/*
        fetch(request)
            .then((response) => response.json())
            .then((responseJson)=>{
                if(responseJson.foods[0].length > 0) {
                    this.setState({food:responseJson.foods[0], showLoader:false})
                } else {
                    console.log("no data");
                }
            })
            .catch((error) => {
                console.log("error", error);
            })
        */}
        this.setState({food:testResponse.foods[0], showLoader:false})
        
        {/*
        if(testReponse.branded.length > 0) {
            console.log(testReponse.common.length)
            this.state.choices = testReponse.branded
            this.setState({choices:this.state.choices, showLoader:false})
        } else {
            this.state.choices = testReponse.branded
            console.log("no data");
        }
        
        */}
    }

    goBack = () => {
        Actions.push("addfood", {item:this.props.onBack});
    } 

    Add = () => {
        let obj={
            id:this.state.food.ndb_no,
            itemName:this.state.food.food_name,
            totalCalories:this.state.servings * this.state.food.nf_calories,
            Calories:this.state.food.nf_calories,
            servingSize:this.state.food.serving_unit
        }
        this.props.addfood(obj,this.props.mealNo,this.props.foodArray,this.props.firstTime);
    }

    onRemove = () => {
        let obj={
            id:this.state.food.ndb_no,
            itemName:this.state.food.food_name,
            totalCalories:this.state.servings * this.state.food.nf_calories
        }
        this.props.removefood(obj,this.props.mealNo,this.props.foodArray);
    }

    onservingSizeChange = (text) =>{
        let newText = '';
        let numbers = '0123456789';

        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                Alert.alert("please enter numbers only");
            }
        }
        this.setState({ servingSize:newText });   
      }

    titleLabel() {
        (this.props.firstTime == true) ? label = "Add Food" : label = "Edit Food"
        return label
    }

    confirmLabel() {
        (this.props.firstTime == true) ? label = "Add Food to Meal" : label = "Edit Food"
        return label
    }

    capitalize(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    isWholeNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n) && n.indexOf(".")==-1;
    }

    check(servings) {
        if(this.isWholeNumber(servings) || servings == ''){
            
            this.setState({servings}) 
        }
    }

    render = () => {

        let check = (
            <Icon
                name='check'
                underlayColor={"transparent"}
                color="white"
                marginTop={50}
                onPress = {this.Add}
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
            <View style = {{flex: 1, marginTop: Expo.Constants.statusBarHeight}}>
                <HaH_Header
                    left = {backButton}
                    text = {this.titleLabel()}
                />
                {
                    (this.state.showLoader == true) ? <ActivityIndicator size="large" color="#0000ff" /> : 
                    <View style={{flex: 1, paddingTop: '2%', paddingBottom: '2%'}}>
                        <Card
                            containerStyle = {styles.cardContainer}
                            wrapperStyle = {styles.cardWrapper}>
                            <Text style = {styles.cardHeader}>
                                {this.capitalize(this.state.food.food_name)}
                            </Text>
                        </Card>
                        <View style={{flex: 1, paddingTop: '3%'}}>
                            <View style={styles.userInputs}>
                                <Text style={styles.userInputText}>
                                    Serving Size
                                </Text>
                                <Text style={styles.servingSizeQty}>
                                    {this.state.food.serving_qty}
                                    <Text style={styles.servingSizeUnit}>
                                        {" " + this.state.food.serving_unit}
                                    </Text>
                                </Text>
                            </View>
                            <View style={styles.userInputs}>
                                <Text style={styles.userInputText}>
                                    Servings
                                </Text>
                                <View style={{backgroundColor: colors.brandgrey, paddingLeft: 5, paddingTop: 0, padding: 2, borderRadius: 10}}>
                                    <TextInput
                                        style={styles.userInput}
                                        onChangeText={(servings) => this.check(servings)}
                                        value={this.state.servings}
                                        underlineColorAndroid = 'rgba(0,0,0,0)'
                                        keyboardType='numeric'>
                                    </TextInput>
                                </View>
                            </View>                            
                        </View>
                        <View style={styles.userInputs}>
                            <Text style={[styles.userInputText, {fontSize: 35}]}>
                                Calories
                            </Text>
                            <Text style={[styles.userInputText, {fontSize: 35}]}>
                                {this.state.servings * this.state.food.nf_calories}
                            </Text>
                        </View>
                        
                        {
                            (this.props.firstTime == true) ? <View/>:
                            <View style={{paddingLeft: '4%', paddingRight: '4%', paddingTop: '2%', paddingBottom: '2%'}}>
                                <TouchableOpacity
                                    style = {styles.deleteButton}
                                    onPress={this.onRemove}>
                                    
                                    <Text style = {styles.deleteText}>
                                        Delete Food
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        }
                        <View style={{paddingLeft: '4%', paddingRight: '4%', paddingTop: '2%', paddingBottom: '2%'}}>
                            <TouchableOpacity
                                style = {styles.confirmButton}
                                onPress = {this.Add}>
                                <Text style = {styles.confirmText}>
                                    {this.confirmLabel()}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                <HaH_NavBar
                    selected={2}
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
        padding: 4,
        elevation: 7,
        borderRadius: 10
    },
    cardWrapper: {        
        alignItems: 'center'
    },
    userInputs: {
        flexDirection: 'row',
        paddingLeft: '12%',
        paddingRight: '12%',
        justifyContent: 'space-between'
    },
    userInputText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left',
        fontFamily: 'sans-serif-condensed', 
        color: colors.primary,
        //backgroundColor: "red",
        paddingTop: '2%',
    },
    servingSizeQty: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed', 
        color: colors.brandblue,
        textAlign:'right',
        alignSelf: 'flex-end'
    },
    servingSizeUnit: {
        fontSize: 15,
        fontFamily: 'sans-serif-condensed', 
        color: colors.brandgrey,
        textAlign:'right',
        alignSelf: 'flex-end',
    },
    userInput: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'right',
        fontFamily: 'sans-serif-condensed', 
        color: colors.primary,
        paddingLeft: 35,
        paddingRight: 10,
        justifyContent: 'center',
        
        //backgroundColor: "red",
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
//export default FoodCard;

const mapStateToProps = state => {
    return {
        foodArray: state.food.foodArray
    };
};

export default connect(mapStateToProps, {addfood,removefood}) (FoodCard);

 