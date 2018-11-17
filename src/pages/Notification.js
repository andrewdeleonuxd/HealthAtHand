import React,{Component} from 'react'
import {View, TextInput, FlatList, ToastAndroid, TouchableHighlight ,ScrollView, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { Header, Icon , SearchBar, Button } from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import { Constants, Calendar, Permissions } from 'expo';
import { HaH_Header, HaH_NavBar } from '../components/common';

import {colors, margin, padding} from '../styles/base.js'

const emails = [
    {
        body: "Hey Amanda, let's set up a date for to discuss your new dietary plans. How does the 20th sound?",
        date_sent: '2018-11-13',
        calendar_event: false
    },
    {
        body: "Thanks for setting up that date for to discuss your new dietary plans. I'll see you on the 20th.",
        date_sent: '2018-11-14',
        calendar_event: {
            start_date: '2018-11-13',
            end_date: '2018-11-14',
            title: "Appointment with Health Coach"
        }
    }
]

class Notification extends Component {
    state = {
        emailList: emails
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

    filter(body) {
        String.prototype.trunc = String.prototype.trunc ||
        function(n){
            return (this.length > n) ? this.substr(0, n-1) + '&hellip;' : this;
        };
    }

    truncate(n, useWordBoundary ){
        if (this.length <= n) { return this; }
        var subString = this.substr(0, n-1);
        return (useWordBoundary 
           ? subString.substr(0, subString.lastIndexOf(' ')) 
           : subString) + "...";
    };

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
                    <FlatList
                        data={this.state.emailList}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                style = {styles.email}
                                onPress={() => this.myCalendar()}>
                                <View style = {{padding: 10}}>
                                    <Text style = {styles.body}>
                                        {this.truncate.apply(item.body, [35, true])}
                                    </Text>
                                    <Text>
                                        {item.date_sent}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.body}
                    />
                </View>
                <HaH_NavBar
                    selected = {1}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed', 
        color: colors.primary
    },
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    email: {
        flex: 1, 
        height: 75,
        borderBottomWidth: 2,
        borderBottomColor: colors.brandgrey
    }
  });


export default Notification;
