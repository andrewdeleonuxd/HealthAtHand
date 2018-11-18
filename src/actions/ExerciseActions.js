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
             Actions.exerciselog();
             //Actions.addexercise();
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
              //   exerciseArray = _.reject(exerciseArray, function(item) { return item.id === exerciseobj.id; });
                 exerciseArray.push(newobj)
                 dispatch({
                  type: EXERCISE_ADDED,
                  payload:exerciseArray
                 });
                 Actions.exerciselog();
                // Actions.addexercise();
             } else{
             exerciseArray = _.reject(exerciseArray, function(item) { return item.id === exerciseobj.id; });
             exerciseArray.push(exerciseobj);
     
             
             dispatch({
                 type: EXERCISE_ADDED,
                 payload:exerciseArray
                });
                Actions.exerciselog();
               // Actions.addexercise();
             } 
          
         }   
             
      };
     };    

/*
export const addexercise = (exerciseobj,exerciseNo,ogExerciseObj,firstTime) => {

    if(_.some(ogExerciseObj, { 'exerciseNo':exerciseNo })){
    let meal,exerciseArray;
    let newObj={};
    meal = _.filter(ogExerciseObj, { 'exerciseNo':exerciseNo});
    exerciseArray=meal[0].exercise;
    ogExerciseObj = _.reject(ogExerciseObj, { 'exerciseNo': exerciseNo});

    
   return (dispatch) => {
    if(!_.find(exerciseArray, {id: exerciseobj.id})){
        exerciseArray.push(exerciseobj);
        newObj={'exerciseNo':exerciseNo,'exercise':exerciseArray};
        ogExerciseObj.push(newObj); 
        dispatch({
            type: EXERCISE_ADDED,
            payload:ogExerciseObj
        });
        Actions.push("addexercise", {item:newObj});
    } else{
        if(firstTime){
            let obj= _.filter(exerciseArray, ['id', exerciseobj.id]);

            let newobj={
                id:exerciseobj.id,
                itemName:exerciseobj.itemName,
                intensity:exerciseobj.intensity,
                duration:exerciseobj.duration,
                type:exerciseobj.type
               }
               exerciseArray = _.reject(exerciseArray, function(item) { return item.id === exerciseobj.id; });
               exerciseArray.push(newobj)
            newObj={'exerciseNo':exerciseNo,'exercise':exerciseArray};
            ogExerciseObj.push(newObj); 
            dispatch({
             type: EXERCISE_ADDED,
             payload:ogExerciseObj
            });
            Actions.push("addexercise", {item:newObj});

        } else{
            
            exerciseArray = _.reject(exerciseArray, function(item) { return item.id === exerciseobj.id; });
            exerciseArray.push(exerciseobj);
        newObj={'exerciseNo':exerciseNo,'exercise':exerciseArray};
        ogExerciseObj.push(newObj); 
        dispatch({
            type: EXERCISE_ADDED,
            payload:ogExerciseObj
           });
           Actions.push("addexercise", {item:newObj});
        } 
     
    }   
        
 };
} else{

    return (dispatch) => {
        let exerciseArray=[exerciseobj];
        let newObj={'exerciseNo':exerciseNo,'exercise':exerciseArray};
        ogExerciseObj.push(newObj);
        dispatch({
            type: EXERCISE_ADDED,
            payload:ogExerciseObj
           });
           Actions.push("addexercise", {item:newObj});
    } 
    
}
};
*/

export const removeexercise = (exerciseobj,exerciseArray) => {
    return (dispatch) => { 
     
    exerciseArray = _.reject(exerciseArray, function(item) { return item.id === exerciseobj.id; });
   

     
     dispatch({
         type: EXERCISE_ADDED,
         payload:exerciseArray
     });
     Actions.exerciselog();
   //  Actions.addexercise();
    // Actions.push("addfood");
     
  };
 };

 /*
 export const removeexercise = (exerciseobj,exerciseNo,ogExerciseObj) => {
    let meal,exerciseArray;
    let newObj={};
    meal = _.filter(ogExerciseObj, { 'exerciseNo':exerciseNo});
    exerciseArray=meal[0].exercise;
    exerciseArray= _.reject(exerciseArray, { 'id': exerciseobj.id});

    if(exerciseArray.length>0){
    ogExerciseObj = _.reject(ogExerciseObj, { 'exerciseNo': exerciseNo});
    newObj={'exerciseNo':exerciseNo,'exercise':exerciseArray}
     
    ogExerciseObj.push(newObj);

    return (dispatch) => { 
     
     dispatch({
         type: EXERCISE_ADDED,
         payload:ogExerciseObj
     });
 
     Actions.push("addexercise", {item:newObj});
     
  };
} else{
    ogExerciseObj = _.reject(ogExerciseObj, { 'exerciseNo': exerciseNo});
    return (dispatch) => { 
     
        dispatch({
            type: EXERCISE_ADDED,
            payload:ogExerciseObj
        });
    
        Actions.exerciselog();
        
     };
}


 };
 */

 
