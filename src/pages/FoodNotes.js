import React,{Component} from 'react'
import {View, TextInput,ToastAndroid, FlatList, Image, TouchableHighlight, ScrollView} from 'react-native'
import { Header, Icon , SearchBar, Card, Button } from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import Communications from 'react-native-communications';

class FoodNotes extends Component {
    state = {
     text:" "
    }

    goBack = () => {
        Actions.home();
    }

    done = () => {
        ToastAndroid.show('done',3000,"TOP")
        Actions.home();
    }

    onTextPress() {
        Communications.text("4123205413",this.state.text);
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
                    style={{height: "50%"}}
                    placeholder="Type here to translate!"
                    onChangeText={(text) => this.setState({text})}
                    multiline = {true}
                    textAlignVertical= 'top'
                    maxLength = {400}
                    numberOfLines = {20}
                    disableFullscreenUI ={true}
                    />
                    
                </ScrollView>

                       <View style={{backgroundColor:"white"}}>  
                      <Card>
                                    <Button
                                    title='Complete Diary' 
                                    backgroundColor="blue"
                                    onPress={this.onTextPress.bind(this)}
                                    />
                            </Card> 
                       </View>  
                   
            </View>
        )
    }
}

export default FoodNotes;
