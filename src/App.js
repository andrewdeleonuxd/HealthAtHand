import Expo from 'expo';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import { createStore , applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';


class App extends Component {
    componentWillMount(){

        const config = {
            apiKey: 'AIzaSyDaYMK4m66Mls5oJyY2nr2Q-T05QeQ4Pd8',
            authDomain: 'manager-6d662.firebaseapp.com',
            databaseURL: 'https://manager-6d662.firebaseio.com',
            projectId: 'manager-6d662',
            storageBucket: '',
            messagingSenderId: '383519440321'
          };
          firebase.initializeApp(config);
    }
    render(){
        const store = createStore(reducers, {} , applyMiddleware(ReduxThunk));
    return(
        <Provider  store={store}>
           <Router />
        </Provider>
    );
} 
};

Expo.registerRootComponent(App);
export default App;
