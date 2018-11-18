import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import _ from 'lodash';

import {
        REPORT_RESPONSE 
       
       } from './types';

//url: "http://150.212.216.250:5000/report"       

export const report = (userId) => {
    return (dispatch) => {  
        //console.log("userId is :",userId);
        let data = {'userId': userId}
      //  let headers = {'Content-type': 'application/json'};
     //    headers = JSON.parse(headers)
        axios({
            method: "get",
            url: "http://150.212.216.250:5000/report",
            headers : {'Content-type': 'application/json'}, 
            params : data  
        
        }).then(function(response) {
            /*
            if (response.data.code === 400) {
        
                dispatch({ type: LOGIN_USER_FAIL})
        
            } else {
        
                dispatch({ type: LOGIN_USER_SUCCESS, payload: email })
                Actions.home();
            }
            */
           console.log("response from report api :",response);
        }).catch((e) => {
            console.log("inside catch",e);
        })
};
};    

