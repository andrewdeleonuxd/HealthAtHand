import React,{Component} from 'react';
import _ from 'lodash';
import {View, Text, FlatList, Image, TouchableHighlight} from 'react-native'
import { Card, Header, Icon , SearchBar, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {initializefood } from '../actions';

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
        Actions.push("searchfood",{text:this.state.searchText,mealNo:this.props.item.mealNo,onBack:this.props.item});
    }


    render = () => {
        let search = (
            <Icon
                name='add-box'
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
                    centerComponent={{ text: 'Meal '+this.props.item.mealNo, style: { color: '#fff',fontSize:17 }}}
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

                    {
                    (data.length == 0) ? <View></View> : 
                    <View style={{backgroundColor:"white", height:"75%"}}>

                              {data}
                                 
                    </View>   
                    }   

            </View>
        )
    }
}

//export default AddFood;

const mapStateToProps = state => {
    return {
        foodArray: state.food.foodArray
    };
};

export default connect(mapStateToProps, {initializefood}) (AddFood);
