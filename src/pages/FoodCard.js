import React,{Component} from 'react'
import {View, Text, Picker, ActivityIndicator,TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux'
import { Card, Header, Icon, Button } from 'react-native-elements';
import {addfood,removefood} from '../actions';
import _ from 'lodash'; 
import { HaH_Header, HaH_NavBar } from '../components/common';
import {colors, margin, padding, fonts, button} from '../styles/base.js'


 
class FoodCard extends Component {

    state ={
        showLoader:true,
        food:{},
        servingSize:"1",
        servingSizeUnit:"",
        foodname:"",
        id:null,
        numCal:null,
        servings:"1"
    }

    componentWillMount = () => {
        console.log("inside compo will mount");
        this.formData(this.props)
    }

    componentWillReceiveProps = (nextProps) => {
        console.log("inside compo will receive prop mount");
        this.formData(nextProps)
    }

    formData = (props)  => {

        this.setState({
            showLoader:false,
            id:props.item.id,
            foodname:props.item.foodname,
            numCal:props.item.numCal,
            servingSize:props.item.servingSize, 
            servingSizeUnit:props.item.servingSizeUnit,
            servings:props.item.servingSize
        })  
    }

    goBack = () => {
        Actions.push("addfood", {item:this.props.mealObj});
    } 

    Add = () => {
        let obj={
            'id':this.state.id,
            'foodname':this.state.foodname,
            'numCal':this.state.numCal,
            'servingSize':""+this.state.servingSize,
            'servingSizeUnit':""+this.state.servingSizeUnit,
            'totalCalories': this.state.servings * this.state.numCal
        }
        this.props.addfood(obj,this.props.mealObj,this.props.firstTime,this.props.call);
    }

    onRemove = () => {
        let obj={
            'id':this.state.id,
            'foodname':this.state.foodname,
            'numCal':this.state.numCal,
            'servingSize':""+this.state.servingSize,
            'servingSizeUnit':""+this.state.servingSizeUnit,
            'totalCalories': this.state.servings * this.state.numCal
        }
        this.props.removefood(obj,this.props.mealObj,this.props.call);
    }

    onservingSizeChange = (text) =>{
        let newText = '';
        let numbers = '0123456789';

        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
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
        (this.props.firstTime == true) ? label = "Add Food to Meal" : label = "Confirm Changes"
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
            <View style = {{flex: 1}}>
                <HaH_Header
                    left = {backButton}
                    text = {this.titleLabel()}
                />
                <View style = {{flex: 1}}>
                {
                    (this.state.showLoader == true) ? <ActivityIndicator size="large" color="#0000ff" /> : 
                    <View style={{flex: 1, paddingTop: '2%', paddingBottom: '2%'}}>
                        <Card
                            containerStyle = {styles.cardContainer}
                            wrapperStyle = {styles.cardWrapper}>
                            <Text style = {styles.cardHeader}>
                                {this.capitalize(this.state.foodname)}
                            </Text>
                        </Card>
                        <View style={{flex: 1, paddingTop: '3%'}}>
                            <View style={styles.userInputs}>
                                <Text style={styles.userInputText}>
                                    Serving Size
                                </Text>
                                <Text style={styles.servingSizeQty}>
                                    {this.state.servingSize}
                                    <Text style={styles.servingSizeUnit}>
                                        {" " + this.state.servingSizeUnit}
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
                                        value={"" + this.state.servings}
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
                                {this.state.servings * this.state.numCal}
                            </Text>
                        </View>
                        
                        {
                            (this.props.firstTime == true) ? <View/>:
                            <View style={{paddingLeft: '4%', paddingRight: '4%', paddingTop: '2%', paddingBottom: '2%'}}>
                                <TouchableOpacity
                                    style = {[button.touchable, {backgroundColor: 'red'}]}
                                    onPress={this.onRemove}>
                                    <View style={button.view}>
                                        <Text style = {styles.deleteText}>
                                            Delete Food
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                        <View style={{paddingLeft: '4%', paddingRight: '4%', paddingTop: '2%', paddingBottom: '2%'}}>
                            <TouchableOpacity
                                style = {[button.touchable, {backgroundColor: colors.brandgold}]}
                                onPress = {this.Add}>
                                <View style={button.view}>
                                    <Text style = {styles.confirmText}>
                                        {this.confirmLabel()}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                </View>
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
        fontFamily: fonts.primary, 
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
        fontFamily: fonts.primary, 
        color: colors.primary,
        paddingTop: '2%',
    },
    servingSizeQty: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: fonts.primary, 
        color: colors.brandblue,
        textAlign:'right',
        alignSelf: 'flex-end'
    },
    servingSizeUnit: {
        fontSize: 15,
        fontFamily: fonts.primary, 
        color: colors.brandgrey,
        textAlign:'right',
        alignSelf: 'flex-end',
    },
    userInput: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'right',
        fontFamily: fonts.primary, 
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
        fontFamily: fonts.primary, 
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
        fontFamily: fonts.primary, 
        color: colors.brandwhite,
        textAlignVertical: 'center',
    },
});

const mapStateToProps = state => {
    return {
        foodArray: state.food.foodArray,
        mealObj: state.food.mealObj
    };
};

export default connect(mapStateToProps, {addfood,removefood}) (FoodCard);

 