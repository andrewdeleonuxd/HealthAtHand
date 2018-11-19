import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import _ from 'lodash';

import {
        REPORT_RESPONSE 
       
       } from './types';


export const report = (userId,date) => {
    return (dispatch) => {  

        axios({
            method: "get",
            url: "http://10.0.0.241:5000/report",
            headers : {'Content-type': 'application/json'}, 
            params : {
                'userId':userId,
                'date':date
            }
        
        }).then(function(response) {
            if (response.data.code === 400) {
        
            } else {
                console.log(response.data.report)
                dispatch({ type: REPORT_RESPONSE, reportData: response.data.report })
            }
           console.log("response from report api :", response);
        }).catch((e) => {
            console.log("inside catch",e);
        })
};
};    

