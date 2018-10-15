import { Actions } from 'react-native-router-flux';
import _ from 'lodash';


import {
        EXERCISE_INITIALIZE,
        EXERCISE_ADDED
       } from './types';


export const initializeExercise = (exerciseobj,exerciseArray) => {
        return (dispatch) => {  
        exerciseArray.push(exerciseobj); 
         dispatch({
             type: EXERCISE_INITIALIZE,
             payload:exerciseArray
         });
              
     };
    };


export const addexercise = (exerciseobj,exerciseArray,firstTime) => {

   return (dispatch) => {
    if(!_.find(exerciseArray, {id: exerciseobj.id})){
        exerciseArray.push(exerciseobj); 
        dispatch({
            type: EXERCISE_ADDED,
            payload:exerciseArray
        });
        Actions.addexercise();
    } else{
        if(firstTime){
            let obj= _.filter(exerciseArray, ['id', exerciseobj.id]);
       //     newtotalCalories=obj[0].totalCalories+foodobj.totalCalories;
       //     newservingSize=parseInt(obj[0].servingSize)+parseInt(foodobj.servingSize);
       //     newservingSize = newservingSize.toString();
            let newobj={
             id:exerciseobj.id,
             itemName:exerciseobj.itemName,
             intensity:exerciseobj.intensity,
             duration:exerciseobj.duration,
             type:exerciseobj.type
            }
            exerciseArray = _.reject(exerciseArray, function(item) { return item.id === exerciseobj.id; });
            exerciseArray.push(newobj)
            dispatch({
             type: EXERCISE_ADDED,
             payload:exerciseArray
            });
            Actions.addexercise();
        } else{
        exerciseArray = _.reject(exerciseArray, function(item) { return item.id === exerciseobj.id; });
        exerciseArray.push(exerciseobj);

        
        dispatch({
            type: EXERCISE_ADDED,
            payload:exerciseArray
           });
           Actions.addexercise();
        } 
     
    }   
        
 };
};

export const removeexercise = (exerciseobj,exerciseArray) => {
    return (dispatch) => { 
     
    exerciseArray = _.reject(exerciseArray, function(item) { return item.id === exerciseobj.id; });
   

     
     dispatch({
         type: EXERCISE_ADDED,
         payload:exerciseArray
     });
 
     Actions.addexercise();
    // Actions.push("addfood");
     
  };
 };

 