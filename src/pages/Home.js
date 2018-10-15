import React , {Component } from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux'
import ScrollableTabView, {ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import {employeeCreate} from '../actions';
import { Header, SearchBar } from 'react-native-elements'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Drawer from 'react-native-drawer'
import Tabs from 'react-native-tabs';
import Communications from 'react-native-communications';

import { Text, Image, View, FlatList, TouchableHighlight, ActivityIndicator, ToastAndroid, Picker, StatusBar, Platform, Dimensions, Linking, StyleSheet } from 'react-native';

import {colors} from '../styles/base.js'

const drawerStyles = {
    drawer: { backgroundColor:"#0F084B"}
}


const categories = {
        0:"home",
        1:"add food",
        2:"add exercise",
        3:"food notes",
        4:"exercise notes"
    }

class Home extends Component {

    state = {

    }

    componentWillMount = () => {
       
    }


    closeControlPanel = () => {
        this._drawer.close()
    };

    openControlPanel = () => {
        this._drawer.open()
    };

    onPress = (item) => {
        
        Actions.push("articleinfo", {item:item});
        
    }

    showHome = () => {
        Actions.home();
    }

    showAddFood = () => {
        
        Actions.push("addfood",{type:"addfood"});
        
    }

    showAddExercise = () => {
        /*
        Actions.push("publications",{type:"publications"});
        */
    }

    showAddFoodNotes = () => {
        
        Actions.push("foodnotes");
        
    }

    showAddExerciseNotes = () => {
        
        Actions.push("exercisenotes");
        
    }

    textMessage = () => {
        Communications.text("4123205413");
        Actions.home();
    }

    showChart = () => {
       
    }

    showNotification = () => {
       
    }

    render(){
        let search = (
            <Icon
                name='notifications-active'
                underlayColor={"transparent"}
                color="white"
                onPress = {this.showNotification}
            />
        )

        let hamburger = (
            <Icon
                name='menu'
                underlayColor={"transparent"}
                color="white"
                onPress = {this.openControlPanel}
            />
        )

        let drawerMenu = (
            <View style={{padding:10, marginTop:20}}>
                <TouchableHighlight
                    onPress = {this.showAddFood}
                    underlayColor = "transparent"
                >
                <View style={{"marginBottom":20}}>
                    <Text style={{color:"white", fontSize:15, "marginBottom":20}}>Add Food</Text>
                    <View style={{borderColor:"lightgray", borderWidth:1}}></View>
                </View>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress = {this.showAddExercise}
                    underlayColor = "transparent"
                >
                <View style={{"marginBottom":20}}>
                    <Text style={{color:"white", fontSize:15, "marginBottom":20}}>Add Exercise</Text>
                    <View style={{borderColor:"lightgray", borderWidth:1}}></View>
                </View>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress = {this.showAddFoodNotes}
                    underlayColor = "transparent"
                >
                <View style={{"marginBottom":20}}>
                    <Text style={{color:"white", fontSize:15, "marginBottom":20}}>Food Notes</Text>
                    <View style={{borderColor:"lightgray", borderWidth:1}}></View>
                </View>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress = {this.showAddExerciseNotes}
                    underlayColor = "transparent"
                >
                <View style={{"marginBottom":20}}>
                    <Text style={{color:"white", fontSize:15, "marginBottom":20}}>Exercise Notes</Text>
                    <View style={{borderColor:"lightgray", borderWidth:1}}></View>
                </View>
                </TouchableHighlight>
            </View>
        )
        return(
            <Drawer
                ref={(ref) => this._drawer = ref}
                content={drawerMenu}
                type="overlay"
                tapToClose={true}
                styles={drawerStyles}
                openDrawerOffset={0.5}>
                <StatusBar
                    backgroundColor="#0F084B"
                    barStyle="light-content"/>
                <View style={{flex:1}}>
                    <Header
                        outerContainerStyles={{height:60,backgroundColor:"#0F084B"}}
                        leftComponent={hamburger}
                        centerComponent={{ text: 'Home', style: { color: '#fff',fontSize:17 }}}
                        rightComponent={search}/>
                    <View style={{flex:3}}>
                            
                    </View>
                    <View style={{flexDirection: 'row', height:60, backgroundColor: colors.primary, justifyContent:"space-around"}}>
                        <Icon
                            name='home'
                            type='font-awesome'
                            color={colors.secondary}
                            onPress={this.showHome}>
                        </Icon>
                        <Icon
                            name='cutlery' 
                            type='font-awesome'
                            color={colors.secondary}
                            onPress={this.showAddFood}>
                        </Icon>
                        <Icon
                            name='chain' 
                            type='font-awesome'
                            color={colors.secondary}
                            onPress={this.showAddExercise}>
                        </Icon>
                        <Icon
                            name='bar-chart-o'
                            type='font-awesome'
                            color={colors.secondary}
                            onPress={this.showChart}>
                        </Icon>
                        <Icon
                            name='phone-square'
                            type='font-awesome'
                            color={colors.secondary}
                            onPress={this.textMessage}>
                        </Icon>
                    </View>
                </View>
        </Drawer>
        );
    }
}



const mapStateToProps = (state) => {
    
    return state;
};


export default connect(mapStateToProps, {employeeCreate}) (Home);







// ********************************************************************************************************************************************************************************************







/*

var translate = require('../actions/translate')


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});




const languageMap = {
    "English":'en',
    "Hindi":'hi',
    "Marathi":'mr',
    "French":'fr',
    "Gujarati":'gu'
}

class HomePage extends Component {
    state = {
        newsData:[],
        language:'en',
        totalResults:0,
        render:[],
        page:1,
        categorySelected:0,
        count:0,
        headlines:(<ActivityIndicator size="large" color="#0000ff" />),
        showLoader:true,
        searchText:"",
        showSearch:false,
        q:[],
        height:Dimensions.get('window').height
    }



    endReached = () => {
        if(Platform.OS == "android")
            ToastAndroid.show('Loading more news...',3000,"BOTTOM")
        let category = categories[this.state.categorySelected];
        const request = new Request('https://newsapi.org/v2/everything?pageSize=10&sortBy=publishedAt&page=' + this.state.page++ + '&q=' + category,headers)
        this.formData(request)
    }



    changePicker = (position, language) => {
        language = languageMap[language]
        let newsData = this.state.newsData
        this.setState({language:language, newsData:[], showLoader:true})
        if(Platform.OS == "android")
            ToastAndroid.show('Translating...',3000,"BOTTOM")
        let category = categories[this.state.categorySelected];
        let data = []
        translate.translate(this.state.q,language,(resp) => {
            newsData.map((item, index) => {
                return item.title = resp[index]
            })
            this.setState({newsData:newsData, showLoader:false})
        })

        const request = new Request('https://newsapi.org/v2/everything?pageSize=10&sortBy=publishedAt&page=' + this.state.page + '&q=' + category,headers)
        //this.formData(request)
    }

 


 

    submitEditing = () => {
        Actions.push("search",{text:this.state.searchText});
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

 


    showPublications = () => {
        Actions.push("publications",{type:"publications"});
    }

    showCountries = () => {
        Actions.push("publications",{type:"countries"});
    }

    render() {
        let search = (
                <Icon
                    name='search'
                    underlayColor={"transparent"}
                    color="white"
                    marginTop={50}
                    onPress = {this.showSearchbar}
                />
        )

        let hamburger = (
            <Icon
                name='menu'
                underlayColor={"transparent"}
                color="white"
                onPress = {this.openControlPanel}
            />
        )

        let translateView = (
        <View>
            <ModalDropdown options={['English','Marathi','French','Hindi','Gujarati']}
                defaultValue="Translate"
                onSelect = {this.changePicker}
                           style={{borderWidth:1, width:"20%",borderRadius:10, backgroundColor:"#0F084B",marginTop:5,marginLeft:3}}
                dropdownStyle = {{width:"50%",color:"black"}}
                           textStyle = {{fontSize:13, color:"white",alignSelf:"center"}}
                           dropdownTextStyle = {{fontSize:13, color:"black"}}
            />
        </View>
        )

        let drawerMenu = (
            <View style={{padding:10, marginTop:20}}>
                <TouchableHighlight
                    onPress = {this.showPublications}
                    underlayColor = "transparent"
                >
                <View style={{"marginBottom":20}}>
                    <Text style={{color:"white", fontSize:15, "marginBottom":20}}>Publications</Text>
                    <View style={{borderColor:"lightgray", borderWidth:1}}></View>
                </View>
                </TouchableHighlight>
            </View>
        )

        return (
                <Drawer
                    ref={(ref) => this._drawer = ref}
                    content={drawerMenu}
                    type="overlay"
                    tapToClose={true}
                    styles={drawerStyles}
                    openDrawerOffset={0.5}
                >
                    <StatusBar
                        backgroundColor="#0F084B"
                        barStyle="light-content"
                    />
                    <View style={{flex:1}}>
                        <Header
                            outerContainerStyles={{height:60,backgroundColor:"#0F084B"}}
                            leftComponent={hamburger}
                            centerComponent={{ text: 'Headlines', style: { color: '#fff',fontSize:17 }}}
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

                        <View style={{flex:3}}>
                            <ScrollableTabView
                                initialPage={0}
                                renderTabBar={() => <ScrollableTabBar />}
                                tabBarActiveTextColor={"red"}
                                tabBarUnderlineStyle={{height:2}}
                                onChangeTab={this.tabChanged}
                            >
                                <View tabLabel='Business'>
                                    {translateView}
                                    {
                                    (this.state.showLoader == true) ? <ActivityIndicator size="large" color="#0000ff"/> : this.state.render
                                }</View>
                                <View tabLabel='Entertainment'>
                                    {translateView}
                                    {
                                    (this.state.showLoader == true) ? <ActivityIndicator size="large" color="#0000ff"/> : this.state.render
                                }</View>
                                <View tabLabel='General'>
                                    {translateView}
                                    {
                                    (this.state.showLoader == true) ? <ActivityIndicator size="large" color="#0000ff"/> : this.state.render
                                }</View>
                                <View tabLabel='Health'>
                                    {translateView}
                                    {
                                    (this.state.showLoader == true) ? <ActivityIndicator size="large" color="#0000ff"/> : this.state.render
                                }</View>
                                <View tabLabel='Science'>
                                    {translateView}
                                    {
                                    (this.state.showLoader == true) ? <ActivityIndicator size="large" color="#0000ff"/> : this.state.render
                                }</View>
                                <View tabLabel='Sports'>
                                    {translateView}
                                    {
                                    (this.state.showLoader == true) ? <ActivityIndicator size="large" color="#0000ff"/> : this.state.render
                                }</View>
                                <View tabLabel='Technology'>
                                    {translateView}
                                    {
                                    (this.state.showLoader == true) ? <ActivityIndicator size="large" color="#0000ff"/> : this.state.render
                                }</View>
                            </ScrollableTabView>
                        </View>
                    </View>
                    <View>
                        <Text style={{alignSelf:'center',fontSize:15}}>Powered by NewsAPI.org</Text>
                    </View>
                </Drawer>

        )
    }
}
export default HomePage;
*/
