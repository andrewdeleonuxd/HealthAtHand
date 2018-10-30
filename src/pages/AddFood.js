import React,{Component} from 'react';
import _ from 'lodash';
import {View, Text, FlatList, Image, TouchableHighlight, StyleSheet} from 'react-native'
import { Card, Header, Icon , SearchBar, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {initializefood } from '../actions';

import { HaH_Header, HaH_NavBar } from '../components/common';

import {colors, margin, padding} from '../styles/base.js'

var data=[];

class AddFood extends Component {

    state = {
        showLoader:true,
        showSearch:false, 
        searchText:"", 
        mealNo:""
    }

    componentWillMount = () => {

        /*
        let obj={
            id:"mango",
            itemName:"mango",
            totalCalories:25
        }
        
       
        if(this.props.item.food.length == 0){
         //   this.props.initializefood(obj,this.props.foodArray);
            this.loadData(this.props); 

        } else{
            this.loadData(this.props);
        }

        */
        this.loadData(this.props); 


    }


    componentWillReceiveProps = (nextProps) => { 
      //  alert("inside componentWillReceiveProps")
        console.log("componentWillReceiveProps ");
        this.loadData(nextProps)
    } 

    onPress = (item) => {
        Actions.push("foodcard",{item:item,firstTime:false,mealNo:this.props.item.mealNo,onBack:this.props.item});
    }

    loadData = (props) => {
       data=[]; 
       let array=this.props.item.food;
       if(array.length>0){
       array.map((item, i) => {
   
        data.push(
            <TouchableHighlight
            key={i}
            onPress = {() => this.onPress(item)}
            underLayColor="transparent"
            >
            <View >   
            <Card flexDirection='row'>
                <Text style={{
                    color: "maroon",
                    fontSize: 15,
                    marginBottom: 5,
                }}>{item.itemName}</Text>
                <Text style={{
                    color: "maroon",
                    fontSize: 15,
                    marginBottom: 5,
                    marginLeft:"60%"
                }}>{item.totalCalories}</Text> 
            </Card>
            </View>
            </TouchableHighlight>
        )
    })
}
       
    } 


    goBack = () => {
        Actions.meallog();
    }

    showFoodSearch = () => {
        Actions.push("searchfood");
    }


    render = () => {
        let search = (
            <Icon
                name='add-box'
                underlayColor={"transparent"}
                color="white"
                marginTop={50}
                onPress = {this.showFoodSearch}
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
            <View style={{flex:1, marginTop: Expo.Constants.statusBarHeight}}>
                <HaH_Header
                    text = 'Meal 1'
                    right = {search}
                />
                {
                        (this.state.showSearch == true) ? <SearchBar
                            lightTheme
                            round
                            onChangeText = {this.searchTextChanged}
                            onSubmitEditing = {this.submitEditing}
                            placeholder='Type Here...' /> : <View></View>
                }

                {
                    (data.length == 0) ? <View style={{flex: 1, backgroundColor:"white", height:"75%"}}></View>: 
                    <View style={{flex: 1, backgroundColor:"white", height:"75%"}}>
                        <View style={{flex: 1, margin: 0}}>
                            {data} 
                        </View>
                        <View style = {{flex: 1}}/>
                        <View style={styles.deleteView}>
                            <Button 
                                titleStyle = {styles.confirmText}
                                title = 'Delete Meal'
                                onPress = {this.goBack}
                                buttonStyle = {styles.deleteButton}
                                containerStyle = {styles.confirmContainer}
                            />
                        </View>
                        <View style={styles.confirmView}>
                            <Button 
                                titleStyle = {styles.confirmText}
                                title = 'Add Meal to Log'
                                onPress = {this.goBack}
                                buttonStyle = {styles.confirmButton}
                                containerStyle = {styles.confirmContainer}
                            />
                        </View>
                    </View>
                }   
                <HaH_NavBar
                    selected = {2}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    foodName: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        fontFamily: 'sans-serif-condensed', 
        color: colors.primary,
        flex: 3
    },
    foodCals: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
        fontFamily: 'sans-serif-condensed', 
        color: colors.primary,
        marginRight: '10%',
        flex: 4
    },
    confirmButton: {
		backgroundColor: colors.brandgold,
		opacity: 0.8,
		//marginLeft: '10%',
		//marginRight: '10%',
		borderRadius: 5,
		//borderWidth: 1
    },
    deleteButton: {
		backgroundColor: "red",
		opacity: 0.8,
		//marginLeft: '10%',
		//marginRight: '10%',
		borderRadius: 5,
		//borderWidth: 1
	},
	confirmContainer: {
		flexDirection:'row',
		//alignItems: 'center',
		//justifyContent: 'center',
		
	},
	confirmView: {
		backgroundColor: colors.brandwhite,
		paddingBottom: '10%'
		//paddingBottom: padding.sm,
    },
    deleteView: {
		backgroundColor: colors.brandwhite,
		paddingBottom: '3%'
		//paddingBottom: padding.sm,
    },
    confirmText: {
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed', 
        color: colors.primary,

        fontSize: 100,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

//export default AddFood;

const mapStateToProps = state => {
    return {
        foodArray: state.food.foodArray
    };
};

export default connect(mapStateToProps, {initializefood}) (AddFood);
