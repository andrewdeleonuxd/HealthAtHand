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
            newtotalCalories=obj[0].totalCalories+foodobj.totalCalories;
            
            let newobj={
             id:foodobj.id,
             itemName:foodobj.itemName,
             totalCalories:newtotalCalories
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
