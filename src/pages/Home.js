import React , {Component } from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux'
import ScrollableTabView, {ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import {employeeCreate} from '../actions';
import { Header, SearchBar } from 'react-native-elements'
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import Drawer from 'react-native-drawer';
import Tabs from 'react-native-tabs';
import Communications from 'react-native-communications';

import { Text, Image, View, FlatList, TouchableHighlight, ActivityIndicator, ToastAndroid, Picker, StatusBar, Platform, Dimensions, Linking, StyleSheet } from 'react-native';
import { CircularProgress, AnimatedCircularProgress } from 'react-native-circular-progress';

import {colors, margin, padding} from '../styles/base.js'

const drawerStyles = {
    drawer: { backgroundColor:"#0F084B"}
}

maxCal = 2000;

const categories = {
        0:"home",
        1:"add food",
        2:"add exercise",
        3:"calender",
        4:"text message"
    }

class Home extends Component {

    state = {
        isMoving: false,
        pointsDelta: 0,
        dailyCal: 325
    
    }

    componentWillMount = () => {
         /*
        fetch('placeholder', {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                dailyCal: responseJson
            })
        })
        */
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
        
        Actions.push("meallog",{type:"addfood"});
        
    }

    showAddExercise = () => {
        
        Actions.push("exerciselog",{type:"addexercise"});
        
    }

    showAddFoodNotes = () => {
        
        Actions.push("foodnotes");
        
    }

    showAddExerciseNotes = () => {
        
        Actions.push("exercisenotes");
        
    }

    email = () => {
       // Communications.text("4123205413");
       // Communications.email(to, cc, bcc, subject, body)
    //   Communications.email(['abcd@gmail.com'],null,null,'update','Hello');
         Actions.push("email");
    }

    showChart = () => {
       
    }

    showNotification = () => {
       
    }

    render(){
        let search = (
            <Icon
                name='notifications'
                type='MaterialIcons'
                underlayColor={"transparent"}
                color={colors.secondary}
                onPress = {this.showNotification}
            />
        )

        let hamburger = (
            <Icon
                name='menu'
                underlayColor={"transparent"}
                color={colors.secondary}
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
        const fill = this.state.dailyCal / maxCal * 100;
        return(
            <Drawer
                ref={(ref) => this._drawer = ref}
                content={drawerMenu}
                type="overlay"
                tapToClose={true}
                styles={drawerStyles}
                openDrawerOffset={0.5}>
                <StatusBar
                    backgroundColor={colors.primary}
                    barStyle="light-content"/>
                <View style={{flex:1, marginTop: Expo.Constants.statusBarHeight}}>
                    <Header
                        outerContainerStyles={{height:60,backgroundColor:colors.primary, opacity:0.8}}
                       // leftComponent={hamburger}
                        centerComponent={{ text: 'Dashboard', style: styles.headerCenter}}
                      //  rightComponent={search}
                    />
                   
                      <View style={{flex:1}}>
                        <Card
                            containerStyle = {{margin: margin.lg, elevation: 10}}
                            wrapperStyle = {{alignItems: 'flex-start', marginLeft: 0}}>
                            <Text
                                style = {styles.calorieHeader}>
                                Today's Calorie Intake
                            </Text>
                        </Card>

                        <View style = {{flex:5, alignItems: 'center', justifyContent: "center", marginTop: margin.lg}}>
                            <AnimatedCircularProgress
                                size={250}
                                width={30}
                                fill={fill}
                                tintColor={colors.secondary}
                                backgroundColor={colors.tertiary}
                                >
                                {(fill) => (
                                    <View>
                                        <Text style={styles.points}>
                                            { Math.round(maxCal * fill / 100) }
                                        </Text>
                                        <Text style = {styles.pointsLabel}>
                                            /{ maxCal } Calories
                                        </Text>
                                    </View>
                                )}
                            </AnimatedCircularProgress>
                        </View>
                        {/*
                        <View
                            style = {{flex: 1, justifyContent: "center"}}>
                            <Text style={styles.pointsHeader}>
                                Total Calories: { Math.round(MAX_POINTS * fill / 100) } / {MAX_POINTS}
                            </Text>
                        </View>
                        */}
                        <View style = {{flex:4}}>
                            <Card
                                containerStyle = {{flex: 1, margin: margin.lg, elevation: 10}}
                                wrapperStyle = {{alignItems: 'flex-start', flexDirection: 'column', marginLeft: 0}}>
                                <Text
                                    style = {styles.calorieHeader}>
                                    Today's Report
                                </Text>
                            </Card>
                        </View>
                        <View style = {{flex:.5}}>
                        </View>
                        
                    </View>

                    <View style={{flexDirection: 'row', height:60, backgroundColor: colors.primary, justifyContent:"space-around", opacity: 0.8}}>
                        <Icon
                            name='tachometer'
                            type='font-awesome'
                            color={colors.secondary}
                            onPress={this.showHome}
                            size={30}
                            underlayColor='transparent'>
                        </Icon>
                        <Icon
                            name='food'
                            type='material-community'
                            color={colors.brandwhite}
                            onPress={this.showAddFood}
                            size={30}
                            underlayColor='transparent'>
                        </Icon>
                        <Icon
                            name='run'
                            type='material-community'
                            color={colors.brandwhite}
                            onPress={this.showAddExercise}
                            size={30}
                            underlayColor='transparent'>
                        </Icon>
                        <Icon
                            name='mail'
                            type='Entypo'
                            color={colors.brandwhite}
                            onPress={this.email}
                            size={30}
                            underlayColor='transparent'> 
                        </Icon>
                        <Icon
                            name='settings'
                            type='Feather'
                            color={colors.brandwhite}
                            onPress={this.showAddExercise}
                            size={30}
                            underlayColor='transparent'>
                        </Icon>
                    </View>
                </View>
        </Drawer>
        );
    }
}

const styles = StyleSheet.create({
    calorieHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        fontFamily: 'sans-serif-condensed', 
        color: colors.primary
    },
    pointsHeader: {
      backgroundColor: 'transparent',
      //position: 'absolute',
      //top: 72,
      //left: 56,
      //width: 90,
      textAlign: 'center',
      color: colors.secondary,
      fontSize: 20,
      fontWeight: "100",
      justifyContent: 'center',
      alignItems: 'center'
    },
    points:{
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: colors.primary,
        opacity: 0.8,
        fontSize: 70,
        fontWeight: "100",
        justifyContent: 'center',
        alignItems: 'center'
    },
    pointsLabel:{
        backgroundColor: 'transparent',
        //position: 'absolute',
        //top: 72,
        //left: 56,
        //width: 90,
        textAlign: 'center',
        color: '#7591af',
        fontSize: 14,
        fontWeight: "100",
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#152d44',
      padding: 50
    },
    pointsDelta: {
      color: '#4c6479',
      fontSize: 50,
      fontWeight: "100"
    },
    pointsDeltaActive: {
      color: '#fff',
    },
    headerCenter: {
        color: colors.brandwhite,
        fontSize:30, 
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed'
    }
});


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
