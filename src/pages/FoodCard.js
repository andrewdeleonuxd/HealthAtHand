import React,{Component} from 'react'
import {View, Text, Image, ActivityIndicator} from 'react-native'
import {Actions} from 'react-native-router-flux'
import { Card, Header, Icon } from 'react-native-elements'
//import NumberInput from 'rn-number-input';

class FoodCard extends Component {

    state ={
        showLoader:false
        
    }

    componentWillMount = () => {
        this.setState({news:[],showLoader:true})
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
                    centerComponent={{ text: this.state.news.title, style: { color: '#fff',fontSize:15 }}}
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
                                         marginBottom: 5
                                     }}>ServingSize</Text>
                                     
                             
                                 </Card>

                    </View>

                     
                }
            </View>
        )
    }
}

export default FoodCard;