import React , {Component } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {HaH_Header} from '../components/common';
import {Card, CardSection, Input, Spinner} from 'react-native-elements'
import {emailChanged, passwordChanged, loginUser } from '../actions'; 

import {colors, fonts, padding, dimensions, margin} from '../styles/base.js'
import { Actions } from 'react-native-router-flux';

class LoginForm extends Component {
    componentWillMount = () => {
        Actions.login({type: 'replace'})
    }

    componentWillReceiveProps = (nextProps) => {
      /*  
       if(nextProps.userId != null){
           Actions.home();
       }
*/
    }
    onEmailChange(text){
        this.props.emailChanged(text);         
    }
 
    onPasswordChange(text){
        this.props.passwordChanged(text);
    }

    onButtonPress(){
        const {email, password} = this.props;

        this.props.loginUser({email,password});

       // Actions.home();
    } 

    renderError(){
        if(this.props.error){
            return(
                <View style={styles.signInError}>
                    <Text style={styles.errorTextStyle}> 
                       {this.props.error}
                    </Text>
                </View>
            )
        }
    }

    renderButton(){
        
        if(this.props.loading){
           return<Spinner size="large"/> 
        } else {
            return(
                <TouchableOpacity           
                    style = {{paddingBottom: 7}}
                    onPress = {this.onButtonPress.bind(this)}
                    underLayColor="transparent">
                    <Card
                        containerStyle = {styles.signInContainer}>
                        <Text style = {styles.signInText}>
                            Sign in
                        </Text>
                    </Card>
                </TouchableOpacity>
            );
        }
    }

    render(){
        return(
            <View style = {{flex: 1}}>
                <HaH_Header
                    text = "Health At Hand">
                </HaH_Header>
                <View style = {styles.loginInput}>
                    <View
                        style = {styles.loginContainer}>
                        <Input
                            underlineColorAndroid='rgba(0,0,0,0)'
                            placeholder="Email" 
                            placeholderTextColor = '#000'
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.email}/>
                    </View>   
                    <View
                        style = {styles.loginContainer}>
                        <Input
                            underlineColorAndroid='rgba(0,0,0,0)'
                            secureTextEntry
                            placeholder="Password"
                            placeholderTextColor = '#000'
                            onChangeText={this.onPasswordChange.bind(this)}
                            value={this.props.password}/>
                    </View>
                    {this.renderError()}
                    {this.renderButton()}
                </View>
            </View>   
        );
    }
}

const styles = {
    cardHeader: {
        flex: 3,
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: fonts.primary, 
        color: colors.primary,
        textAlign:'left',
        marginRight: 25,
        alignSelf: 'center',
        paddingLeft: 15
    },
    loginContainer: {
        marginTop: 0,
        elevation: 7,
        backgroundColor: colors.brandwhite,
        borderColor: colors.brandblue,
        borderWidth: 1
    },
    cardWrapper: {
        flexDirection: 'row',
        flex: 1,
        marginLeft: 0
    },
    blankSpace:{
        backgroundColor: colors.primary,
        flex: 4
    },
    errorTextStyle:{
        fontSize:20,
        alignSelf:'center',
        color:'red'
    },
    header:{
        flex: 4,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        text: "HAH Login",
        style:{
            color: '#fff',
            fontSize: fonts.lg
        }
    },
    header2:{
        flex: 2,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
        //headerText: "Health on Hand"
    },
    loginInput:{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.brandblue,
        paddingLeft: '2%',
        paddingRight: '2%'
    },
    loginCards:{
        marginLeft: margin.md,
        marginRight: margin.md,
    },
    loginContainers:{
        backgroundColor: colors.tertiary
    },
    signInButton:{
        height: 60,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: colors.secondary,
        borderColor: colors.secondary,
    },
    signInText:{
        fontSize: fonts.md,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center'
    },
    signInView:{
        //flex: 1,
        justifyContent:'flex-start',
        flexDirection:'row',
        borderWidth: 0
    },
    signInError:{
        borderWidth: 0,
        backgroundColor: colors.tertiary
    },
    signInContainer:{
        backgroundColor: colors.brandgold,
        borderRadius: 10,
        borderColor: colors.brandgold
    }
};

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error:state.auth.error,
        loading:state.auth.loading,
        userId: state.auth.userId
    };
};

export default connect(mapStateToProps, {emailChanged,passwordChanged,loginUser}) (LoginForm);
