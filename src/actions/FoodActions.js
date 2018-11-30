import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import axios from 'axios';

import {
        FOOD_INITIALIZE,
        FOOD_ADDED,
        GET_CALORIES
       } from './types';

export const getCalories = (userId,date) => {
        return (dispatch) => {    
            axios({ 
                method: "get",
                url: "http://150.212.204.82:5000/dashboard", 
                headers : {'Content-type': 'application/json'}, 
                params : { 
                    'userId': userId,
                    'date': date
                   } 

            
            }).then(function(response) {
                
                if (response.data.code === 400) {
            
                } else {
                    dispatch({ type: GET_CALORIES,
                        totalCal: response.data.data.calorieGoals.totalCal, 
                        remainingCal:response.data.data.calorieGoals.remainingCal,
                        totalDuration: response.data.data.exerciseGoals.totalDuration,
                        remainingDuration:response.data.data.exerciseGoals.remainingDuration })
                }
                
            }).catch((e) => {
                console.log("inside catch",e);
            })
              
     };
    };

    
export const initializefood = (userId,date) => {
        return (dispatch) => {  
            axios({
                method: "get", 
                url: "http://150.212.204.82:5000/meallog",
                headers : {'Content-type': 'application/json'}, 
                params : {
                    'userId': userId,
                    'date': date
                   } 

            
            }).then(function(response) {
                
                if (response.data.code === 400) {
                    console.log("error code 400 returned on mealLog get");
                } else {
                    dispatch({ type: FOOD_INITIALIZE, payload: response.data.data })
                }
                
            }).catch((e) => {
                console.log("inside catch of meallog get");
            })              
     };
    };

    export const addMealToMealLog = (userId,date,mealObj,call,totalCal) => {
        return (dispatch) => { 
            axios({
                method: call, 
                url: "http://150.212.204.82:5000/meallog",
                headers : {'Content-type': 'application/json'}, 
                data : {
                    'userId': userId,
                    'date': date,
                    'mealData':mealObj,
                    'cartCal': parseInt(totalCal)
                   } 

            
            }).then(function(response) {
                
                if (response.data.code === 400) {
                    console.log("Server responded with 400 for post method of add meal");

                } else {
                  //not sure if it will go to willmount or will receive props?  
                  Actions.meallog();
                }
                
            }).catch((e) => {
                console.log("inside catch of post method of add meal");
            })
        };      
    };

    export const removeMeal = (userId,date,mealObj) => {
        return(dispatch) => {
            axios({
                method: "delete", 
                url: "http://150.212.204.82:5000/meallog",
                headers : {'Content-type': 'application/json'}, 
                params : {
                    'userId': userId,
                    'date': date,
                    'cartId':mealObj.cartId
                   } 

            
            }).then(function(response) {
                
                if (response.data.code === 400) {
                    console.log("Server responded with 400 for delete method of add meal");

                } else {
                  //not sure if it will go to willmount or will receive props?  
                  Actions.meallog();
                }
                
            }).catch((e) => {
                console.log("inside catch of delete method of add meal");
            })  
        };
    };

    
    export const initializemeal = (mealObj, call) => {
        return (dispatch) => {
            dispatch({
                type: FOOD_ADDED,
                mealObj:mealObj,
                call:call
            });
        }    
    }

    export const addfood = (foodobj,meal,firstTime,call) => {
        return (dispatch) => {
        if(firstTime){
            let array=meal.food;
            let finalObj={};
            array.push(foodobj);
            finalObj={
                'mealName':meal.mealName,
                'cartId':meal.cartId,
                'food':array
            }

            dispatch({
                type: FOOD_ADDED,
                mealObj:finalObj
            });
            Actions.push("addfood", {item:finalObj, call: call, viewOnly:false});


        } else{
            let array=[];
            let finalObj={};
            array = _.reject(meal.food, function(item) { return foodobj.id === item.id; });
            array.push(foodobj);
            finalObj={
                'mealName':meal.mealName,
                'cartId':meal.cartId,
                'food':array
            }

            dispatch({
                type: FOOD_ADDED,
                mealObj:finalObj
            });
            Actions.push("addfood", {item:finalObj, call: call, viewOnly:false});

        }
    }
    }

    export const removefood = (foodObj,meal,call) => {
        return (dispatch) => {  

        let array=[];
        let finalObj={};
        array = _.reject(meal.food, function(item) { return item.id === foodObj.id; });
        finalObj={
            'mealName':meal.mealName,
            'cartId':meal.cartId,
            'food':array
        }

        dispatch({
            type: FOOD_ADDED,
            mealObj:finalObj
        });
        Actions.push("addfood", {item:finalObj, call:call, viewOnly:false});

    }
    }

    







