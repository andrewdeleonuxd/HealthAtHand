import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import EmployeeFormReducer from './EmployeeFormReducer';
import EmployeeReducer from './EmployeeReducer';
import FoodReducer from './FoodReducer';
import ExerciseReducer from './ExerciseReducer';



export default combineReducers({
 exercise: ExerciseReducer,   
 food: FoodReducer,   
 auth: AuthReducer,
 employeeForm: EmployeeFormReducer,
 employees: EmployeeReducer
});