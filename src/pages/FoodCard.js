import React,{Component} from 'react'
import {View, Text, Picker, ActivityIndicator,TextInput} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux'
import { Card, Header, Icon, Button } from 'react-native-elements';
import {addfood,removefood} from '../actions';
import _ from 'lodash';


//import NumberInput from 'rn-number-input';
 
class FoodCard extends Component {

    state ={
        showLoader:false,
        servingSize:"1",
        itemName:"",
        Calories:""
    }

    componentWillMount = () => {
        
        if(this.props.firstTime){
            this.setState({showLoader:true});
        } else{
            this.setState({showLoader:true,servingSize:this.props.item.servingSize,Calories:this.props.item.Calories});
        }
    }


    

    componentDidMount = () => {
        if(this.props.firstTime){
            this.setState({
                showLoader:false,
                itemName:this.props.item.author ,
                Calories:5
            })
        } else{
            this.setState({
                showLoader:false,
                itemName: this.props.item.itemName,
                Calories:this.props.item.Calories,
                servingSize:this.props.item.servingSize
            })
        }
      
    }

    goBack = () => {

        Actions.push("addfood", {item:this.props.onBack});
    } 

    Add = () => {
        let obj={
            id:this.state.itemName,
            itemName:this.state.itemName,
            totalCalories:this.state.Calories*this.state.servingSize,
            Calories:this.state.Calories,
            servingSize:this.state.servingSize
        }
        

        this.props.addfood(obj,this.props.mealNo,this.props.foodArray,this.props.firstTime);
    }

    onRemove = () => {
        let obj={
            id:this.state.itemName,
            itemName:this.state.itemName,
            totalCalories:this.state.Calories*this.state.servingSize
        }
        this.props.removefood(obj,this.props.mealNo,this.props.foodArray);
    }

    onservingSizeChange = (text) =>{
        let newText = '';
        let numbers = '0123456789';

        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                Alert.alert("please enter numbers only");
            }
        }
        this.setState({ servingSize:newText });   
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
            <View>
                <Header
                    outerContainerStyles={{height:60,backgroundColor:"#0F084B"}}
                    leftComponent={backButton}
                    centerComponent={{ text: "Add Food", style: { color: '#fff',fontSize:15 }}}
                    rightComponent={check}
                />
                {
                    (this.state.showLoader == true) ? <ActivityIndicator size="large" color="#0000ff" /> : 
                    <View style={{backgroundColor:"white", height:"100%"}}>

                                <Card>
                                     <Text style={{
                                         color: "maroon",
                                         fontSize: 15,
                                         marginBottom: 5
                                     }}>{this.state.itemName}</Text>
                                 </Card>
                   
                                 <Card flexDirection='row'>
                               
                                 <Text style={{
                                            color: "maroon",
                                            fontSize: 15,
                                            marginBottom: 5
                                        }}>ServingSize</Text>        
                                <TextInput  
                                     keyboardType = 'numeric'
                                     style={{  color:'maroon',
                                     paddingRight:5,
                                     paddingLeft:15,
                                     fontSize:15,
                                     lineHeight:23,
                                     marginLeft:"60%"
                                     }}
                                     onChangeText={this.onservingSizeChange.bind(this)}
                                     value={this.state.servingSize}
                                     />
                
                                </Card>
                                 <Card flexDirection='row'>
                                        <Text style={{
                                            color: "maroon",
                                            fontSize: 15,
                                            marginBottom: 5,
                                        }}>Calories</Text>
                                       <Text style={{
                                            color: "maroon",
                                            fontSize: 15,
                                            marginBottom: 5,
                                            marginLeft:"72%"
                                        }}>{this.state.Calories}</Text> 
                                 </Card>
                                 <Card flexDirection='row'>
                                        <Text style={{
                                            color: "maroon",
                                            fontSize: 15,
                                            marginBottom: 5,
                                        }}>Total Calories</Text>
                                       <Text style={{
                                            color: "maroon",
                                            fontSize: 15,
                                            marginBottom: 5,
                                            marginLeft:"60%"
                                        }}>{this.state.Calories*this.state.servingSize}</Text> 
                                 </Card>
                                 
                                 <Card>
                                    <Button
                                    title='Remove' 
                                    disabled={this.props.firstTime}
                                    backgroundColor="blue"
                                    onPress={this.onRemove}
                                    />
                                 </Card>
                               


                    </View>

                     
                }
            </View>
        )
    }
}



//export default FoodCard;

const mapStateToProps = state => {
    return {
        foodArray: state.food.foodArray
    };
};

export default connect(mapStateToProps, {addfood,removefood}) (FoodCard);

/*
              <Card flexDirection='column'>
                                        <Text style={{
                                            color: "maroon",
                                            fontSize: 15,
                                            marginBottom: 5,
                                        }}>ServingSize</Text>
                                       <Picker selectedValue={this.state.servingSize} onValueChange={value => this.setState({servingSize:value})} >
                                            <Picker.Item label="1" value="1" />
                                            <Picker.Item label="2" value="2" />
                                            <Picker.Item label="3" value="3" />
                                            <Picker.Item label="4" value="4" />
                                            <Picker.Item label="5" value="5" />
                                            <Picker.Item label="6" value="6" />
                                            <Picker.Item label="7" value="7" />
                                            <Picker.Item label="8" value="8" />
                                            <Picker.Item label="9" value="9" />
                                            <Picker.Item label="10" value="10" />
                                        </Picker>    
                                 </Card>
*/