import {REPORT_RESPONSE} from '../actions/types';

const INITIAL_STATE = { reportData:[]};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
         
        case REPORT_RESPONSE:
          return { ...state, reportData:action.payload};  

        default:
            return state;
    } 
}; 