import {EXERCISE_ADDED,EXERCISE_INITIALIZE} from '../actions/types';

const INITIAL_STATE = { exerciseArray:[]};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case EXERCISE_INITIALIZE:
          return { ...state, exerciseArray:action.payload};  
         
        case EXERCISE_ADDED:
          return { ...state, exerciseArray:action.payload};  

        default:
            return state;
    }
};
