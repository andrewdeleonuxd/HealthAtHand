import React , {Component } from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {  Header, Tile  } from 'react-native-elements';
import {Card, CardSection, Input, Button, Spinner} from './common';
import {emailChanged, passwordChanged, loginUser } from '../actions';

import {colors, fonts, padding, dimensions, margin} from '../styles/base.js'
import { } from 'react-native'

class LoginForm extends Component {
    onEmailChange(text){
      this.props.emailChanged(text);    
    }

    onPasswordChange(text){
        this.props.passwordChanged(text);
    }

    onButtonPress(){
        const {email, password} = this.props;

        this.props.loginUser({email,password});
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
                <View style = {styles.signInView}>
                    <Button
                        objStyle = {styles.signInButton}
                        textStyle = {styles.signInText}
                        onButtonPress={this.onButtonPress.bind(this)}
                        title='Sign in'>
                        Sign in
                    </Button>
                </View>
            );
        }
    }

    render(){
        return(
            <View style = {{flex: 1}}>
                <Header
                    outerContainerStyles={{ height:60,backgroundColor: colors.secondary }}
                    centerComponent={{ text: "HAH Login", style: { color: '#fff', fontSize: fonts.md}}}
                />
                <View
                    style = {styles.blankSpace}
                />
                <View style = {styles.loginInput}>
                    <Card style = {styles.loginCards}>
                        <CardSection>
                            <Input
                                label="Email"
                                placeholder="Email" 
                                placeholderTextColor = '#000'
                                onChangeText={this.onEmailChange.bind(this)}
                                value={this.props.email}/>
                        </CardSection>   
                        <CardSection>
                            <Input
                                secureTextEntry
                                label="Password"
                                placeholder="Password"
                                placeholderTextColor = '#000'
                                onChangeText={this.onPasswordChange.bind(this)}
                                value={this.props.password}/>
                        </CardSection>                
                    </Card>
                    {this.renderError()}
                    {this.renderButton()}
                </View>
                <View style = {styles.header2}>
                </View>
            </View>   
        );
    }
}

const styles = {
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
        flex: 3,
        backgroundColor: colors.primary,
    },
    loginCards:{
        marginLeft: margin.md,
        marginRight: margin.md,
    },
    loginContainers:{
        backgroundColor: colors.tertiary
    },
    signInButton:{
        marginTop: margin.md,
        marginLeft: margin.md,
        marginRight: margin.md,
        marginBottom: margin.md,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: colors.secondary,
        borderColor: colors.secondary,
    },
    signInText:{
        fontSize: fonts.md,
        fontWeight: '600',
        color: '#fff',
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
    }
};

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error:state.auth.error,
        loading:state.auth.loading
    };
};

export default connect(mapStateToProps, {emailChanged,passwordChanged,loginUser}) (LoginForm);
