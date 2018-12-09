import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { Text, Image, View, FlatList, TouchableOpacity, ActivityIndicator, ToastAndroid, TextInput, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { Header, SearchBar, ButtonGroup, Card, ListItem, Button, Icon } from 'react-native-elements';
import {searchExercise} from '../actions';
const uuid = require('uuid/v1');
import { HaH_Header, HaH_NavBar } from '../components/common';
import {colors, margin, padding, fonts} from '../styles/base.js'

class ExerciseSearch extends Component {
    state = {
        showLoader:true,
        searchText:""
    }

    componentDidUpdate(prevProps) {
        if(this.props.SearchResult != null && this.props.SearchResult != prevProps.SearchResult)
        {
            if(this.props.SearchResult.length != 0)
            {
                console.log(this.props.SearchResult) 
                this.setState({showLoader:false})
            }
        }
    }

    endReached = () => { 
        ToastAndroid.show('Loading more data...',3000,"BOTTOM")
    }
   
    // on selecting perticular item from exercise search result
    onPress = (item) => {
        // on instance item is the obj that we get from search result
        let id = uuid();
        id = id.split("-").join("");
        let obj={
            "exid":id,
            "exName":item.name,
            "duration":"10",
            "intensity":"Low"
        }
        Actions.push("exercisecard",{item:obj,firstTime:true,onBack:this.props.onBack});
    }

    submitEditing = () => {
        let text = this.state.searchText;
        this.props.searchExercise(text);
    }

    searchTextChanged = (text) => {
        this.setState({searchText:text})
        this.props.searchExercise(text);
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
    }

    render() {
        return (
            <View style = {{flex: 1}}>
                <HaH_Header
                    text = 'Add Exercise'/>
                 <SearchBar
                    onChangeText = {this.searchTextChanged}
                    placeholder='Enter exercise...'
                    containerStyle = {styles.searchContainer}
                    inputContainerStyle = {styles.searchInputContainer}
                    inputStyle = {styles.searchInput}/>
                <View style={{flex:2}}>
                {
                        (this.state.showLoader == true) ? <ActivityIndicator size="large" color="#0000ff"/> :
                        <View style={{flex:1}}>
                            
                            <FlatList
                                data={this.props.SearchResult}
                                renderItem={({item}) => (
                                    <TouchableOpacity
                                        
                                        style = {{paddingTop: 7, paddingBottom: 7}}
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
                                               {this.capitalize(item.name)} 
                                            </Text>
                                        </Card>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={item => item.name}
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
    searchContainer: {
        backgroundColor: 'transparent',
        borderBottomColor: colors.brandgrey,
        borderTopColor: 'transparent',
        borderBottomWidth: 2
    },
    searchInputContainer: {
        backgroundColor: 'transparent',
    },
    searchInput: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    searchIcon: {
        //size: 15
    },
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

//export default SearchExercise;
const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        date : state.auth.date,
        SearchResult : state.exerciseSearch.searchRes
    };
};

export default connect(mapStateToProps, {searchExercise}) (ExerciseSearch);