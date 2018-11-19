import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import _ from 'lodash';

import {
    GET_EXERCISE_NOTES,
    SET_EXERCISE_NOTES 
       
       } from './types';


export const initializeexerciseNotes = (userId,date) => {
    return (dispatch) => {  

        axios({
            method: "get",
            url: "http://150.212.216.250:5000/exercisenotes",
            headers : {'Content-type': 'application/json'}, 
            params : {
                'userId':userId,
                'date':date
            }
        
        }).then(function(response) {
            
            if (response.data.code === 400) {

            } else {        
                dispatch({ type: GET_EXERCISE_NOTES, payload: response.data.data })
            }
            
        }).catch((e) => {
            console.log("inside catch",e);
        })
};
};  

export const submitexerciseNotes = (userId,date,text) => {
    return (dispatch) => {  

        axios({
            method: "post",
            url: "http://150.212.216.250:5000/exercisenotes",
            headers : {'Content-type': 'application/json'}, 
            data : {
                'userId':userId,
                'date':date,
                'note': text
            }
        
        }).then(function(response) {
            
            if (response.data.code === 400) {

            } else {        
                dispatch({ type: SET_EXERCISE_NOTES, payload:text })
                Actions.home();
            }
            
        }).catch((e) => {
            console.log("inside catch",e);
        })
};
}; 


