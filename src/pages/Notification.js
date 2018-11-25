import React,{Component} from 'react'
import {View, TextInput, FlatList, ToastAndroid, TouchableHighlight ,ScrollView, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { Header, Icon , SearchBar, Button } from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import { Constants, Calendar, Permissions } from 'expo';
import { HaH_Header, HaH_NavBar } from '../components/common';
import Moment from 'moment';

import {colors, margin, padding, button} from '../styles/base.js'

const emails = [
    {
        read: 0,
        author: "Dr.J",
        subject: "Thanks!",
        body: "Thanks for setting up that date for to discuss your new dietary plans. I'll see you on the 20th.",
        date_sent: '2018-11-14',
        calendar_event: {
            start_date: '2018-11-13',
            end_date: '2018-11-14',
            title: "Appointment with Health Coach"
        }
    },
    {
        read: 1,
        author: "Dr.J",
        subject: "Setting up appointment",
        body: "Hey Amanda, let's set up a date for to discuss your new dietary plans. How does the 20th sound?",
        date_sent: '2018-11-13',
        calendar_event: {}
    },
]

class Notification extends Component {
    state = {
        emailList: emails
    }

    showEmail = (item) => {
        Actions.push("email", {email: item, writeable: 0})
    }

    showNewMessage = () => {
        Actions.push("email", {email: null, writeable: 1})
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
            <View style={{flex:1}}>
                <HaH_Header
                    text = "Messenger"
                />
                <View style={styles.container}>
                    <FlatList
                        data={this.state.emailList}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                style = {styles.email}
                                onPress={() => this.showEmail(item)}>
                                <View style = {{padding: 10}}>
                                {   
                                    item.read == 0 ?
                                    <Text style = {[styles.subject, {color: colors.brandgold}]}>
                                        {this.truncate.apply(item.subject, [35, true])}
                                    </Text>
                                    :
                                    <Text style = {[styles.subject, {color: colors.brandblue}]}>
                                        {this.truncate.apply(item.subject, [35, true])}
                                    </Text>
                                }
                                    <Text>
                                        {Moment(item.date_sent).format('Do MMM YY')}
                                    </Text>
                                    <Text>
                                        {item.author}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.body}
                    />
                </View>
                <View style={{paddingLeft: '4%', paddingRight: '4%', paddingTop: '2%', paddingBottom: '4%'}}>
                    <TouchableOpacity
                        style = {[button.touchable, {backgroundColor: colors.brandblue}]}
                        onPress={this.showNewMessage}>
                        <View style={button.view}>
                            <Text style = {button.text}>
                                Create New Message
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <HaH_NavBar
                    selected = {5}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    subject: {
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
        borderBottomWidth: 2,
        borderBottomColor: colors.brandgrey
    }
  });


export default Notification;
