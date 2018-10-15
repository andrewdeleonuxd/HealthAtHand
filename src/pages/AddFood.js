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
        publicationsData:[],
        count:0,
        showLoader:true,
        showSearch:false,
        searchText:"", 

    }

    componentWillMount = () => {

        let obj={
            id:"mango",
            itemName:"mango",
            totalCalories:25
        }

        if(this.props.foodArray.length == 0){
            this.props.initializefood(obj,this.props.foodArray);
            this.loadData(this.props); 

        } else{
            this.loadData(this.props);
        }

    }


    componentWillReceiveProps = (nextProps) => { 
        console.log("componentWillReceiveProps ");
        this.loadData(nextProps)
    } 

    onPress = (item) => {
        Actions.push("foodcard",{item:item,firstTime:false});
    }

    loadData = (props) => {
       data=[]; 
       let array=props.foodArray;
       array.map((item, i) => {
   
        data.push(
            <TouchableHighlight
            onPress = {() => this.onPress(item)}
            underLayColor="transparent"
            >
            <View>   
            <Card key={i} flexDirection='row'>
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

    Complete = () => {
        Actions.home();
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

                    {
                    (this.props.foodArray.length == 0) ? <View></View> : 
                    <View style={{backgroundColor:"white", height:"75%"}}>

                              {data}
                                 
                    </View>   
                    } 

                    {
                    (this.props.foodArray.length == 0) ? <View></View> : 
                      <View style={{backgroundColor:"white"}}>  
                      <Card>
                                    <Button
                                    title='Complete Diary' 
                                    backgroundColor="blue"
                                    onPress={this.Complete}
                                    />
                            </Card> 
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
