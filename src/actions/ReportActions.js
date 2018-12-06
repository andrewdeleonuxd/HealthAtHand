import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import _ from 'lodash';

import {
        REPORT_RESPONSE 
       
       } from './types';


export const report = (userId) => {
    return (dispatch) => {  

        axios({
            method: "get",
            url: "http://10.0.0.4:5000/report",
            headers : {'Content-type': 'application/json'}, 
            params : {
                'userId':userId
            }
        
        }).then(function(response) {
            if (response.data.code === 400) {
                console.log("Server Responds with 400 for report get");
        
            } else {
                dispatch({ type: REPORT_RESPONSE, payload: response.data.data })
            }
        }).catch((e) => {
            console.log("inside catch for report get");
        })
};
};

export const reportPost = (userId,weight) => {
    weight = parseInt(weight);
    return (dispatch) => {  

        axios({
            method: "post",
            url: "http://10.0.0.4:5000/report",
            headers : {'Content-type': 'application/json'}, 
            data : {
                'userId':userId,
                'weight':weight
            }
        
        }).then(function(response) {
            if (response.data.code === 400) {
                console.log("Server Responds with 400 for report get");
        
            } else {
              //  Actions.home();
            }
        }).catch((e) => {
            console.log("inside catch for report get");
        })
};
};

export const reportPut = (userId,weight) => {
    weight = parseInt(weight);
    return (dispatch) => {  

        axios({
            method: "put",
            url: "http://10.0.0.4:5000/report",
            headers : {'Content-type': 'application/json'}, 
            data : {
                'userId':userId,
                'weight':weight
            }
        
        }).then(function(response) {
            if (response.data.code === 400) {
                console.log("Server Responds with 400 for report put");
        
            } else {
              //  Actions.home();
            }
        }).catch((e) => {
            console.log("inside catch for report put");
        })
};
};

