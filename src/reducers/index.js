import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import FoodReducer from './FoodReducer';
import ExerciseReducer from './ExerciseReducer';
import ReportReducer from './ReportReducer';



export default combineReducers({
 exercise: ExerciseReducer,   
 food: FoodReducer,   
 auth: AuthReducer,
 report: ReportReducer
});
