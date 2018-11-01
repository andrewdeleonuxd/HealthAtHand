import React, { Component } from 'react';
import { Text, Image, View, FlatList, TouchableOpacity, ActivityIndicator, ToastAndroid, TextInput, StyleSheet } from 'react-native';
import {Actions} from 'react-native-router-flux'
import ScrollableTabView, {ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import { Header, SearchBar, ButtonGroup} from 'react-native-elements'
import { Card, ListItem, Button, Icon } from 'react-native-elements'

import { HaH_Header, HaH_NavBar } from '../components/common';
import testReponse from '../testdata/searchresult_pizza'

import {colors, margin, padding} from '../styles/base.js'

class SearchFood extends Component {
    state = {
        choices:[],
        totalResults:0,
        page:1,  
        count:0,
        showLoader:false,
        searchText:"",
        category: 0
    }
    
    componentWillMount = () => {
    }
    
    endReached = () => {
        ToastAndroid.show('Loading more data...',3000,"BOTTOM")
    }

    formData = (request)  => {
        {/*
        fetch(request)
            .then((response) => response.json())
            .then((responseJson)=>{
                if(responseJson.common.length > 0) {
                    this.setState({newsData:this.state.choices, showLoader:false})
                } else {
                    this.state.choices = responseJson
                    console.log("no data");
                }
            })
            .catch((error) => {
                console.log("error", error);
            })
        */}

        
        if(testReponse.common.length > 0) {
            this.state.choices = testReponse.common
            this.setState({choices:this.state.choices, showLoader:false})
        } else {
            this.state.choices = testReponse.common
            console.log("no data");
        }
        
        {/*
        if(testReponse.branded.length > 0) {
            console.log(testReponse.common.length)
            this.state.choices = testReponse.branded
            this.setState({choices:this.state.choices, showLoader:false})
        } else {
            this.state.choices = testReponse.branded
            console.log("no data");
        }
        
        */}
    }

    onPress = (item) => {
        Actions.push("foodcard",{item:item,flag:{branded},firstTime:true,mealNo:this.props.mealNo,onBack:this.props.onBack});
    }

    submitEditing = () => {
        let food = this.state.searchText
        this.setState({newsData:[]})
        const request = new Request('https://http://sis-teach-01.sis.pitt.edu/projects/healthathand/search/' + food)
        this.formData(request)
    }

    searchTextChanged = (text) => {
        this.setState({searchText:text})
    }

    capitalize(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    findThumbnail(thumb) {
        if(thumb != null) {
            return {uri: thumb}
        }
        else {
            return {uri: "https://d2eawub7utcl6.cloudfront.net/images/nix-apple-grey.png"}
        }
    }

    updateCategory = (category) => {
        this.setState({showLoader: true});
        (category == 0) ? this.setState({choices: testReponse.common, category, showLoader: false}) : this.setState({choices: testReponse.branded, category, showLoader: false})
    }

    render() {
        return (
            <View style = {{flex: 1, marginTop: Expo.Constants.statusBarHeight}}>
                <HaH_Header
                    text = 'Add Food'/>
                <View style={{flex:1,flexDirection: 'column'}}>
                    <ButtonGroup
                        selectedBackgroundColor="pink"
                        onPress={this.updateCategory}
                        selectedIndex={this.state.category}
                        buttons={['Common', 'Branded']}
                        containerStyle={{height: 30}}
                    />
                    <SearchBar
                        lightTheme
                        round
                        onChangeText = {this.searchTextChanged}
                        onSubmitEditing = {this.submitEditing}
                        placeholder='Type Here...' />
                    <View style={{flex:1}}>
                        {
                            (this.state.showLoader == true) ? <ActivityIndicator size="large" color="#0000ff"/> :
                            <View style={{flex:1}}>
                                
                                <FlatList
                                    data={this.state.choices}
                                    renderItem={({item}) => (
                                        <TouchableOpacity
                                            onPress = {() => this.onPress(item)}
                                            underLayColor="transparent"
                                        >
                                            <View style = {{paddingTop: 0, marginTop: 0, paddingBottom: 10}}>
                                                
                                                <Card
                                                    containerStyle = {styles.cardContainer}
                                                    wrapperStyle = {styles.cardWrapper}>
                                                    <Image
                                                        style={{width: 30, height: 30}}
                                                        source={this.findThumbnail(item.photo.thumb)}
                                                    />
                                                    <Text style = {styles.cardHeader}>
                                                        {this.capitalize(item.food_name)}
                                                    </Text>
                                                </Card>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    onEndReachedThreshold={0.5}
                                    onEndReached={this.endReached}
                                />
                            </View>
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

styles = StyleSheet.create({
    cardHeader: {
        flex: 3,
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed', 
        color: colors.primary,
        textAlign:'center',
        marginRight: 25,
        alignSelf: 'center'
    },
    cardContainer: {
        elevation: 7,
        borderRadius: 10
    },
    cardWrapper: {
        flexDirection: 'row',
        flex: 1,
        marginLeft: 0
    }
})
export default SearchFood;
