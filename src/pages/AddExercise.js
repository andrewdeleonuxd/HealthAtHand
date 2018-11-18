import React,{Component} from 'react';
import _ from 'lodash';
import {View, Text, FlatList, Image, TouchableHighlight} from 'react-native'
import { Card, Header, Icon , SearchBar, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {initializeExercise } from '../actions';

var data=[];

class AddExercise extends Component {

    state = {
        showLoader:true,
        showSearch:false, 
        searchText:""
    }

    componentWillMount = () => {
       /*
        if(this.props.item.exercise.length == 0){
         //   this.props.initializeExercise(obj,this.props.exerciseArray);
            this.loadData(this.props); 

        } else{
            this.loadData(this.props);
        }

        */
        this.loadData(this.props); 


    }


    componentWillReceiveProps = (nextProps) => { 
        this.loadData(nextProps)
    } 

    onPress = (item) => {
      //  Actions.push("exercisecard",{item:item,firstTime:false,exerciseNo:this.props.item.exerciseNo,onBack:this.props.item});
      Actions.push("exercisecard",{item:item,firstTime:false,onBack:this.props.item});
    }

    loadData = (props) => {
        /*
       data=[]; 
       let array=this.props.item;
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
                }}>{item.duration}</Text> 
            </Card>
            </View>
            </TouchableHighlight>
        )
    })
    
}
   */    
    } 


    goBack = () => {
        Actions.exerciselog();
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
      //  Actions.push("searchexercise",{text:this.state.searchText,exerciseNo:this.props.item.exerciseNo,onBack:this.props.item});
      Actions.push("searchexercise",{text:this.state.searchText,onBack:this.props.item});
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
                    centerComponent={{ text: 'Add Exercise', style: { color: '#fff',fontSize:17 }}}
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
        exerciseArray: state.exercise.exerciseArray
    };
};

export default connect(mapStateToProps, {initializeExercise}) (AddExercise);

