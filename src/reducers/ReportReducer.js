import {REPORT_RESPONSE} from '../actions/types';

const INITIAL_STATE = { reportArray:[]};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
         
        case REPORT_RESPONSE:
          return { ...state, reportArray:action.payload};  

        default:
            return state;
    }
};