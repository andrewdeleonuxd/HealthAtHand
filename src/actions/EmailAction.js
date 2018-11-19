import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import _ from 'lodash';

export const submitMessage = (userId,date,subject,messagebody) => {
    return (dispatch) => {  

        axios({
            method: "post",
            url: "http://10.0.0.241:5000/email",
            headers : {'Content-type': 'application/json'}, 
            data : {
                'userId':userId,
                'date':date,
                'subject': subject,
                'messagebody':messagebody
            }
        
        }).then(function(response) {
            
            if (response.data.code === 400) {

            } else {        
                Actions.home();
            }
            
        }).catch((e) => {
            console.log("inside catch",e);
        })
};
}; 


