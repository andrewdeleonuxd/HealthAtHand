import React,{Component} from 'react'
import {View, TextInput, FlatList, ToastAndroid, TouchableHighlight ,ScrollView, Text, StyleSheet} from 'react-native'
import { Header, Icon , SearchBar, Button } from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import { Constants, Calendar, Permissions } from 'expo';




class Notification extends Component {
    state = {
        subject:"",
        body:"",
        cal_auth: "",
        results:""
    }

    myCalendar = () =>{
     
      

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
        
        <Text style={{ marginTop: 20 }}>{this.state.results}</Text>
        
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
