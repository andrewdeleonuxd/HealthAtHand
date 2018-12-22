import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import axios from 'axios';



import {
        EXERCISE_INITIALIZE,
        EXERCISE_SEARCH_RESULT,
        EXERCISE_ADDED
       } from './types'; 


export const initializeExercise = (userId,date) => {
        return (dispatch) => {  
            axios({
                method: "get", 
                url: "http://joshkoshy.com:5000/exerlog",
                headers : {'Content-type': 'application/json'}, 
                params : {
                    'userId': userId,
                    'date': date
                   } 

            
            }).then(function(response) {
                
                if (response.data.code === 400) {
            
                    console.log("Server responds with code 400 for exercise get");
                } else {
                    dispatch({ type: EXERCISE_INITIALIZE, payload: response.data.data })
                }
                
            }).catch((e) => {
                console.log("inside catch for exercise get");
            })              
     };
    };  

    export const addexercise = (obj,firstTime,userId,date) => {
        return (dispatch) => { 
            if(firstTime){

                console.log("obj is :",obj, "userId ");

                axios({
                    method: "post", 
                    url: "http://joshkoshy.com:5000/exerlog",
                    headers : {'Content-type': 'application/json'}, 
                    data : {
                        'userId': userId,
                        'date': date,
                        'exercise': obj
                       } 
                           
                
                }).then(function(response) {
                    if (response.data.code === 400) {
                        console.log("Server responded with code 400 for exercise post");
    
                    } else {
                        Actions.exerciselog();
                    }
                    
                }).catch((e) => {
                    console.log("inside catch post of addexercise",e);
                }) 

            } else{
                console.log("inside put");
                console.log("obj is :",obj);
                axios({
                    method: "put", 
                    url: "http://joshkoshy.com:5000/exerlog",
                    headers : {'Content-type': 'application/json'}, 
                    data : {
                        'userId': userId,
                        'date': date,
                        'exercise': obj
                       } 
    
                
                }).then(function(response) {
                    
                    if (response.data.code === 400) {
                        console.log("Server responded with code 400 for exercise put");
    
                    } else {
                        Actions.exerciselog();
                    }
                    
                }).catch((e) => {
                    console.log("inside catch put of addexercise");
                })  
            }
        
    }
}
    
    
export const removeexercise = (obj,userId,date) => {
    return (dispatch) => {    
    axios({
        method: "delete", 
        url: "http://joshkoshy.com:5000/exerlog",
        headers : {'Content-type': 'application/json'},  
        params : {
            'userId': userId,
            'date': date, 
            'exid': obj.exid
           } 

    
    }).then(function(response) {
        
        if (response.data.code === 400) {
            console.log("Server responded with code 400 for exercise delete");
        } else {
            Actions.exerciselog();
        }
        
    }).catch((e) => {
        console.log("inside catch delete of addexercise",e);
    }) 
} 
 };


 export const searchExercise = (text) => {
    return (dispatch) => {  
        axios({
            method: "get", 
            url: "http://joshkoshy.com:5000/exercise",
            headers : {'Content-type': 'application/json'}, 
            params : {
                'exercise': text
               } 

        
        }).then(function(response) {
            
            if (response.data.code === 400) {
        
                console.log("Server responds with code 400 for exercise search");
            } else {

                dispatch({ type: EXERCISE_SEARCH_RESULT, payload: response.data.data.exercises })
            }
            
        }).catch((e) => {
            console.log("inside catch for exercise search");
        })              
 };
}; 

 
