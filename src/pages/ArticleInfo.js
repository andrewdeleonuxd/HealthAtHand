import React,{Component} from 'react'
import {View, Text, Image, ActivityIndicator} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {  Header, Icon } from 'react-native-elements'


class ArticleInfo extends Component {
    componentWillMount = () => {
        this.setState({news:[],showLoader:true})
    }

    componentDidMount = () => {

            this.setState({news:this.props.item,showLoader:false})
        
    }

    goBack = () => {
        Actions.pop();
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
                    centerComponent={{ text: "Article", style: { color: '#fff',fontSize:15 }}}
                />
                {
                    (this.state.showLoader == true) ? <ActivityIndicator size="large" color="#0000ff" /> : <View style={{backgroundColor:"white", height:"100%"}}>
                        <Image source={{uri:this.state.news.urlToImage || "http://www.blackbell.com.ng/ui/images/img_not_found.jpg"}} style={{height: "35%"}} resizeMode="contain"/>
                        <View style={{borderBottomColor: '#0F084B',
                            borderBottomWidth: 1,marginTop:5}} />
                        <Text style = {{fontSize:15, height:"50%"}}>{this.state.news.description}</Text>
                    </View>
                }
            </View>
        )
    }
}

export default ArticleInfo;