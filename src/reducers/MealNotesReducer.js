import {GET_MEAL_NOTES,SET_MEAL_NOTES} from '../actions/types';

const INITIAL_STATE = { notes:''};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
         
        case GET_MEAL_NOTES:
          return { ...state, notes:action.payload};  

        case SET_MEAL_NOTES:
          return { ...state, notes:action.payload};  

        default:
            return state;
    } 
}; 