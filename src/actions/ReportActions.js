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
            url: "http://150.212.218.194:5000/report",
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

