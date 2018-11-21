import React from 'react';
import { Scene, Router , Actions} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';

import ArticleInfo from './pages/ArticleInfo';
import MealLog from './pages/MealLog';
import ExerciseLog from './pages/ExerciseLog';

import AddFood from './pages/AddFood';
import AddExercise from './pages/AddExercise'; 

import SearchFood from './pages/SearchFood';
import SearchExercise from './pages/SearchExercise';
  
import FoodCard from './pages/FoodCard';
import ExerciseCard from './pages/ExerciseCard'; 

import Home from './pages/Home';
import Email from './pages/Email';
import Notification from './pages/Notification';
import FoodNotes from './pages/FoodNotes';
import ExerciseNotes from './pages/ExerciseNotes';
import Report from './pages/Report';


const RouterComponent = () => { 
    return(
        <Router >
            <Scene key="root" >
                <Scene key="login" component={LoginForm} hideNavBar={true}  />  
                <Scene key="home" component={Home} hideNavBar={true} initial />
                <Scene key="articleinfo" component = {ArticleInfo} hideNavBar={true} />
                <Scene key="meallog" component = {MealLog} hideNavBar={true} />
                <Scene key="exerciselog" component = {ExerciseLog} hideNavBar={true} />
                <Scene key="addfood" component = {AddFood} hideNavBar={true} />
                <Scene key="addexercise" component = {AddExercise} hideNavBar={true} />
                <Scene key="searchfood" component = {SearchFood} hideNavBar={true} />
                <Scene key="searchexercise" component = {SearchExercise} hideNavBar={true} />
                <Scene key="foodcard" component = {FoodCard} hideNavBar={true} />
                <Scene key="exercisecard" component = {ExerciseCard} hideNavBar={true} />
                <Scene key="notification" component = {Notification} hideNavBar={true} />
                <Scene key="email" component = {Email} hideNavBar={true} />
                <Scene key="foodnotes" component = {FoodNotes} hideNavBar={true} />
                <Scene key="exercisenotes" component = {ExerciseNotes} hideNavBar={true} />
                <Scene key="report" component = {Report} hideNavBar={true} />
            </Scene>
 
        </Router>    
    );
};

export default RouterComponent;
