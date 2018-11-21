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
                url: "http://10.0.0.241:5000/dashboard", 
                headers : {'Content-type': 'application/json'}, 
                params : { 
                    'userId': userId,
                    'date': date
                   } 

            
            }).then(function(response) {
                
                if (response.data.code === 400) {
            
                } else {
                    dispatch({ type: GET_CALORIES, totalCal: response.data.data.totalCal, remainingCal:response.data.data.remainingCal })
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
                url: "http://10.0.0.241:5000/meallog",
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

    export const addMealToMealLog = (userId,date,mealObj) => {
        return (dispatch) => {  
            axios({
                method: "post", 
                url: "http://10.0.0.241:5000/meallog",
                headers : {'Content-type': 'application/json'}, 
                data : {
                    'userId': userId,
                    'date': date,
                    'mealData':mealObj
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
        return (dispatch) => {
            axios({
                method: "delete", 
                url: "http://10.0.0.241:5000/meallog",
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

        }
    }

    
    export const initializemealObj = (mealObj) => {
        return (dispatch) => {
            dispatch({
                type: FOOD_ADDED,
                mealObj:mealObj
            });
        }    
    }

    export const addfood = (foodobj,meal,firstTime) => {
        return (dispatch) => {
        if(firstTime){

        } else{
            let array=[];
            let finalObj={};
            array = _.reject(meal.food, function(item) { return foodobj.id === item.id; });
            array.push(foodobj);
            finalObj={
                mealName:meal.mealName,
                cartId:meal.cartId,
                food:array
            }
            dispatch({
                type: FOOD_ADDED,
                mealObj:finalObj
            });
            Actions.push("addfood", {item:finalObj});
        }
    }
    }

    export const removefood = (foodObj,meal) => {
        let array=[];
        let finalObj={};
        array = _.reject(meal.food, function(item) { return foodobj.id === item.id; });
        finalObj={
            mealName:meal.mealName,
            cartId:meal.cartId,
            food:array
        }
        dispatch({
            type: FOOD_ADDED,
            mealObj:finalObj
        });
        Actions.push("addfood", {item:finalObj});

    }

    
/*
export const addfood = (foodobj,mealNo,ogFoodObj,firstTime) => {

    if(_.some(ogFoodObj, { 'mealNo':mealNo })){
    let meal,foodArray;
    let newObj={};
    meal = _.filter(ogFoodObj, { 'mealNo':mealNo});
    foodArray=meal[0].food;
    ogFoodObj = _.reject(ogFoodObj, { 'mealNo': mealNo});

    
   console.log("inside food action where foodobj : ",foodobj," foodArray : ",foodArray," firstTime : ",firstTime);
   return (dispatch) => {
    if(!_.find(foodArray, {id: foodobj.id})){
        foodArray.push(foodobj);
        newObj={'mealNo':mealNo,'food':foodArray};
        ogFoodObj.push(newObj); 
        dispatch({
            type: FOOD_ADDED,
            payload:ogFoodObj
        });
        Actions.push("addfood", {item:newObj});
    } else{
        if(firstTime){
            let obj= _.filter(foodArray, ['id', foodobj.id]);
            console.log("********** obj :",obj,"   foodobj : ",foodobj);
            newtotalCalories=obj[0].totalCalories+foodobj.totalCalories;
            newservingSize=parseInt(obj[0].servingSize)+parseInt(foodobj.servingSize);
            newservingSize = newservingSize.toString();
            let newobj={
             id:foodobj.id,
             itemName:foodobj.itemName,
             totalCalories:newtotalCalories,
             Calories:foodobj.Calories,
             servingSize:newservingSize
            }
            foodArray = _.reject(foodArray, function(item) { return item.id === foodobj.id; });
            foodArray.push(newobj);
            newObj={'mealNo':mealNo,'food':foodArray};
            ogFoodObj.push(newObj); 
            dispatch({
             type: FOOD_ADDED,
             payload:ogFoodObj
            });
            Actions.push("addfood", {item:newObj});
        } else{
        foodArray = _.reject(foodArray, function(item) { return item.id === foodobj.id; });
        foodArray.push(foodobj);
        newObj={'mealNo':mealNo,'food':foodArray};
        ogFoodObj.push(newObj); 
        dispatch({
            type: FOOD_ADDED,
            payload:ogFoodObj
           });
           Actions.push("addfood", {item:newObj});
        } 
     
    }   
        
 };
} else{

    return (dispatch) => {
        let foodArray=[foodobj];
        let newObj={'mealNo':mealNo,'food':foodArray};
        ogFoodObj.push(newObj);
        dispatch({
            type: FOOD_ADDED,
            payload:ogFoodObj
           });
           Actions.push("addfood", {item:newObj});
    } 
    
}
};
*/






