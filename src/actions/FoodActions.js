import { Actions } from 'react-native-router-flux';
import _ from 'lodash';


import {
        FOOD_INITIALIZE,
        FOOD_ADDED
       } from './types';


export const initializefood = (foodobj,foodArray) => {
        return (dispatch) => {  
        foodArray.push(foodobj); 
         dispatch({
             type: FOOD_INITIALIZE,
             payload:foodArray
         });
              
     };
    };

export const addfood = (foodobj,foodArray,firstTime) => {

    console.log("inside food action where foodobj : ",foodobj," foodArray : ",foodArray," firstTime : ",firstTime);
   return (dispatch) => {
    if(!_.find(foodArray, {id: foodobj.id})){
        foodArray.push(foodobj); 
        dispatch({
            type: FOOD_ADDED,
            payload:foodArray
        });
        Actions.addfood();
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
            foodArray.push(newobj)
            dispatch({
             type: FOOD_ADDED,
             payload:foodArray
            });
            Actions.addfood();
        } else{
        foodArray = _.reject(foodArray, function(item) { return item.id === foodobj.id; });
        foodArray.push(foodobj);

        
        dispatch({
            type: FOOD_ADDED,
            payload:foodArray
           });
           Actions.addfood();
        } 
     
    }   
    
    
  

    
   // Actions.push("addfood");
    
 };
};

export const removefood = (foodobj,foodArray) => {
    return (dispatch) => { 
     
    foodArray = _.reject(foodArray, function(item) { return item.id === foodobj.id; });
   

     
     dispatch({
         type: FOOD_ADDED,
         payload:foodArray
     });
 
     Actions.addfood();
    // Actions.push("addfood");
     
  };
 };
