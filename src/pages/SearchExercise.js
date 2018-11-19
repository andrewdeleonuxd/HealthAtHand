import React, { Component } from 'react';
import { Text, Image, View, FlatList, TouchableOpacity, ActivityIndicator, ToastAndroid, TextInput, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { Header, SearchBar, ButtonGroup, Card, ListItem, Button, Icon } from 'react-native-elements'


import { HaH_Header, HaH_NavBar } from '../components/common';
import {colors, margin, padding, fonts} from '../styles/base.js'

class SearchExercise extends Component {
    state = {
        newsData:[],
        totalResults:0,
        page:1,  
        count:0,
        showLoader:true,
        searchText:""
    }

    componentWillMount = () => {
    }

    endReached = () => {
        ToastAndroid.show('Loading more data...',3000,"BOTTOM")
    }

    formData = (request)  => {
        //TO DO
    }
 
    onPress = (item) => {
        Actions.push("exercisecard",{item:item,firstTime:true,onBack:this.props.onBack});
    }

    submitEditing = () => {
        let exercise = this.state.searchText
        this.setState({newsData:[]})
        const request = new Request('https://http://sis-teach-01.sis.pitt.edu/projects/healthathand/exercise/' + exercise)
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

    render() {
        return (
            <View style = {{flex: 1, marginTop: Expo.Constants.statusBarHeight}}>
                <HaH_Header
                    text = 'Add Exercise'/>
                <SearchBar
                    lightTheme
                    round
                    onChangeText = {this.searchTextChanged}
                    onSubmitEditing = {this.submitEditing}
                    placeholder='Type Here...' />
                <View style={{flex:2}}>
                    {
                        (this.state.showLoader == true) ? <ActivityIndicator size="large" color="#0000ff"/> :
                        <View style={{flex:1}}>
                            
                            <FlatList
                                data={this.state.choices}
                                renderItem={({item}) => (
                                    <TouchableOpacity
                                        
                                        style = {{paddingBottom: 7}}
                                        onPress = {() => this.onPress(item)}
                                        underLayColor="transparent"
                                    >
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
                                    </TouchableOpacity>
                                )}
                                onEndReachedThreshold={0.5}
                                onEndReached={this.endReached}
                                keyExtractor={item => item.food_name}
                            />
                        </View>
                    }
                </View>
                <HaH_NavBar
                    selected = {3}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cardHeader: {
        flex: 3,
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: fonts.primary, 
        color: colors.primary,
        textAlign:'left',
        marginRight: 25,
        alignSelf: 'center',
        paddingLeft: 15
    },
    cardContainer: {
        marginTop: 0,
        elevation: 7,
        borderRadius: 10
    },
    cardWrapper: {
        flexDirection: 'row',
        flex: 1,
        marginLeft: 0
    },
    categoryContainer: {
        height: 50,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        borderRadius: 15,
        borderColor: colors.brandblue
    },
    categoryTextUnselected: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: fonts.primary,
        color: colors.primary
    },
    categoryTextSelected: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: fonts.primary,
        color: colors.brandwhite
    },
    categoryButtonSelected: {
        opacity: 0.8, 
        backgroundColor: colors.brandblue
    }
});

export default SearchExercise;