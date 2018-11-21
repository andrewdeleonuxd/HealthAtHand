import {SEARCH_RESULT} from '../actions/types';

const INITIAL_STATE = { searchRes:{}};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
         
        case SEARCH_RESULT:
          return { ...state, searchRes:action.payload};  

        default:
            return state;
    } 
};