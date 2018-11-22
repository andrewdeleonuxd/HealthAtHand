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
                url: "http://10.0.0.241:5000/exerlog",
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
            if(firstTime){
                axios({
                    method: "put", 
                    url: "http://10.0.0.241:5000/exerlog",
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

            } else{
                axios({
                    method: "post", 
                    url: "http://10.0.0.241:5000/exerlog",
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
                    console.log("inside catch post of addexercise");
                })  
            }
        
    }
    
    
export const removeexercise = (obj,userId,date) => {
        
    axios({
        method: "delete", 
        url: "http://10.0.0.241:5000/exerlog",
        headers : {'Content-type': 'application/json'},  
        data : {
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
        console.log("inside catch delete of addexercise");
    }) 
     
 };

 export const searchExercise = (text) => {
    return (dispatch) => {  
        axios({
            method: "get", 
            url: "http://10.0.0.241:5000/exercise",
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

 
