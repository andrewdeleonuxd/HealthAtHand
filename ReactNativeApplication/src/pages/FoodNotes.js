import React,{Component} from 'react'
import {connect} from 'react-redux';
import {View, TextInput,ToastAndroid, FlatList, Image, TouchableHighlight, ScrollView, StyleSheet, TouchableOpacity, Text} from 'react-native'
import { Header, Icon , SearchBar, Card, Button} from 'react-native-elements';
import {initializefoodNotes,submitfoodNotes, updatefoodNotes} from '../actions';
import {Actions} from 'react-native-router-flux'

import { HaH_Header, HaH_NavBar } from '../components/common';
import {colors, margin, padding, fonts, button} from '../styles/base.js'

class FoodNotes extends Component {
    state = {
        text:"",
        update: false
    }

    componentWillMount = () => {
        this.setState({update:false})
        this.props.initializefoodNotes(this.props.userId,this.props.date);
    }
    
    componentDidUpdate(prevProps) {
        if(this.props.mealNotes != prevProps.mealNotes) {
            console.log(this.props.mealNotes[0].note)
            this.setState({text: this.props.mealNotes[0].note, update: true})
        }
    }

    goBack = () => {
        Actions.push("meallog",{type:"addfood"});
    }

    done = () => {
        if(this.state.update == false) {
            this.props.submitfoodNotes(this.props.userId,this.props.date,this.state.text);
        }
        else {
            this.props.updatefoodNotes(this.props.userId,this.props.date,this.state.text)
        }
    }

    buttonTitle() {
        title = ""
        this.state.update == false ? title = "Add Note" : title = "Update Note"
        return title;
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
                    text = {'Meal Notes'}
                />
             
                <View style = {{flex: 1, padding: 10}}>   
                    <Card
                        containerStyle = {styles.cardContainer}
                        wrapperStyle = {styles.cardWrapper}>
                        {
                            this.state.update == false ? 
                            <TextInput
                                style={styles.noteText}
                                placeholder="Enter your thoughts on your calorie intake today!"
                                onChangeText={(text) => this.setState({text})}
                                multiline = {true}
                                textAlignVertical= 'top'
                                maxLength = {400}
                            />
                            :
                            <TextInput
                                style={styles.noteText}
                                defaultValue={this.state.text}
                                onChangeText={(text) => this.setState({text})}
                                multiline = {true}
                                textAlignVertical= 'top'
                                maxLength = {400}
                            />
                        }
                        
                    </Card>
                </View>
                <View style={{paddingLeft: '4%', paddingRight: '4%', paddingTop: '2%', paddingBottom: '4%'}}>
                    <TouchableOpacity
                        style = {[button.touchable, {backgroundColor: colors.brandgold}]}
                        onPress={this.done}>
                        <View style={button.view}>
                            <Text style = {button.text}>
                                {this.buttonTitle()}
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
    cardContainer: {
        flex: 1,
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

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        date: state.auth.date,
        mealNotes: state.mealnotes.notes
    };
};

export default connect(mapStateToProps, {initializefoodNotes,submitfoodNotes, updatefoodNotes}) (FoodNotes);