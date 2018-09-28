import React , {Component } from 'react';
import {connect} from 'react-redux';
import {employeeCreate} from '../actions';
import {Card, CardSection, Input} from './common';

class Home extends Component {
    render(){
        return(
            <Card> 
                
                <CardSection>
                <Input
                        label="Name"
                        placeholder="Jane"
                        value="whoathischanged"
                       
                    /> 
                </CardSection>
            </Card>     
        );
    }
}

const mapStateToProps = (state) => {
    
    return state;
};


export default connect(mapStateToProps, {employeeCreate}) (Home);