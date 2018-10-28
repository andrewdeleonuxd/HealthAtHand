import React,{Component} from 'react';
import _ from 'lodash';
import {View, Text, FlatList, Image, TouchableHighlight} from 'react-native'
import { Card, Header, Icon , SearchBar, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {initializeExercise} from '../actions';

var data=[];

class ExerciseLog extends Component {

    state = {

    }

    componentWillMount = () => {

        if(this.props.exerciseArray.length == 0){
         //   this.props.initializeExercise(obj,this.props.exerciseArray);
            this.loadData(this.props); 

        } else{
            this.loadData(this.props);
        }

    }


    componentWillReceiveProps = (nextProps) => { 
        this.loadData(nextProps)
    } 

    onPress = (item) => {
        Actions.push("addexercise",{item:item});
    }

    loadData = (props) => {
       data=[]; 
       let array=props.exerciseArray;
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
                }}>Exercise {item.exerciseNo}</Text>
            </Card>
            </View>
            </TouchableHighlight>
        )
    })
       
    } 


    goBack = () => {
        Actions.home();
    }


    addExercisePg = () => {
          let newObj={'exerciseNo':this.props.exerciseArray.length + 1,'exercise':[]};   
        Actions.push("addexercise",{type:"addexercise",item:newObj});
                       
    }


    Complete = () => {
        Actions.home();
    }

    render = () => {
        let addExercise = (
            <Icon
                name='add-box'
                underlayColor={"transparent"}
                color="white"
                marginTop={50}
                onPress = {this.addExercisePg}
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
                    centerComponent={{ text: 'Exercise Log', style: { color: '#fff',fontSize:17 }}}
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



const mapStateToProps = state => {
    return {
        exerciseArray: state.exercise.exerciseArray
    };
};

<<<<<<< HEAD
export default connect(mapStateToProps, {initializeExercise}) (ExerciseLog);
=======
export default connect(mapStateToProps, {initializeExercise}) (ExerciseLog);
>>>>>>> vishal
