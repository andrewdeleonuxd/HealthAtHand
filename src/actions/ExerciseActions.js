import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import axios from 'axios';



import {
        EXERCISE_INITIALIZE,
        EXERCISE_ADDED
       } from './types'; 


export const initializeExercise = (userId,date) => {
        return (dispatch) => {  
            axios({
                method: "get", 
                url: "http://150.212.219.117:5000/exerlog",
                headers : {'Content-type': 'application/json'}, 
                params : {
                    'userId': userId,
                    'date': date
                   } 

            
            }).then(function(response) {
                
                if (response.data.code === 400) {
            

                } else {

                    dispatch({ type: EXERCISE_INITIALIZE, payload: response.data.data })
                }
                
            }).catch((e) => {
                console.log("inside catch",e);
            })              
     };
    };    

    export const addexercise = (exerciseobj,exerciseArray,firstTime,userId,date) => {

        return (dispatch) => {
         if(!_.find(exerciseArray, {id: exerciseobj.id})){
             exerciseArray.push(exerciseobj); 

             axios({
                method: "post", 
                url: "http://150.212.219.117:5000/exerlog",
                headers : {'Content-type': 'application/json'}, 
                data : {
                    'userId': userId,
                    'date': date,
                    'exerciseLog': exerciseArray
                   } 

            
            }).then(function(response) {
                
                if (response.data.code === 400) {
            

                } else {

                    dispatch({ type: EXERCISE_ADDED, payload: exerciseArray })
                    Actions.exerciselog();
                }
                
            }).catch((e) => {
                console.log("inside catch",e);
            }) 

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
                 exerciseArray.push(newobj)


                 axios({
                    method: "post", 
                    url: "http://150.212.219.117:5000/exerlog",
                    headers : {'Content-type': 'application/json'}, 
                    data : {
                        'userId': userId,
                        'date': date,
                        'exerciseLog': exerciseArray
                       } 
    
                
                }).then(function(response) {
                    
                    if (response.data.code === 400) {
                
    
                    } else {
    
                        dispatch({ type: EXERCISE_ADDED, payload: exerciseArray })
                        Actions.exerciselog();
                    }
                    
                }).catch((e) => {
                    console.log("inside catch",e);
                }) 

             } else{
             exerciseArray = _.reject(exerciseArray, function(item) { return item.id === exerciseobj.id; });
             exerciseArray.push(exerciseobj);
     

             axios({
                method: "post", 
                url: "http://150.212.219.117:5000/exerlog",
                headers : {'Content-type': 'application/json'}, 
                data : {
                    'userId': userId,
                    'date': date,
                    'exerciseLog': exerciseArray
                   } 

            
            }).then(function(response) {
                
                if (response.data.code === 400) {
            

                } else {

                    dispatch({ type: EXERCISE_ADDED, payload: exerciseArray })
                    Actions.exerciselog();
                }
                
            }).catch((e) => {
                console.log("inside catch",e);
            })   

             } 
          
         }   
             
      };
     };    



export const removeexercise = (exerciseobj,exerciseArray,userId,date) => {
    return (dispatch) => { 
     
    exerciseArray = _.reject(exerciseArray, function(item) { return item.id === exerciseobj.id; });
   
    axios({
        method: "post", 
        url: "http://150.212.219.117:5000/exerlog",
        headers : {'Content-type': 'application/json'}, 
        data : {
            'userId': userId,
            'date': date,
            'exerciseLog': exerciseArray
           } 

    
    }).then(function(response) {
        
        if (response.data.code === 400) {
    

        } else {

            dispatch({ type: EXERCISE_ADDED, payload: exerciseArray })
            Actions.exerciselog();
        }
        
    }).catch((e) => {
        console.log("inside catch",e);
    }) 
     
  };
 };

 

 
