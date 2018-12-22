import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux';

import { Header, SearchBar } from 'react-native-elements';
import { Card, ListItem, Button, Icon, ButtonGroup } from 'react-native-elements';

import { VictoryLine, VictoryLabel, VictoryGroup, VictoryAxis, VictoryVoronoiContaine, VictoryCursorContainer } from "victory-native";

import {colors, margin, padding, fonts, button} from '../styles/base.js'
import {report, reportPost, reportPut} from '../actions';
import { HaH_Header, HaH_NavBar } from '../components/common/index.js';
import Moment from 'moment';

import testResponse from '../testdata/report.json'

const userWeight = [];
const today = Moment.utc(Moment().format('YYYY-MM-DD'));

class ReportCard extends React.Component {

	state = {
		curWeight: "",
		userWeightState: userWeight,
		shownData: {},
		category: 0,
		shownColor: false,
		hasNoData: true
	}

	componentDidUpdate(prevProps) {
		if (this.props.reportData !== prevProps.reportData) {
			if(this.props.reportData.length != 0)
			{
				userWeight = this.props.reportData;
				for(i = 0; i < userWeight.length; i++)
				{
					userWeight[i].date = new Date(this.props.reportData[i].date)
				}
				this.setState({
					curWeight: userWeight[userWeight.length - 1].weight.toString(),
					userWeightState: this.changeDomain(userWeight, this.state.category)
				});
			}
		}
	  }

	componentWillMount = () => {
		this.props.report(this.props.userId);
	}

	reformat(data)
	{
		for(i = 0; i < data; i++)
		{
			data[i].date = new Date(data[i].date)
		}
		return data;
	}

	changeDomain(weights, category) {
		min = today;
		max = Moment(today).add(1, 'd');
		
		if(category == 0)
		{
			min = Moment(today).subtract(7,'d')
		}
		if(category == 1)
		{
			min = Moment(today).subtract(1,'M')
		}
		else if(category == 2)
		{
			min = Moment(today).subtract(1, 'Y')
		}
		dates = weights.filter(
			function(each) {
				return Moment(each.date).isBetween(min, max);
			}
		)
		dates.filter(a => a.date > min && a.date < max);
		if(dates.length > 1) {
			this.state.hasNoData = false;
			this.setState({shownData: dates[dates.length - 1]})
		}
		else {
			this.state.hasNoData = true;
		}
		return dates;
	}

	addWeight = () => {
		if(Moment(userWeight[userWeight.length - 1].date).isSame(today, 'day'))
		{			
			userWeight[userWeight.length - 1].weight = parseInt(this.state.curWeight);
			this.props.reportPut(this.props.userId,this.state.curWeight);		
		}
		else
		{
			userWeight.push({"weight": parseInt(this.state.curWeight), "date": today.toDate()});
			this.props.reportPost(this.props.userId,this.state.curWeight);
		}

		this.setState({userWeightState: this.changeDomain(userWeight, this.state.category)})
		
	}

	checkString(weightString) { 
		if(this.isWholeNumber(weightString) || weightString == ''){
            this.setState({curWeight: weightString})
        }
	}

	isWholeNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n) && n.indexOf(".")==-1;
    }

	weightTextColor() {
		(this.state.shownColor == true) ? chosen = colors.brandgold : chosen = colors.brandblue
		return {color: chosen};
	}

	setShownWeight = (d) => {		
		if(d == null) {
			this.setState({shownData: {date: this.state.userWeightState[this.state.userWeightState.length-1].date, weight: this.state.curWeight}, shownColor: false});
		}
		else{
			this.setState({shownData: this.state.userWeightState.sort(function(a,b){
				var distancea = Math.abs(d - a.date);
				var distanceb = Math.abs(d - b.date);
				return distancea - distanceb;
			})[0], shownColor: true});
		}
	}
	
    updateCategory = (category) => {
        this.setState({category, userWeightState: this.changeDomain(userWeight, category), showLoader: false})
    }

	render() {
		return (
			<View style = {{flex:1}}>
				<HaH_Header
					text = 'Report'
				/>
				<View style = {{flex: 1, paddingTop: '5%', paddingBottom: 0}}>
					<View style = {{flex: 8, justifyContent: 'center', alignContent: 'center'}}>
						<View style = {{paddingRight: '5%'}}>
						{
							this.state.hasNoData == true ? <View style = {{height: 55}}/> :
							<View style = {{height: 55}}>
								<Text style={[styles.weightText, this.weightTextColor()]}>
									{this.state.shownData.weight} 
									<Text style = {styles.unit}>
										{' lbs'}
									</Text>
								</Text>
								<Text style={styles.dateText}>
									{Moment.utc(this.state.shownData.date).format('Do MMM YY')}
								</Text>
							</View>
						}
						</View>
						<View style={styles.chartView}>
						{
							this.state.hasNoData == true ? 
							<View style = {{height: 200, justifyContent: 'center', alignContent: 'center'}}>
								<Text style = {{textAlign: 'center'}}>
									We don't have enough data to graph!
								</Text>
								<Text style = {{textAlign: 'center'}}>
									Enter some more weights each day and help us!
								</Text>
							</View>
							:
							<VictoryGroup
								height={200}
								scale={{x: "time"}}
								padding = {{top: 5, bottom: 5, left: 0, right: 0}}
								domainPadding={{y: 5}}
								containerComponent = {	
														<VictoryCursorContainer
															cursorDimension ="x"
															onCursorChange={(d) => (this.setShownWeight(d))}
														/>
													}
								animate={{duration: 200, easing: "poly"}}
								>
								<VictoryLine
									style={{
										data:{
											stroke: colors.brandblue, strokeWidth: 3
										},
										labels: {
											fontSize: fonts.md,
											fill: (d) => d.date == this.state.userWeightState[this.state.userWeightState.length - 1].date ? colors.brandgold : colors.brandblue
										}
									}}
									//interpolation="natural"
									data={this.state.userWeightState}
									
									x="date"
									y="weight"
								/>
							</VictoryGroup>
						}
						</View>
						<View style={{paddingLeft: '20%', paddingRight: '20%', paddingTop: 0, paddingBottom: 0}}>
							<ButtonGroup
								onPress={this.updateCategory}
								selectedIndex={this.state.category}
								buttons={['1W','1M','1Y']}
								containerStyle={styles.categoryContainer}
								selectedTextStyle={styles.categoryTextSelected}
								textStyle={styles.categoryTextUnselected}
								selectedButtonStyle={styles.categoryButtonSelected}
								buttonStyle={styles.categoryButtonUnselected}
							/>
						</View>
					</View>
					<View style = {{flex:2}}/>
					<View style={styles.weightInput}>
						<Text style={styles.weightInputText}>
							Today's Weight:
						</Text>
						<View style={{width: 70, height: 35, paddingLeft: 0, marginLeft: 0}}>
							
							<TextInput
								style={styles.userInput}
								onChangeText={(curWeight) => this.checkString(curWeight)}
								onSubmitEditing={this.submit}
								value={this.state.curWeight}
								underlineColorAndroid = 'rgba(0,0,0,0)'
								keyboardType='numeric'>
							</TextInput>
							
						</View>
					</View>

					<View style={styles.confirmView}>
						<TouchableOpacity
							style = {[button.touchable, {backgroundColor: colors.brandgold}]}
							onPress={this.addWeight}>
							<View style={button.view}>
								<Text style = {button.text}>
									Confirm Changes
								</Text>
							</View>
                    	</TouchableOpacity>
					</View>
				</View>
				
				
				<HaH_NavBar
					selected = {4}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	chartView: {
		paddingTop: 0,
		paddingLeft: 0,
	},
	pointsHeader: {
		backgroundColor: 'transparent',
		textAlign: 'center',
		color: colors.secondary,
		fontSize: 20,
		fontWeight: "100",
		justifyContent: 'center',
		alignItems: 'center'
	},
	points:{
		backgroundColor: 'transparent',
		textAlign: 'center',
		color: colors.primary,
		opacity: 0.8,
		fontSize: 70,
		fontWeight: "100",
		justifyContent: 'center',
		alignItems: 'center'
	},
	pointsLabel:{
		backgroundColor: 'transparent',
		textAlign: 'center',
		color: '#7591af',
		fontSize: 14,
		fontWeight: "100",
		justifyContent: 'center',
		alignItems: 'center'
	},
	pointsDelta: {
		color: '#4c6479',
		fontSize: 50,
		fontWeight: "100"
	},
	pointsDeltaActive: {
		color: '#fff',
	},
	headerCenter: {
		fontSize:30, 
		fontWeight: 'bold',
		fontFamily: fonts.primary
	},
	space: {
		flex: 1,
	},
	weightInput: {
		flexDirection: 'row',
		paddingLeft: '12%',
		paddingRight: '12%',
		justifyContent: 'space-between'
	},
	weightText: {
		textAlign: 'right',
		fontSize: fonts.xl, 
		fontWeight: 'bold',
		fontFamily: fonts.primary,
	},
	dateText: {
		textAlign: 'right',
		fontSize: fonts.sm,
		fontWeight: 'bold',
		fontFamily: fonts.primary,
	},
	weightInputText: {
		textAlign: 'right',
		fontSize: fonts.lg, 
		fontWeight: 'bold',
		fontFamily: fonts.primary,
	},
	confirmContainer: {
		backgroundColor: colors.brandgold,
		borderRadius: 10,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 7
	},
	confirmView: {
		paddingLeft: '10%',
		paddingRight: '10%',
		paddingTop: '4%',
		paddingBottom: 0,
		marginBottom: 0,
	},
	confirmText: {
		flex: 1,
		fontSize: 25,
		fontWeight: 'bold',
		textAlign: 'center',
		fontFamily: fonts.primary,
		color: colors.brandwhite,
		textAlignVertical: 'center'
	},
	userInput: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: fonts.primary, 
        color: colors.primary,
		justifyContent: 'center',
		backgroundColor: colors.brandgrey,
		borderRadius: 10
	},
	categoryContainer: {
        height: 50,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        borderRadius: 15,
        borderColor: colors.brandblue
    },
    categoryTextUnselected: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: fonts.primary,
        color: colors.primary
    },
    categoryTextSelected: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: fonts.primary,
        color: colors.brandwhite
    },
    categoryButtonSelected: {
        opacity: 0.8, 
        backgroundColor: colors.brandblue
	},
	unit: {
		fontSize: fonts.md,
        fontFamily: fonts.primary, 
        color: colors.brandgrey,
        textAlign:'right',
        alignSelf: 'flex-end',
	}
});

const mapStateToProps = (state) => {
    
	return {
		foodArray: state.food.foodArray,
		userId: state.auth.userId,
		date : state.auth.date,
		reportData: state.report.reportData 
    };
};


export default connect(mapStateToProps, {report, reportPost, reportPut}) (ReportCard);