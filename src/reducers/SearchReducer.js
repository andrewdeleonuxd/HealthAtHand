import {SEARCH_RESULT} from '../actions/types';

const INITIAL_STATE = { searchArray:[]};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
         
        case SEARCH_RESULT:
          return { ...state, searchArray:action.payload};  

        default:
            return state;
    } 
};