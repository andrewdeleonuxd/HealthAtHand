import {GET_CALORIES} from '../actions/types';

const INITIAL_STATE = { totalCal:null, remainingCal:null};

export default (state = INITIAL_STATE, action) => { 
    switch(action.type) {
        case GET_CALORIES:
          return { ...state, totalCal:action.totalCal, remainingCal:action.remainingCal};  
         
        default:
            return state;
    }
};
