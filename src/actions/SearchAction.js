import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import _ from 'lodash';

import {
        REPORT_RESPONSE 
       
       } from './types';


export const searchResult = (food) => {
    return (dispatch) => {  
        let data = {'food': food}
        axios({
            method: "get",
            url: "http://10.0.0.241:5000/search",
            headers : {'Content-type': 'application/json'},    
            params : data  
        
        }).then(function(response) {
            
            if (response.data.code === 400) {
        
                console.log("Server responded 400 for search api");        
            } else {
        
                dispatch({ type: SEARCH_RESULT, payload: response.data.data })
            }
            
           
        }).catch((e) => {
            console.log("inside catch of searchAction");
        })
};
};  

export const SearchNut = (food) => {
      
        let data = {'food': food}

        axios({
            method: "get",
            url: "http://10.0.0.241:5000/nut",
            headers : {'Content-type': 'application/json'},   
            params : data  
        
        }).then(function(response) {
            
            if (response.data.code === 400) {
        
                console.log("Server responded 400 for search api nutrition end point");        
            } else {
                let item=response.data.data.foods[0];
                let obj={
                    'id':item.ndb_no,
                    'foodname':item.food_name,
                    'numCal':item.nf_calories,
                    'servingSize':item.serving_qty,
                    'servingSizeUnit':item.serving_unit
                }
                Actions.push("foodcard", {item:obj,firstTime:true});
            }
            
           
        }).catch((e) => {
            console.log("inside catch of searchAction nutrition end point");
        })

}; 

