import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import EmployeeFormReducer from './EmployeeFormReducer';
import EmployeeReducer from './EmployeeReducer';
import FoodReducer from './FoodReducer';


export default combineReducers({
 food: FoodReducer,   
 auth: AuthReducer,
 employeeForm: EmployeeFormReducer,
 employees: EmployeeReducer
});