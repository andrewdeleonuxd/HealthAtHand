import React,{Component} from 'react';
import {connect} from 'react-redux';
import {View, TextInput, FlatList, ToastAndroid, TouchableHighlight ,ScrollView} from 'react-native'
import { Header, Icon , SearchBar } from 'react-native-elements';
import {initializeexerciseNotes,submitexerciseNotes } from '../actions';
import {Actions} from 'react-native-router-flux'

class ExerciseNotes extends Component {
    state = {
        text:" "
    }

    componentWillMount = () => {
        this.props.initializeexerciseNotes(this.props.userId,this.props.date);
    }
     
    componentWillReceiveProps = (nextProps) => { 
           this.setState({text:nextProps.exerciseNotes});
    }

    goBack = () => {
        Actions.home();
    }

    done = () => {
        ToastAndroid.show('done',3000,"TOP")
        this.props.submitexerciseNotes(this.props.userId,this.props.date,this.state.text);
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
                    centerComponent={{ text: 'Exercise Notes', style: { color: '#fff',fontSize:17 }}}
                    rightComponent={check}
                />
           

                 <ScrollView >
                    <TextInput
                    style={{height: "100%"}}
                    placeholder="Type here to translate!"
                    onChangeText={(text) => this.setState({text})}
                    multiline = {true}
                    textAlignVertical= 'top'
                    maxLength = {400}
                    numberOfLines = {200}
                    disableFullscreenUI ={true}
                    />
                    
                </ScrollView>
                   
            </View>
        )
    }
}


const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        date: state.auth.date,
        exerciseNotes: state.exercisenotes.notes
    };
};

export default connect(mapStateToProps, {initializeexerciseNotes,submitexerciseNotes}) (ExerciseNotes);
