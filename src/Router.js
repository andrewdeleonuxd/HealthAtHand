import React from 'react';
import { Scene, Router , Actions} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';
import Home from './components/Home';


const RouterComponent = () => {
    return(
        <Router sceneStyle={{ paddingTop:65}}>
            <Scene>
                <Scene key="auth">
                    <Scene key="login" component={LoginForm} />
                </Scene>

                <Scene key="main">
                    <Scene 
                        key="Home" 
                        component={Home} 
                        title="Home"
                    
                        initial 
                    />

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
            </Scene> 
        </Router>    
    );
};

export default RouterComponent;