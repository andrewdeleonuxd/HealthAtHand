import React,{Component} from 'react'
import {View, TextInput, FlatList, ToastAndroid, TouchableHighlight ,ScrollView, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { Header, Icon , SearchBar, Button } from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import { Constants, Calendar, Permissions } from 'expo';
import { HaH_Header, HaH_NavBar } from '../components/common';

const emails = [
    {
        body: "Hey Amanda, let's set up a date for to discuss your new dietary plans. How does the 20th sound?",
        date_sent: '2018-11-13',
        calendar_event: false
    },
    {
        body: "Thanks for setting up that date for to discuss your new dietary plans. I'll see you on the 20th.",
        date_sent: '2018-11-14',
        calendar_event: true
    }
]

class Notification extends Component {
    state = {
        subject:"",
        body:"",
        cal_auth: "",
        results:""
    }

    myCalendar = () => {
          var SaveEvent= Expo.Calendar.createEventAsync(Expo.Calendar.DEFAULT,{
            startDate: new Date('2018-11-13'),
            endDate: new Date('2018-11-14'),
            title: "hah event",
            timeZone: "GMT-7"
          })
          .then( event => {
            this.setState({
                results: "Event added"
            })
            console.log('success',event);
              })
        .catch( error => {
            this.setState({
                results: "cannot add event"
            })
            console.log('failure',error);
            }); 
   
      }

    componentWillMount = () => {
        Permissions.askAsync('calendar')
     }

    goBack = () => {
        Actions.home();
    }

    done = () => {
        console.log("*********************");
    }

    render = () => {
        let check = (
            <Icon
                name='check'
                underlayColor={"transparent"}
                color="white"
                marginTop={50}
                onPress = {this.done}
            />
        )

        let backButton = (
            <Icon
                name='ios-arrow-back'
                type='ionicon'
                color={"white"}
                onPress = {this.goBack}
                underlayColor={"transparent"}
            />
        )

        return (
            <View style={{flex:1, marginTop: Expo.Constants.statusBarHeight}}>
                <HaH_Header
                    text = "Messenger"
                    left = {backButton}
                />
                <View style={styles.container}>
                    <TouchableOpacity
                        style = {styles.email}
                        onPress={() => this.myCalendar()}>
                        <View>
                            <Text>
                                Make a Calendar
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <HaH_NavBar
                    selected = {1}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    email: {
        flex: 1, 
        height: 75,
    }
  });


export default Notification;
