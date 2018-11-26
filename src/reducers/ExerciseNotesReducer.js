import {GET_EXERCISE_NOTES,SET_EXERCISE_NOTES, UPDATE_EXERCISE_NOTES} from '../actions/types';

const INITIAL_STATE = { notes:''};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
         
        case GET_EXERCISE_NOTES:
          return { ...state, notes:action.payload};  

        case SET_EXERCISE_NOTES:
          return { ...state, notes:action.payload};  

        case UPDATE_EXERCISE_NOTES:
          return { ...state, notes:action.payload}; 

        default:
            return state;
    } 
}; 