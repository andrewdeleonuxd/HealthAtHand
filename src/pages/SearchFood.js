import React, { Component } from 'react';
import { Text, Image, View, FlatList, TouchableHighlight, ActivityIndicator, ToastAndroid, TextInput } from 'react-native';
import {Actions} from 'react-native-router-flux'
import ScrollableTabView, {ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import { Header, SearchBar } from 'react-native-elements'
import { Card, ListItem, Button, Icon } from 'react-native-elements'

import { HaH_Header, HaH_NavBar } from '../components/common';
import testReponse from '../testdata/searchresult_pizza'

const headers = { method: 'GET',
    headers: {
        "X-Api-Key":"b7c0872a3fb042d9baa45eb7b6385faa"
    }};

class SearchFood extends Component {
    state = {
        choices:[],
        totalResults:0,
        page:1,  
        count:0,
        showLoader:false,
        searchText:""
    }
    
    componentWillMount = () => {
    }
    
    endReached = () => {
        ToastAndroid.show('Loading more data...',3000,"BOTTOM")
        let category = this.state.text
        const request = new Request('https://newsapi.org/v2/everything?sortBy=relevancy&language=en&page=' + this.state.page++ + '&q=' + category,headers)
        this.formData(request)
    }

    formData = (request)  => {
        {/*
        fetch(request)
            .then((response) => response.json())
            .then((responseJson)=>{
                if(responseJson.common.length > 0) {
                    this.setState({newsData:this.state.choices, showLoader:false})
                } else {
                    this.state.choices = responseJson.common
                    console.log("no data");
                }
            })
            .catch((error) => {
                console.log("error", error);
            })
        */}

        
        if(testReponse.common.length > 0) {
            console.log(testReponse.common.length)
            this.state.choices = testReponse.common
            this.setState({choices:this.state.choices, showLoader:false})
        } else {
            this.state.choices = testReponse.common
            console.log("no data");
        }
    }

    onPress = (item) => {
        Actions.push("foodcard",{item:item,firstTime:true,mealNo:this.props.mealNo,onBack:this.props.onBack});
    }

    submitEditing = () => {
        let category = this.state.searchText
        this.setState({newsData:[]})
        const request = new Request('https://http://sis-teach-01.sis.pitt.edu/projects/healthathand/search/' + category)
        this.formData(request)
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

    render() {
        return (
            <View style = {{flex: 1, marginTop: Expo.Constants.statusBarHeight}}>
                <HaH_Header
                    text = 'Add Food'/>
                <View style={{flex:1,flexDirection: 'column'}}>
                    <SearchBar
                        lightTheme
                        round
                        onChangeText = {this.searchTextChanged}
                        onSubmitEditing = {this.submitEditing}
                        placeholder='Type Here...' />
                    <View style={{flex:2}}>
                        {
                            (this.state.showLoader == true) ? <ActivityIndicator size="large" color="#0000ff"/> :
                            <FlatList       
                                data={this.state.choices}
                                renderItem={({item}) => (
                                    <TouchableHighlight
                                        onPress = {() => this.onPress(item)}
                                        underLayColor="transparent"
                                    >
                                        <View>
                                            <Card
                                                title = {item.food_name}

                                                titleNumberOfLines = {2}
                                            >
                                                <Text style={{color:"maroon",fontSize:15,marginBottom:5}}>
                                                    {item.serving_qty}({item.serving_unit})
                                                </Text>
                                            </Card>
                                        </View>
                                    </TouchableHighlight>
                                )}
                                onEndReachedThreshold={0.5}
                                onEndReached={this.endReached}
                            />
                        }
                    </View>
                </View>
                <HaH_NavBar
                    selected = {2}
                />
            </View>
        )
    }
}
export default SearchFood;
