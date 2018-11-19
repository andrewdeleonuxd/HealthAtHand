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
                url: "http://150.212.219.117:5000/dashboard", 
                headers : {'Content-type': 'application/json'}, 
                params : { 
                    'userId': userId,
                    'date': date
                   } 

            
            }).then(function(response) {
                
                if (response.data.code === 400) {
            
                 //   dispatch({ type: LOGIN_USER_FAIL})
            
                } else {
                   console.log("%%%%%%%%%%%%%% :",response.data);
                    dispatch({ type: GET_CALORIES, totalCal: response.data.data.totalCal, remainingCal:response.data.data.remainingCal })
                 //   Actions.home();
                }
                
            }).catch((e) => {
                console.log("inside catch",e);
            })


            /*

        foodArray.push(foodobj); 
         dispatch({
             type: FOOD_INITIALIZE,
             payload:foodArray
         });

         */
              
     };
    };

    
export const initializefood = (userId,date) => {
        return (dispatch) => {  
            axios({
                method: "get", 
                url: "http://150.212.219.117:5000/meallog",
                headers : {'Content-type': 'application/json'}, 
                params : {
                    'userId': userId,
                    'date': date
                   } 

            
            }).then(function(response) {
                
                if (response.data.code === 400) {
            
                 //   dispatch({ type: LOGIN_USER_FAIL})
            
                } else {

                    dispatch({ type: FOOD_INITIALIZE, payload: response.data.data })
                   // Actions.home();
                }
                
            }).catch((e) => {
                console.log("inside catch",e);
            })              
     };
    };

    export const addMealToMealLog = (userId,date,foodArray) => {
        return (dispatch) => {  
            axios({
                method: "post", 
                url: "http://150.212.219.117:5000/meallog",
                headers : {'Content-type': 'application/json'}, 
                data : {
                    'userId': userId,
                    'date': date,
                    'meallog':foodArray
                   } 

            
            }).then(function(response) {
                
                if (response.data.code === 400) {
            
                 //   dispatch({ type: LOGIN_USER_FAIL})
            
                } else {

                  //  dispatch({ type: FOOD_INITIALIZE, payload: response.data.data })
                  Actions.meallog();
                }
                
            }).catch((e) => {
                console.log("inside catch",e);
            })              
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

export const removeMeal = (ogFoodObj,mealNo,userId,date) => {
    ogFoodObj = _.reject(ogFoodObj, { 'mealNo': mealNo});
    return (dispatch) => { 
     
       

        axios({
            method: "post", 
            url: "http://150.212.219.117:5000/meallog",
            headers : {'Content-type': 'application/json'}, 
            data : {
                'userId': userId,
                'date': date,
                'meallog':ogFoodObj
               } 

        
        }).then(function(response) {
            
            if (response.data.code === 400) {
        
             //   dispatch({ type: LOGIN_USER_FAIL})
        
            } else {

              //  dispatch({ type: FOOD_INITIALIZE, payload: response.data.data })
              dispatch({
                type: FOOD_ADDED,
                payload:ogFoodObj
            });
              Actions.meallog();
            }
            
        }).catch((e) => {
            console.log("inside catch",e);
        })  
    
       // Actions.meallog();
        
     };
}

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
