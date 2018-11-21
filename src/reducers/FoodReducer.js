import {FOOD_ADDED,FOOD_INITIALIZE} from '../actions/types';

const INITIAL_STATE = { foodArray:[],mealObj:{}};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FOOD_INITIALIZE:
          return { ...state, foodArray:action.payload};  
          
        case FOOD_ADDED:
          return { ...state, mealObj:action.mealObj};  

        default:
            return state;
    }
};

