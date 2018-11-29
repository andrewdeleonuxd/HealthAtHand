import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';


import {
        EMAIL_CHANGED, 
        PASSWORD_CHANGED,
        LOGIN_USER_SUCCESS,
        LOGIN_USER_FAIL,
        LOGIN_USER
       } from './types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED, 
        payload:text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload:text
    }; 
};

export const loginUser = ({email, password}) => { 
    return (dispatch) => {  
        axios({
            method: "get", 
            url: "http://10.0.0.4:5000/login",
            headers: {},
            params:{
                'emailId': email,
                'password': password
               } 
        
        }).then(function(response) {
            if (response.data.code === 400) {
        
                dispatch({ type: LOGIN_USER_FAIL})
        
            } else {
                let date = moment().format('YYYY-MM-DD');
                dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data.data.userId , date:date, healthCoach:response.data.data.healthCoach})
            }
        }).catch((e) => {
            console.log("inside catch");
        })
};
};    

