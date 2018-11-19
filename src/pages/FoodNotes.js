import React,{Component} from 'react';
import {connect} from 'react-redux';
import {View, TextInput,ToastAndroid, FlatList, Image, TouchableHighlight, ScrollView} from 'react-native'
import { Header, Icon , SearchBar, Card, Button} from 'react-native-elements';
import {initializefoodNotes,submitfoodNotes } from '../actions';
import {Actions} from 'react-native-router-flux'

class FoodNotes extends Component {
    state = {
     text:" "
    }

    componentWillMount = () => {
        this.props.initializefoodNotes(this.props.userId,this.props.date);
    }
     
    componentWillReceiveProps = (nextProps) => { 
           this.setState({text:nextProps.mealNotes});
    }

    goBack = () => {
        Actions.home();
    }

    done = () => {
        ToastAndroid.show('done',3000,"TOP")
        this.props.submitfoodNotes(this.props.userId,this.props.date,this.state.text);
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
            <View>
                <Header
                    outerContainerStyles={{height:60,backgroundColor:"#0F084B"}}
                    leftComponent={backButton}
                    centerComponent={{ text: 'Food Notes', style: { color: '#fff',fontSize:17 }}}
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
        mealNotes: state.mealnotes.notes
    };
};

export default connect(mapStateToProps, {initializefoodNotes,submitfoodNotes}) (FoodNotes);


