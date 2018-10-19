import React from 'react';
import { Scene, Router , Actions} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';

import ArticleInfo from './pages/ArticleInfo';
import AddFood from './pages/AddFood';
import AddExercise from './pages/AddExercise';

import SearchFood from './pages/SearchFood';
import FoodCard from './pages/FoodCard';
import ExerciseCard from './pages/ExerciseCard';

import Home from './pages/Home';
import FoodNotes from './pages/FoodNotes';
import ExerciseNotes from './pages/ExerciseNotes';


const RouterComponent = () => {
    return(
        <Router >
            <Scene key="root" >
                <Scene key="login" component={LoginForm} hideNavBar={true}  />
                <Scene key="home" component={Home} hideNavBar={true} initial />
                <Scene key="articleinfo" component = {ArticleInfo} hideNavBar={true} />
                <Scene key="addfood" component = {AddFood} hideNavBar={true} />
                <Scene key="addexercise" component = {AddExercise} hideNavBar={true} />
                <Scene key="searchfood" component = {SearchFood} hideNavBar={true} />
                <Scene key="foodcard" component = {FoodCard} hideNavBar={true} />
                <Scene key="exercisecard" component = {ExerciseCard} hideNavBar={true} />
                <Scene key="foodnotes" component = {FoodNotes} hideNavBar={true} />
                <Scene key="exercisenotes" component = {ExerciseNotes} hideNavBar={true} />

            </Scene>
 
        </Router>    
    );
};

export default RouterComponent;
