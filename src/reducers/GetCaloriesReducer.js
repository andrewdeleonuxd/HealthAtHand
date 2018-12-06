import {GET_CALORIES} from '../actions/types';

const INITIAL_STATE = { totalCal:null, remainingCal:null, totalDuration: null, remainingDuration: null};

export default (state = INITIAL_STATE, action) => { 
    switch(action.type) {
        case GET_CALORIES:
          return { ...state, totalCal:action.totalCal, remainingCal:action.remainingCal, totalDuration: action.totalDuration, remainingDuration: action.remainingDuration};  
         
        default:
            return state;
    }
};
