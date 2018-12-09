import React from 'react';
import { Scene, Router , Actions, ActionConst} from 'react-native-router-flux';
import LoginForm from './pages/LoginForm';

import MealLog from './pages/MealLog';
import ExerciseLog from './pages/ExerciseLog';

import MealCard from './pages/MealCard';

import FoodSearch from './pages/FoodSearch';
import ExerciseSearch from './pages/ExerciseSearch';
  
import FoodCard from './pages/FoodCard';
import ExerciseCard from './pages/ExerciseCard'; 

import Home from './pages/Home';
import Email from './pages/Email';
import Messenger from './pages/Messenger';
import FoodNotes from './pages/FoodNotes';
import ExerciseNotes from './pages/ExerciseNotes';
import Report from './pages/Report';
 

const RouterComponent = () => { 
    return(
        <Router >
            <Scene key="root" >
                <Scene key="login" component={LoginForm}  hideNavBar={true} initial />  
                <Scene key="home" component={Home} hideNavBar={true}  />
                <Scene key="meallog" component = {MealLog} hideNavBar={true} />
                <Scene key="exerciselog" component = {ExerciseLog} hideNavBar={true} />
                <Scene key="addfood" component = {MealCard} hideNavBar={true} />
                <Scene key="searchfood" component = {FoodSearch} hideNavBar={true} />
                <Scene key="searchexercise" component = {ExerciseSearch} hideNavBar={true} />
                <Scene key="foodcard" component = {FoodCard} hideNavBar={true} />
                <Scene key="exercisecard" component = {ExerciseCard} hideNavBar={true} />
                <Scene key="messenger" component = {Messenger} hideNavBar={true} />
                <Scene key="email" component = {Email} hideNavBar={true} />
                <Scene key="foodnotes" component = {FoodNotes} hideNavBar={true} />
                <Scene key="exercisenotes" component = {ExerciseNotes} hideNavBar={true} />
                <Scene key="report" component = {Report} hideNavBar={true} />
            </Scene>
 
        </Router>    
    );
};

export default RouterComponent;
