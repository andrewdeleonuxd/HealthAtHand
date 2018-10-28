import React,{Component} from 'react';
import _ from 'lodash';
import {View, Text, FlatList, Image, TouchableHighlight} from 'react-native'
import { Card, Header, Icon , SearchBar, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {initializefood } from '../actions';

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
       array.map((item, i) => {
   
        data.push(
            <TouchableHighlight
            key={i}
            onPress = {() => this.onPress(item)}
            underLayColor="transparent"
            >
            <View >   
            <Card flexDirection='row'>
                <Text style={{
                    color: "maroon",
                    fontSize: 15, 
                    marginBottom: 5,
                }}>Meal {item.mealNo}</Text>
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
          let newObj={'mealNo':this.props.foodArray.length + 1,'food':[]};   
        Actions.push("addfood",{type:"addfood",item:newObj});
                       
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
            <View>
                <Header
                    outerContainerStyles={{height:60,backgroundColor:"#0F084B"}}
                    leftComponent={backButton}
                    centerComponent={{ text: 'Meal Log', style: { color: '#fff',fontSize:17 }}}
                    rightComponent={addMeal}
                />
             
                    {
                    (this.props.foodArray.length == 0) ? <View></View> : 
                    <View style={{backgroundColor:"white", height:"75%"}}>

                              {data}
                                 
                    </View>   
                    } 

                    {
                    (this.props.foodArray.length == 0) ? <View></View> : 
                      <View style={{backgroundColor:"white"}}>  
                      <Card>
                                    <Button
                                    title='Complete Diary' 
                                    backgroundColor="blue"
                                    onPress={this.Complete}
                                    />
                            </Card> 
                       </View>  
                    }   

            </View>
        )
    }
}

//export default AddFood;

const mapStateToProps = state => {
    return {
        foodArray: state.food.foodArray
    };
};

<<<<<<< HEAD
export default connect(mapStateToProps, {initializefood}) (MealLog);
=======
export default connect(mapStateToProps, {initializefood}) (MealLog);
>>>>>>> vishal
