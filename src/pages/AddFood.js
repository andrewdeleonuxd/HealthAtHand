import React,{Component} from 'react'
import {View, Text, FlatList, Image, TouchableHighlight} from 'react-native'
import { Header, Icon , SearchBar } from 'react-native-elements'
import {Actions} from 'react-native-router-flux'

class AddFood extends Component {
    state = {
        publicationsData:[],
        count:0,
        showLoader:true,
        showSearch:false,
        searchText:"",

    }

    goBack = () => {
        Actions.home();
    }

    searchTextChanged = (text) => {
        this.setState({searchText:text})
    }

    showSearchbar = () => {
        
        if(this.state.showSearch == true)
            this.setState({showSearch:false})
        else
            this.setState({showSearch:true})
            
    }

    submitEditing = () => {
        Actions.push("searchfood",{text:this.state.searchText});
    }

    render = () => {
        let search = (
            <Icon
                name='search'
                underlayColor={"transparent"}
                color="white"
                marginTop={50}
                onPress = {this.showSearchbar}
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
                    centerComponent={{ text: 'Add Food', style: { color: '#fff',fontSize:17 }}}
                    rightComponent={search}
                />
                    {
                            (this.state.showSearch == true) ? <SearchBar
                                lightTheme
                                round
                                onChangeText = {this.searchTextChanged}
                                onSubmitEditing = {this.submitEditing}
                                placeholder='Type Here...' /> : <View></View>
                        }

            </View>
        )
    }
}

export default AddFood;
