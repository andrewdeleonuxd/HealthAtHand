import React,{Component} from 'react'
import {View, TextInput, FlatList, ToastAndroid, TouchableHighlight ,ScrollView, Text, StyleSheet} from 'react-native'
import { Header, Icon , SearchBar, Button } from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import { Constants, Calendar, Permissions } from 'expo';

//import RNCalendarEvents from 'react-native-calendar-events';

//import Communications from 'react-native-communications';


class Notification extends Component {
    state = {
        subject:"",
        body:"",
        cal_auth: "",
        results:[]
    }

    myCalendar = () =>{
        let details = {
          title: 'myCalendar',
          color: 'blue',
          entityType: Calendar.EntityTypes.REMINDER,
          sourceId: 'my_calendar_1'
        };

        
        
        Calendar.createCalendarAsync(details)
          .then( event => {
            this.setState({ results: event });
          })
          .catch( error => {
            this.setState({ results: error });
          });
      }

    componentWillMount = () => {
        Permissions.askAsync('calendar')
        // iOS
        /*
        RNCalendarEvents.authorizationStatus()
        .then(status => {
          // if the status was previous accepted, set the authorized status to state
          this.setState({ cal_auth: status })
          if(status === 'undetermined') {
            // if we made it this far, we need to ask the user for access 
            RNCalendarEvents.authorizeEventStore()
            .then((out) => {
              if(out == 'authorized') {
                // set the new status to the auth state
                this.setState({ cal_auth: out })
              }
            })
           }
         })
       .catch(error => console.warn('Auth Error 1: ', error));
     
       // Android
       RNCalendarEvents.authorizeEventStore()
       .then((out) => {
         if(out == 'authorized') {
           // set the new status to the auth state
           this.setState({ cal_auth: out })
         } else {
            this.setState({ cal_auth: out })
         }
       })
       .catch(error => console.warn('Auth Error 2: ', out));
       */
     }
   

    goBack = () => {
        Actions.home();
    }

    done = () => {
     //   ToastAndroid.show('done',3000,"TOP")
   //  Communications.email(['abcd@gmail.com'],null,null,this.state.subject,this.state.body);
   //RNCalendarEvents.findCalendars()
   
   /*
   RNCalendarEvents.saveEvent('Title of event', {
    startDate: '2016-08-19T19:26:00.000Z',
    endDate: '2017-08-19T19:26:00.000Z'
  }).then(id => {
    // we can get the event ID here if we need it
    console.log("I am here");
  }).catch(error => console.log('Save Event Error: ', error));
  */

   //  Actions.home();

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
            <View style={{flex:1}}>
                <Header
                    outerContainerStyles={{height:60,backgroundColor:"#0F084B"}}
                    leftComponent={backButton}
                    centerComponent={{ text: 'Notification', style: { color: '#fff',fontSize:17 }}}
                    rightComponent={check}
                />

                      <View style={styles.container}>
        <Button
          title="Make a Calendar"
          onPress={() => this.myCalendar()}
    
        />
        
        <Text style={{ marginTop: 20 }}>{this.state.results.toString()}</Text>
        
      </View>
                   
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
    },
    
  });


export default Notification;
