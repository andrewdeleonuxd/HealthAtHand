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
    
    
   // Actions.push("addfood");
    
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

export const removefood = (foodobj,mealNo,ogFoodObj) => {
    let meal,foodArray;
    let newObj={};
    meal = _.filter(ogFoodObj, { 'mealNo':mealNo});
    foodArray=meal[0].food;
    foodArray= _.reject(foodArray, { 'id': foodobj.id});

    if(foodArray.length>0){
    ogFoodObj = _.reject(ogFoodObj, { 'mealNo': mealNo});
    newObj={'mealNo':mealNo,'food':foodArray}
    ogFoodObj.push(newObj);
    
    return (dispatch) => { 
     
     dispatch({
         type: FOOD_ADDED,
         payload:ogFoodObj
     });
 
     Actions.push("addfood", {item:newObj});
     
  };
} else{
    ogFoodObj = _.reject(ogFoodObj, { 'mealNo': mealNo});
    return (dispatch) => { 
     
        dispatch({
            type: FOOD_ADDED,
            payload:ogFoodObj
        });
    
        Actions.meallog();
        
     };
}
 };
