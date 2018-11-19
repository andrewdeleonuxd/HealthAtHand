import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import FoodReducer from './FoodReducer';
import ExerciseReducer from './ExerciseReducer';
import ReportReducer from './ReportReducer';
import GetCaloriesReducer from './GetCaloriesReducer';
import SearchReducer from './SearchReducer';


export default combineReducers({
 exercise: ExerciseReducer,   
 food: FoodReducer,   
 auth: AuthReducer,
 report: ReportReducer,
 getCalories: GetCaloriesReducer,
 search: SearchReducer
});
