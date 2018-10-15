import React,{Component} from 'react';
import {View, TextInput, Picker, ActivityIndicator, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import { Card, Header, Icon, Button } from 'react-native-elements';
import {addexercise,removeexercise} from '../actions';
import NumericInput,{ calcSize } from 'react-native-numeric-input';


//import NumberInput from 'rn-number-input';

class ExerciseCard extends Component {

    state ={
        showLoader:false,
        intensity:"1",
        itemName:"",
        duration:"1",
        type:"Strength",
        numeric:"1"
    }

    componentWillMount = () => {
        if(this.props.firstTime){
            this.setState({showLoader:true});
        } else{
            this.setState({showLoader:true,intensity:this.props.item.intensity,type:this.props.item.type,duration:this.props.item.duration});
        }
    }


    

    componentDidMount = () => {
        console.log("inside componentDidMount :",this.props);
        if(this.props.firstTime){
            this.setState({
                showLoader:false,
            })
        } else{
            this.setState({
                showLoader:false,
                itemName: this.props.item.itemName,
                intensity:this.props.item.intensity,
                type:this.props.item.type,
                duration:this.props.item.duration
            })
        }
      
    }

    goBack = () => {
        Actions.addexercise();
    } 

    Add = () => {
        let obj={
            id:this.state.itemName,
            itemName:this.state.itemName,
            type:this.state.type,
            intensity:this.state.intensity,
            duration:this.state.duration
        }
        

        this.props.addexercise(obj,this.props.exerciseArray,this.props.firstTime);
    }

    onRemove = () => {
        let obj={
            id:this.state.itemName,
            itemName:this.state.itemName,
            type:this.state.type,
            intensity:this.state.intensity,
            duration:this.state.duration
        }
        this.props.removeexercise(obj,this.props.exerciseArray);
    }

    onExerciseChange = (text) =>{
        this.setState({ itemName:text });   
      }

    render = () => {

        let check = (
            <Icon
                name='check'
                underlayColor={"transparent"}
                color="white"
                marginTop={50}
                onPress = {this.Add}
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
            <ScrollView>
                <Header
                    outerContainerStyles={{height:60,backgroundColor:"#0F084B"}}
                    leftComponent={backButton}
                    centerComponent={{ text: "Add Exercise", style: { color: '#fff',fontSize:15 }}}
                    rightComponent={check}
                />
                {
                    (this.state.showLoader == true) ? <ActivityIndicator size="large" color="#0000ff" /> : 
                    <ScrollView style={{backgroundColor:"white", height:"100%"}}>

                                <Card>
                                     <TextInput style={{
                                         color: "maroon",
                                         fontSize: 15,
                                         marginBottom: 5
                                     }} 
                                     placeholder="name"
                                     label="Exercise"
                                     onChangeText={this.onExerciseChange.bind(this)}
                                     value={this.state.itemName}
                                     />
                                 </Card>
                                 <Card flexDirection='column'>
                                        <Text style={{
                                            color: "maroon",
                                            fontSize: 15,
                                            marginBottom: 5,
                                        }}>type</Text>
                                        <Picker selectedValue={this.state.type} onValueChange={value => this.setState({type:value})} >
                                            <Picker.Item label="Cardiovascular" value="Cardiovascular" />
                                            <Picker.Item label="Strength" value="Strength" />
                                        </Picker>    
                                 </Card>
                                 <Card flexDirection='column'>
                                        <Text style={{
                                            color: "maroon",
                                            fontSize: 15,
                                            marginBottom: 5,
                                        }}>intensity</Text>
                                        <Picker selectedValue={this.state.intensity} onValueChange={value => this.setState({intensity:value})} >
                                            <Picker.Item label="1" value="1" />
                                            <Picker.Item label="2" value="2" />
                                            <Picker.Item label="3" value="3" />
                                            <Picker.Item label="4" value="4" />
                                            <Picker.Item label="5" value="5" />
                                        </Picker>    
                                 </Card>
                                 <Card flexDirection='column'>
                                        <Text style={{
                                            color: "maroon",
                                            fontSize: 15,
                                            marginBottom: 5,
                                        }}>duration</Text>
                                        <Picker selectedValue={this.state.duration} onValueChange={value => this.setState({duration:value})} >
                                            <Picker.Item label="1" value="1" />
                                            <Picker.Item label="2" value="2" />
                                            <Picker.Item label="3" value="3" />
                                            <Picker.Item label="4" value="4" />
                                            <Picker.Item label="5" value="5" />
                                        </Picker>    
                                 </Card>

                                <Card>
                                <TextInput style={{
                                         color: "maroon",
                                         fontSize: 15,
                                         marginBottom: 5
                                     }} 
                                     keyboardType = 'numeric'
                                     placeholder="name"
                                     label="Exercise"
                                     onChangeText={this.onExerciseChange.bind(this)}
                                     value={this.state.itemName}
                                     />
                
                                </Card>
                                                         
                                 <Card>
                                    <Button
                                    title='Remove' 
                                    disabled={this.props.firstTime}
                                    backgroundColor="blue"
                                    onPress={this.onRemove}
                                    />
                                 </Card>
                               


                    </ScrollView>

                     
                }
            </ScrollView>
        )
    }
}


const mapStateToProps = state => {
    return {
        exerciseArray: state.exercise.exerciseArray
    };
};

export default connect(mapStateToProps, {addexercise,removeexercise}) (ExerciseCard);