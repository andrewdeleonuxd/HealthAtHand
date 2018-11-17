import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import _ from 'lodash';


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

/*
export const loginUser = ({email, password}) => {
   return (dispatch) => {  
    let success =false;
   dispatch({ type: LOGIN_USER });
    
        let array = require('../../util/users.json');
        for(var i=0; i<array.length ;i++){           
            if(array[i].username == email && array[i].password == password){
                
                success =true;
            } 
        }
    
    
        if(success==true){
        loginUserSuccess(dispatch,{"email":email,"password":password})
        } else{
        loginUserFail(dispatch)  
        }
 };
};



const loginUserFail = (dispatch) => {
    dispatch({
        type: LOGIN_USER_FAIL
    });
};

const loginUserSuccess = (dispatch,user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS, 
        payload:user
    });
    Actions.home();
};

*/


export const loginUser = ({email, password}) => {
    return (dispatch) => {  
        axios({
            method: "get",
            url: "",
            headers: {},
            data:{
                userId: email,
                password: password
               } 
        
        }).then(function(response) {
            if (response.data.code === 400) {
        
                dispatch({ type: LOGIN_USER_FAIL})
        
            } else {
        
                dispatch({ type: LOGIN_USER_SUCCESS, payload: email })
                Actions.home();
            }
        }).catch((e) => {
            console.log("inside catch");
        })
};
};    

