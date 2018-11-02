import React,{Component} from 'react'
import {View, Text, Picker, ActivityIndicator,TextInput, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux'
import { Card, Header, Icon, Button } from 'react-native-elements';
import {addfood,removefood} from '../actions';
import _ from 'lodash';
import { HaH_Header } from '../components/common';

import testResponse from '../testdata/nutrients_pizza.json'

import {colors, margin, padding} from '../styles/base.js'

//import NumberInput from 'rn-number-input';
 
class FoodCard extends Component {

    state ={
        showLoader:false,
        food:{},
    }

    componentWillMount = () => {
        const request = new Request('https://http://sis-teach-01.sis.pitt.edu/projects/healthathand/nat/' + this.props.food_name)
        this.formData(request)
    }

    componentDidMount = () => {
        if(this.props.firstTime){
            this.setState({
                showLoader:false,
                Calories:5
            })
        } else{
            this.setState({
                showLoader:false,
                Calories:this.props.item.Calories,
                servingSize:this.props.item.servingSize
            })
        }
      
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
            id:this.state.itemName,
            itemName:this.state.itemName,
            totalCalories:this.state.Calories*this.state.servingSize,
            Calories:this.state.Calories,
            servingSize:this.state.servingSize
        }
        

        this.props.addfood(obj,this.props.mealNo,this.props.foodArray,this.props.firstTime);
    }

    onRemove = () => {
        let obj={
            id:this.state.itemName,
            itemName:this.state.itemName,
            totalCalories:this.state.Calories*this.state.servingSize
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

    nameOfCard() {
        (this.props.firstTime == true) ? name = "Add Food" : name = "Edit Food"
        return name
    }

    capitalize(str) {
        console.log(str)
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
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
                    text = {this.nameOfCard()}
                />
                {
                    (this.state.showLoader == true) ? <ActivityIndicator size="large" color="#0000ff" /> : 
                    <View style={{flex: 1}}>
                                <Card
                                    containerStyle = {{ elevation: 7,
                                                        borderRadius: 10
                                                    }}
                                    wrapperStyle = {{flexDirection: 'row',
                                    flex: 1,
                                    marginLeft: 0}}>
                                    <Text style = {{
                                                        flex: 1,
                                                        fontSize: 25,
                                                        fontWeight: 'bold',
                                                        fontFamily: 'sans-serif-condensed', 
                                                        color: colors.primary,
                                                        textAlign:'left',
                                                        alignSelf: 'center',
                                                    }}>
                                        {this.capitalize(this.state.food.food_name)}
                                    </Text>
                                </Card>
                                 <Card flexDirection='row'>
                               
                                 <Text style={{
                                            color: "maroon",
                                            fontSize: 15,
                                            marginBottom: 5
                                        }}>ServingSize</Text>        
                                <TextInput  
                                     keyboardType = 'numeric'
                                     style={{  color:'maroon',
                                     paddingRight:5,
                                     paddingLeft:15,
                                     fontSize:15,
                                     lineHeight:23,
                                     marginLeft:"60%"
                                     }}
                                     onChangeText={this.onservingSizeChange.bind(this)}
                                     value={this.state.servingSize}
                                     />
                
                                </Card>
                                 <Card flexDirection='row'>
                                        <Text style={{
                                            color: "maroon",
                                            fontSize: 15,
                                            marginBottom: 5,
                                        }}>Calories</Text>
                                       <Text style={{
                                            color: "maroon",
                                            fontSize: 15,
                                            marginBottom: 5,
                                            marginLeft:"72%"
                                        }}>{this.state.Calories}</Text> 
                                 </Card>
                                 <Card flexDirection='row'>
                                        <Text style={{
                                            color: "maroon",
                                            fontSize: 15,
                                            marginBottom: 5,
                                        }}>Total Calories</Text>
                                       <Text style={{
                                            color: "maroon",
                                            fontSize: 15,
                                            marginBottom: 5,
                                            marginLeft:"60%"
                                        }}>{this.state.Calories*this.state.servingSize}</Text> 
                                 </Card>
                                 
                                 <Card>
                                    <Button
                                    title='Remove' 
                                    disabled={this.props.firstTime}
                                    backgroundColor="blue"
                                    onPress={this.onRemove}
                                    />
                                 </Card>
                               


                    </View>

                     
                }
            </View>
        )
    }
}
{/*
styles = StyleSheet.create({
    cardHeader: {
        flex: 1,
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed', 
        color: colors.primary,
        textAlign:'left',
        marginRight: 25,
        alignSelf: 'center',
        paddingLeft: 15
    },
    cardContainer: {
        elevation: 7,
        borderRadius: 10
    },
    cardWrapper: {
        flexDirection: 'row',
        flex: 1,
        marginLeft: 0
    },
})
*/}

//export default FoodCard;

const mapStateToProps = state => {
    return {
        foodArray: state.food.foodArray
    };
};

export default connect(mapStateToProps, {addfood,removefood}) (FoodCard);

