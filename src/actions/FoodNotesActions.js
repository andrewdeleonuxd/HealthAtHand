import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import _ from 'lodash';

import {
    GET_MEAL_NOTES,
    SET_MEAL_NOTES,
    UPDATE_MEAL_NOTES
       
       } from './types';


export const initializefoodNotes = (userId,date) => {
    return (dispatch) => {  

        axios({
            method: "get",
            url: "http://150.212.217.144:5000/mealnotes",
            headers : {'Content-type': 'application/json'}, 
            params : {
                'userId':userId,
                'date':date
            }
        
        }).then(function(response) {
            
            if (response.data.code === 400) {
                console.log("Server responds with code 400 for mealNotes get");

            } else {
                console.log(response.data)
                dispatch({ type: GET_MEAL_NOTES, mealNotes: response.data.data })
            }
            
        }).catch((e) => {
            console.log("inside catch for mealNotes get");
        })
    };
};  

export const submitfoodNotes = (userId,date,text) => {
    return (dispatch) => {  
        console.log(userId + " " + date + " " + text)
        axios({
            method: "post",
            url: "http://150.212.217.144:5000/mealnotes",
            headers : {'Content-type': 'application/json'}, 
            data : {
                'userId':userId,
                'date':date,
                'note': text
            }
        
        }).then(function(response) {
            
            if (response.data.code === 400) {
                console.log("Server responds with code 400 for mealNotes post");
            } else {        
                dispatch({ type: SET_MEAL_NOTES, mealNotes:text })
                Actions.meallog();
            }
            
        }).catch((e) => {
            console.log("inside catch for mealNotes post");
        })
    };
}; 

export const updatefoodNotes = (userId,date,text) => {
    return (dispatch) => {  
        console.log(userId + " " + date + " " + text)
        axios({
            method: "put",
            url: "http://150.212.217.144:5000/mealnotes",
            headers : {'Content-type': 'application/json'}, 
            data : {
                'userId':userId,
                'date':date,
                'note': text
            }
        
        }).then(function(response) {
            
            if (response.data.code === 400) {
                console.log("Server responds with code 400 for mealNotes put");
            } else {        
                dispatch({ type: UPDATE_MEAL_NOTES, mealNotes:text })
                Actions.meallog();
            }
            
        }).catch((e) => {
            console.log("inside catch for mealNotes put");
        })
    };
}; 

