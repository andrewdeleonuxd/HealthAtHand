import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import FoodReducer from './FoodReducer';
import ExerciseReducer from './ExerciseReducer';



export default combineReducers({
 exercise: ExerciseReducer,   
 food: FoodReducer,   
 auth: AuthReducer
});
