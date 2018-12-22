import React,{Component} from 'react';
import {View, TextInput, Picker, ActivityIndicator, Text,  StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import { Card, Header, Icon, Button } from 'react-native-elements';
import {addexercise,removeexercise} from '../actions';
import NumericInput,{ calcSize } from 'react-native-numeric-input';
import RNPickerSelect from 'react-native-picker-select';
import { HaH_Header, HaH_NavBar } from '../components/common';
import {colors, margin, padding, fonts, button} from '../styles/base.js'

var items1 = [
    {label:"10", value:"10"},
    {label:"20", value:"20"},
    {label:"30", value:"30"},
    {label:"40", value:"40"},
    {label:"50", value:"50"},
    {label:"60", value:"60"},
    {label:"70", value:"70"},
    {label:"80", value:"80"},
    {label:"90", value:"90"},
    {label:"100", value:"100"},
    {label:"110", value:"110"},
    {label:"120", value:"120"},
    {label:"130", value:"130"},
    {label:"140", value:"140"},
    {label:"150", value:"150"},
    {label:"160", value:"160"},
    {label:"170", value:"170"},
    {label:"180", value:"180"},
    {label:"190", value:"190"},
    {label:"200", value:"200"},
    {label:"210", value:"210"},
    {label:"220", value:"220"},
    {label:"230", value:"230"},
    {label:"240", value:"240"},
]

var items2 = [
    {label:"Low", value:"Low"},
    {label:"Medium", value:"Medium"},
    {label:"High", value:"High"},
]

class ExerciseCard extends Component { 

    state ={
        showLoader:false,
        intensity:"Low",
        exName:"",
        exid:null,
        duration:"10",
    }

    componentWillMount = () => {
        console.log("I am hererrerereeeeeeeee");
        if(this.props.firstTime){
            this.setState({showLoader:true,
                intensity:this.props.item.intensity,
                duration:""+this.props.item.duration,
                exName:this.props.item.exName,
                exid:this.props.item.exid});
        } else{
            this.setState({
                showLoader:true,
                intensity:this.props.item.intensity,
                duration:""+this.props.item.duration,
                exName:this.props.item.exName,
                exid:this.props.item.exid
            });
        }
    }


    
 
    componentDidMount = () => {
        if(this.props.firstTime){
            this.setState({
                showLoader:false,
                intensity:this.state.intensity,
                duration:""+this.state.duration,
                exName:this.state.exName,
                exid:this.state.exid
            })
        } else{
            this.setState({
                showLoader:false,
                exName: this.state.exName,
                exid:this.state.exid,
                intensity:this.state.intensity,
                duration:""+this.state.duration
            })
        }
      
    }



    goBack = () => {
       Actions.exerciselog();
    } 

    Add = () => {
        if(this.props.firstTime){
        let obj={
            exid:this.state.exid,
            exName:this.state.exName ,
            intensity:this.state.intensity,
            duration:this.state.duration 
        }

        console.log("I am here ##########");

        this.props.addexercise(obj,this.props.firstTime,this.props.userId,this.props.date);
        } else{
            let obj={
                exid:this.state.exid,
                exName:this.state.exName,
                intensity:this.state.intensity,
                duration:this.state.duration 
            }
            console.log("Before sending obj is :",obj);
            
              this.props.addexercise(obj,this.props.firstTime,this.props.userId,this.props.date);
        }

    }

    // when user wants to delete a exercise
    onRemove = () => {
        let obj={
            exid:this.state.exid,
            exName:this.state.exName,
            intensity:this.state.intensity,
            duration:this.state.duration 
        }
          this.props.removeexercise(obj,this.props.userId,this.props.date);
    }

    capitalize(str) {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    titleLabel() {
        (this.props.firstTime == true) ? label = "Add Exercise" : label = "Edit Exercise"
        return label
    }

    confirmLabel() {
        (this.props.firstTime == true) ? label = "Add Exercise to Log" : label = "Confirm Changes"
        return label
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
            <View style = {{flex: 1}}>
            <HaH_Header
                left = {backButton}
                text = {this.titleLabel()}
            />
            <View style = {{flex: 1}}>
            {
                (this.state.showLoader == true) ? <ActivityIndicator size="large" color="#0000ff" /> : 
                <View style={{flex: 1, paddingTop: '2%', paddingBottom: '2%'}}>
                    <Card
                        containerStyle = {styles.cardContainer}
                        wrapperStyle = {styles.cardWrapper}>
                        <Text style = {styles.cardHeader}>
                            {this.capitalize(this.state.exName)}
                        </Text>
                    </Card>
                    <View style={{flex: 1, paddingTop: '3%'}}>
                        <View style={styles.userInputs}>
                            <Text style={styles.userInputText}>
                                Duration
                                <Text style={styles.servingSizeUnit}>
                                    {" (min)"}
                                </Text>
                            </Text>
                            <View style = {{height: 40, width: 130, backgroundColor: colors.brandgrey, borderRadius: 7, alignItems: 'center', justifyContent: 'center'}}>
                            {/*
                                <Picker
                                    style={{height: 40, width: 130, marginRight: 0}}
                                    itemStyle =  {{fontSize: 25, fontFamily: fonts.primary, color: colors.brandblue, textAlign:'right', alignSelf: "flex-end", justifyContent: 'flex-end', padding: 0, width: 60}}
                                    selectedValue={this.state.duration}
                                    onValueChange={value => this.setState({duration:value})}>
                                    <Picker.Item label="10" value="10" />
                                    <Picker.Item label="20" value="20" />
                                    <Picker.Item label="30" value="30" />
                                    <Picker.Item label="40" value="40" />
                                    <Picker.Item label="50" value="50" />
                                    <Picker.Item label="60" value="60" />
                                    <Picker.Item label="70" value="70" />
                                    <Picker.Item label="80" value="80" />
                                    <Picker.Item label="90" value="90" />
                                    <Picker.Item label="100" value="100" />
                                    <Picker.Item label="110" value="110" />
                                    <Picker.Item label="120" value="120" />
                                    <Picker.Item label="130" value="130" />
                                    <Picker.Item label="140" value="140" />
                                    <Picker.Item label="150" value="150" />
                                    <Picker.Item label="160" value="160" />
                                    <Picker.Item label="170" value="170" />
                                    <Picker.Item label="180" value="180" />
                                    <Picker.Item label="190" value="190" />
                                    <Picker.Item label="200" value="200" />
                                    <Picker.Item label="210" value="210" />
                                    <Picker.Item label="220" value="220" />
                                    <Picker.Item label="230" value="230" />
                                    <Picker.Item label="240" value="240" />
                                </Picker>
                            */}
                            <RNPickerSelect
                                items={items1}
                                onValueChange={(value) => {
                                    this.setState({
                                        duration: value,
                                    });
                                }}
                                value={this.state.duration}
                            />
                            </View>
                        </View>
                        <View style={styles.userInputs}>
                            <Text style={styles.userInputText}>
                                Intensity
                            </Text>
                            <View style = {{height: 40, width: 130, backgroundColor: colors.brandgrey, borderRadius: 7, alignItems: 'center', justifyContent: 'center'}}>
                            {/*
                                <Picker
                                    style={{height: 40, width: 130, marginRight: 0}}
                                    itemStyle =  {{fontSize: 25, fontFamily: fonts.primary, color: colors.brandblue, textAlign:'right', alignSelf: "flex-end", justifyContent: 'flex-end', padding: 0, width: 60}}
                                    selectedValue={this.state.intensity}
                                    onValueChange={value => this.setState({intensity:value})}>
                                    <Picker.Item label="Low" value="Low" />
                                    <Picker.Item label="Medium" value="Medium" />
                                    <Picker.Item label="High" value="High" />
                                </Picker>
                            */}
                                <RNPickerSelect
                                    items={items2}
                                    onValueChange={(value) => {
                                        this.setState({
                                            intensity: value,
                                        });
                                    }}
                                    value={this.state.intensity}
                                />      
                            </View>
                        </View>                            
                    </View>                    
                    {
                        (this.props.firstTime == true) ? <View/>:
                        <View style={{paddingLeft: '4%', paddingRight: '4%', paddingTop: '2%', paddingBottom: '2%'}}>
                            <TouchableOpacity
                                style = {[button.touchable, {backgroundColor: 'red'}]}
                                onPress={this.onRemove}>
                                <View style={button.view}>
                                    <Text style = {styles.deleteText}>
                                        Delete Exercise
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={{paddingLeft: '4%', paddingRight: '4%', paddingTop: '2%', paddingBottom: '2%'}}>
                        <TouchableOpacity
                            style = {[button.touchable, {backgroundColor: colors.brandgold}]}
                            onPress = {this.Add}>
                            <View style={button.view}>
                                <Text style = {styles.confirmText}>
                                    {this.confirmLabel()}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            </View>
            <HaH_NavBar
                selected={3}
            />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    cardHeader: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: fonts.primary, 
        color: colors.primary
    },
    cardContainer: {
        padding: 4,
        elevation: 7,
        borderRadius: 10
    },
    cardWrapper: {        
        alignItems: 'center'
    },
    userInputs: {
        flexDirection: 'row',
        paddingLeft: '8%',
        paddingRight: '8%',
        justifyContent: 'space-between',
        paddingBottom: '1%'
    },
    userInputText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left',
        fontFamily: fonts.primary, 
        color: colors.primary,
        //backgroundColor: "red",
        paddingTop: '2%',
    },
    servingSizeQty: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: fonts.primary, 
        color: colors.brandblue,
        textAlign:'right',
        alignSelf: 'flex-end',
    },
    servingSizeUnit: {
        fontSize: 15,
        fontFamily: fonts.primary, 
        color: colors.brandgrey,
        textAlign:'right',
        alignSelf: 'flex-end',
    },
    userInput: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'right',
        fontFamily: fonts.primary, 
        color: colors.primary,
        paddingLeft: 35,
        paddingRight: 10,
        justifyContent: 'center',
        
        //backgroundColor: "red",
    },
    confirmButton: {
		backgroundColor: colors.brandgold,
		borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 7,
    },
    confirmText: {
        flex: 1,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: fonts.primary, 
        color: colors.brandwhite,
        textAlignVertical: 'center',
    },
    deleteButton: {
		backgroundColor: 'red',
		borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center', 
        elevation: 7
    },
    deleteText: {
        flex: 1,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: fonts.primary, 
        color: colors.brandwhite,
        textAlignVertical: 'center',
    },
});

const mapStateToProps = state => {
    return {
        exerciseArray: state.exercise.exerciseArray,
        userId: state.auth.userId,
        date : state.auth.date 
    };
};

export default connect(mapStateToProps, {addexercise,removeexercise}) (ExerciseCard);


