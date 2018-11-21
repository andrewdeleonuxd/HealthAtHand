import React , {Component } from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

import {getCalories} from '../actions';
import { Header, SearchBar } from 'react-native-elements'; 
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import Drawer from 'react-native-drawer'; 
import Communications from 'react-native-communications';

import { Text, Image, View, FlatList, TouchableHighlight, ActivityIndicator, ToastAndroid, Picker, StatusBar, Platform, Dimensions, Linking, StyleSheet } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'

import {colors, margin, padding, fonts} from '../styles/base.js'
import {HaH_Header, HaH_NavBar} from '../components/common'

const drawerStyles = {
    drawer: { backgroundColor: colors.brandwhite}
}

const categories = {
        0:"home",
        1:"add food",
        2:"add exercise",
        3:"calender",
        4:"text message"
    }

class Home extends Component {

    state = {
        isMoving: false, 
        pointsDelta: 0, 
        dailyCal: 325,
        maxCal: 2000 
    }

    componentWillMount = () => {

        this.props.getCalories(this.props.userId,this.props.date);
     
    }

    componentWillReceiveProps = (nextProps) => {
        
        this.setState({maxCal:nextProps.totalCal,dailyCal:nextProps.remainingCal});

    }

    componentDidMount = () => {
        this.setState({maxCal:this.props.totalCal,dailyCal:this.props.remainingCal});
    }


    closeControlPanel = () => {
        this._drawer.close()
    };

    openControlPanel = () => { 
        this._drawer.open()
    };

    onPress = (item) => {
        Actions.push("articleinfo", {item:item});
    }

    showHome = () => {
        Actions.home();
    }

    showAddFood = () => {
        
        Actions.push("meallog",{type:"addfood"});
        
    }

    showAddExercise = () => {
        
        Actions.push("exerciselog",{type:"addexercise"});
        
    }

    showAddFoodNotes = () => {
        
        Actions.push("foodnotes");
        
    }

    showAddExerciseNotes = () => {
        
        Actions.push("exercisenotes");
        
    }

    logout = () => {
        Actions.push("login");
    }

    email = () => {
          Actions.push("email");
     }

    showChart = () => {
       
    }

    showNotification = () => {
        Actions.push("notification");
    }

    render(){
       
        let search = (
            <Icon
                name='notifications'
                type='MaterialIcons'
                underlayColor={"transparent"}
                color={colors.secondary}
                onPress = {this.showNotification}
            />
        )

        let hamburger = (
            <Icon
                name='settings'
                type='Feather'
                color={colors.brandwhite}
                size={30}
                underlayColor='transparent'
                onPress = {this.openControlPanel} 
            />
        )

        let envelope = (
            <Icon
                name='mail'
                type='Entypo'
                color={colors.brandwhite}
                onPress={this.email}
                size={30}
                underlayColor='transparent'> 
            </Icon>
        )

        let notification = (
            <Icon
                name='settings'
                type='Feather'
                color={colors.brandwhite}
                //onPress={this.showAddExercise}
                size={30}
                underlayColor='transparent'>
            </Icon>
        )

        let drawerMenu = (
            <View style={{padding:10, marginTop:20}}>
                <TouchableHighlight
                    onPress = {this.logout}
                    underlayColor = "transparent"
                >
                <View style={{"marginBottom":20}}>
                    <Card
                        containerStyle = {styles.cardContainer}
                        wrapperStyle = {styles.cardWrapper}>
                        <Text style = {styles.cardHeader}>
                            Log Out
                        </Text>
                    </Card>
                </View>
                </TouchableHighlight>
            </View>
        )
        return(
            <Drawer
                ref={(ref) => this._drawer = ref}
                content={drawerMenu}
                type="overlay"
                tapToClose={true}
                styles={drawerStyles}
                openDrawerOffset={0.5}>
                <StatusBar
                    backgroundColor={colors.primary}
                    barStyle="light-content"/>
                <View style={{flex:1}}>
                    <HaH_Header 
                        text = 'Dashboard'
                        right = { hamburger }
                    />
                    <View style={{flex:1, padding: padding.sm}}>
                        <Card
                            containerStyle = {styles.cardContainer}
                            wrapperStyle = {styles.cardWrapper}>
                            <Text
                                style = {styles.cardHeader}>
                                Today's Available Calories
                            </Text>
                        </Card>
                        <View style = {styles.progressView}>
                            <ProgressCircle
                                percent={this.state.dailyCal/this.state.maxCal * 100}
                                radius={125}
                                borderWidth={30}
                                color={colors.brandgold}
                                shadowColor={colors.brandgrey}
                                bgColor='#e9e9ef' >
                                <Text style={styles.points}>
                                    { this.state.dailyCal }
                                </Text>
                                <Text style = {styles.pointsLabel}>
                                    /{ this.state.maxCal } Calories
                                </Text>
                            </ProgressCircle>
                        </View>

                        <Card
                            containerStyle = {styles.cardContainer}
                            wrapperStyle = {styles.cardWrapper}>
                            <Text
                                style = {styles.cardHeader}>
                                Today's Report
                            </Text>
                        </Card>
                    </View>

                    <HaH_NavBar selected = {1}/>
                </View>
        </Drawer>
        );
    }
}

const styles = StyleSheet.create({
    cardHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        fontFamily: fonts.primary, 
        color: colors.primary
    },
    cardContainer: {
        elevation: 7,
        borderRadius: 10
    },
    cardWrapper: {
        alignItems: 'flex-start',
        marginLeft: 0
    },
    points:{
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: colors.primary,
        opacity: 0.8,
        fontSize: 70,
        fontWeight: "100",
        justifyContent: 'center',
        alignItems: 'center' 
    },
    pointsLabel:{
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: '#7591af',
        fontSize: 14,
        fontWeight: "100",
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressView :{
        alignItems: 'center',
        justifyContent: "center",
        padding: padding.md
    }
});


const mapStateToProps = (state) => {
    
    return {
        totalCal: state.getCalories.totalCal,
        remainingCal: state.getCalories.remainingCal,
        userId: state.auth.userId,
        date: state.auth.date
    };
};


export default connect(mapStateToProps, {getCalories}) (Home);

