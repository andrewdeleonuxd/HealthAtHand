import React,{Component} from 'react'
import {View, Text, Picker, ActivityIndicator} from 'react-native'
import {Actions} from 'react-native-router-flux'
import { Card, Header, Icon } from 'react-native-elements'
//import NumberInput from 'rn-number-input';

class FoodCard extends Component {

    state ={
        showLoader:false,
        servingSize:1,
        news:[]
    }

    componentWillMount = () => {
        this.setState({showLoader:true})
    }

    componentDidMount = () => {

            this.setState({news:this.props.item,showLoader:false})
        
    }

    goBack = () => {
        Actions.addfood();
    } 

    render = () => {

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
                />
                {
                    (this.state.showLoader == true) ? <ActivityIndicator size="large" color="#0000ff" /> : 
                    <View style={{backgroundColor:"white", height:"100%"}}>

                                <Card>
                                     <Text style={{
                                         color: "maroon",
                                         fontSize: 15,
                                         marginBottom: 5
                                     }}>Name</Text>
                                 </Card>
                                 <Card style={{flexDirection:'column'}}>
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

                    </View>

                     
                }
            </View>
        )
    }
}



export default FoodCard;