import React from 'react';
import { Scene, Router , Actions} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';
import ArticleInfo from './pages/ArticleInfo';
import AddFood from './pages/AddFood';
import SearchFood from './pages/SearchFood';
import FoodCard from './pages/FoodCard';
import Home from './pages/Home';
import FoodNotes from './pages/FoodNotes';
import ExerciseNotes from './pages/ExerciseNotes';


const RouterComponent = () => {
    return(
        <Router >
            <Scene key="root" >
                <Scene key="login" component={LoginForm} hideNavBar={true} initial />
                <Scene key="home" component={Home} hideNavBar={true} />
                <Scene key="articleinfo" component = {ArticleInfo} hideNavBar={true} />
                <Scene key="addfood" component = {AddFood} hideNavBar={true} />
                <Scene key="searchfood" component = {SearchFood} hideNavBar={true} />
                <Scene key="foodcard" component = {FoodCard} hideNavBar={true} />
                <Scene key="foodnotes" component = {FoodNotes} hideNavBar={true} />
                <Scene key="exercisenotes" component = {ExerciseNotes} hideNavBar={true} />



                <Scene 
                    key="employeeList" 
                    component={EmployeeList} 
                    title="Employees"
                    rightTitle="Add"
                    onRight={() => Actions.employeeCreate()}
                     
                /> 
                 <Scene 
                    key="employeeCreate" 
                    component={EmployeeCreate} 
                    title="CreateEmployees"
                />    
                 <Scene 
                    key="employeeEdit" 
                    component={EmployeeEdit} 
                    title="EditEmployee"
                /> 
            </Scene>
 
        </Router>    
    );
};

export default RouterComponent;