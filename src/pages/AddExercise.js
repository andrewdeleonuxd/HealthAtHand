import React,{Component} from 'react';
import _ from 'lodash';
import {View, Text, FlatList, Image, TouchableHighlight} from 'react-native'
import { Card, Header, Icon , SearchBar, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {initializeExercise} from '../actions';

var data=[];

class AddExercise extends Component {

    state = {
        publicationsData:[],
        count:0,
        showLoader:true,
        showSearch:false,
        searchText:"", 

    }

    componentWillMount = () => {

        let obj={
            id:"bench-press",
            itemName:"bench-press",
            type:"strength",
            intensity:"3",
            duration:"4"
        }

        if(this.props.exerciseArray.length == 0){
            this.props.initializeExercise(obj,this.props.exerciseArray);
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
        Actions.push("exercisecard",{item:item,firstTime:false});
    }

    loadData = (props) => {
       data=[]; 
       let array=props.exerciseArray;
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
                }}>{item.duration}</Text> 
            </Card>
            </View>
            </TouchableHighlight>
        )
    })
       
    } 


    goBack = () => {
        Actions.home();
    }

    createExercise = () => {
        Actions.push("exercisecard",{firstTime:true});      
    }

    Complete = () => {
        Actions.home();
    }

    render = () => {
        let addExercise = (
            <Icon
                name='dumbbell'
                underlayColor={"transparent"}
                color="white"
                marginTop={50}
                onPress = {this.createExercise}
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
                    rightComponent={addExercise}
                />
              

                    {
                    (this.props.exerciseArray.length == 0) ? <View></View> : 
                    <View style={{backgroundColor:"white", height:"75%"}}>

                              {data}
                                 
                    </View>   
                    } 

                    {
                    (this.props.exerciseArray.length == 0) ? <View></View> : 
                      <View style={{backgroundColor:"white"}}>  
                      <Card>
                                    <Button
                                    title='Done' 
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


const mapStateToProps = state => {
    return {
        exerciseArray: state.exercise.exerciseArray
    };
};

export default connect(mapStateToProps, {initializeExercise}) (AddExercise);
