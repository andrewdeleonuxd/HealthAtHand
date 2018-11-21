import React,{Component} from 'react'
import {connect} from 'react-redux';
import {View, TextInput, FlatList, ToastAndroid, TouchableHighlight ,ScrollView, StyleSheet, TouchableOpacity, Text} from 'react-native'
import { Header, Icon , SearchBar, Card, Button} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import {submitMessage } from '../actions';

import Communications from 'react-native-communications';

import { HaH_Header, HaH_NavBar } from '../components/common';
import {colors, margin, padding, fonts, button} from '../styles/base.js'


class Email extends Component {
    state = {
        subject:"",
        body:""
    }

    goBack = () => {
        Actions.push("notificationz")
    }

    done = () => {
     Communications.email([this.props.healthCoachId],null,null,this.state.subject,this.state.body);
     this.props.submitMessage(this.props.userId,this.props.date,this.state.subject,this.state.body);
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
                <HaH_Header
                    left = {backButton}
                    text = {'New Message'}
                />
             
                <View style = {{flex: 1, padding: 10}}>
                    <Card
                        containerStyle = {styles.cardContainer1}
                        wrapperStyle = {styles.cardWrapper}>
                        <TextInput
                            style={styles.noteText}
                            placeholder="Enter the subject!"
                            onChangeText={(text) => this.setState({text})}
                            multiline = {true}
                            textAlignVertical= 'top'
                            maxLength = {400}
                        />
                    </Card>
                    <Card
                        containerStyle = {styles.cardContainer2}
                        wrapperStyle = {styles.cardWrapper}>
                        <TextInput
                            style={styles.noteText}
                            placeholder="Enter your message!"
                            onChangeText={(text) => this.setState({text})}
                            multiline = {true}
                            textAlignVertical= 'top'
                            maxLength = {400}
                        />
                    </Card>
                </View>
                <View style={{paddingLeft: '4%', paddingRight: '4%', paddingTop: '2%', paddingBottom: '4%'}}>
                    <TouchableOpacity
                        style = {[button.touchable, {backgroundColor: colors.brandgold}]}
                        onPress={this.showAddFoodNotes}>
                        <View style={button.view}>
                            <Text style = {button.text}>
                                Send Message
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <HaH_NavBar
                    selected = {2}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer1: {
        flex: 1,
        padding: 1,
        elevation: 7,
        borderRadius: 10,
    },
    cardContainer2: {
        flex: 9,
        padding: 1,
        elevation: 7,
        borderRadius: 10,
    },
    cardWrapper: {
        flex: 1,
        padding: 20,
    },
    noteText: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: fonts.primary, 
        color: colors.brandgrey
    },
});


//export default Email;


const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        date: state.auth.date,
        healthCoachId: state.auth.healthCoach
        };
};

export default connect(mapStateToProps, {submitMessage}) (Email);
