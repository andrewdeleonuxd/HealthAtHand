import {GET_MEAL_NOTES,SET_MEAL_NOTES, UPDATE_MEAL_NOTES} from '../actions/types';

const INITIAL_STATE = { notes:''};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
         
        case GET_MEAL_NOTES:
          return { ...state, notes:action.mealNotes};  

        case SET_MEAL_NOTES:
          return { ...state, notes:action.mealNotes};  

        case UPDATE_MEAL_NOTES:
          return { ...state, notes:action.mealNotes}; 

        default:
            return state;
    } 
}; 