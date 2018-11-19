import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import _ from 'lodash';

import {
        REPORT_RESPONSE 
       
       } from './types';

//url: "http://150.212.216.250:5000/report"        

export const searchResult = (food) => {
    return (dispatch) => {  
        //console.log("userId is :",userId);
        let data = {'food': food}
      //  let headers = {'Content-type': 'application/json'};
     //    headers = JSON.parse(headers)
        axios({
            method: "get",
            url: "http://150.212.219.117:5000/search",
            headers : {'Content-type': 'application/json'},  
            params : data  
        
        }).then(function(response) {
            
            if (response.data.code === 400) {
        
              //  dispatch({ type: LOGIN_USER_FAIL})
        
            } else {
        
                dispatch({ type: SEARCH_RESULT, payload: response.data.data })
               // Actions.home();
            }
            
           
        }).catch((e) => {
            console.log("inside catch of searchAction",e);
        })
};
};    

