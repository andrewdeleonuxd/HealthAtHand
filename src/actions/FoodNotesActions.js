import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import _ from 'lodash';

import {
    GET_MEAL_NOTES,
    SET_MEAL_NOTES 
       
       } from './types';


export const initializefoodNotes = (userId,date) => {
    return (dispatch) => {  

        axios({
            method: "get",
            url: "http://150.212.216.250:5000/mealnotes",
            headers : {'Content-type': 'application/json'}, 
            params : {
                'userId':userId,
                'date':date
            }
        
        }).then(function(response) {
            
            if (response.data.code === 400) {

            } else {        
                dispatch({ type: GET_MEAL_NOTES, payload: response.data.data })
            }
            
        }).catch((e) => {
            console.log("inside catch",e);
        })
};
};  

export const submitfoodNotes = (userId,date,text) => {
    return (dispatch) => {  

        axios({
            method: "post",
            url: "http://150.212.216.250:5000/mealnotes",
            headers : {'Content-type': 'application/json'}, 
            data : {
                'userId':userId,
                'date':date,
                'note': text
            }
        
        }).then(function(response) {
            
            if (response.data.code === 400) {

            } else {        
                dispatch({ type: SET_MEAL_NOTES, payload:text })
                Actions.home();
            }
            
        }).catch((e) => {
            console.log("inside catch",e);
        })
};
}; 


