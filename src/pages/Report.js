import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux';

import { Header, SearchBar } from 'react-native-elements';
import { Card, ListItem, Button, Icon, ButtonGroup } from 'react-native-elements';

import { VictoryLine, VictoryLabel, VictoryGroup, VictoryAxis, VictoryVoronoiContaine, VictoryCursorContainer } from "victory-native";

import {colors, margin, padding, fonts, button} from '../styles/base.js'
import { HaH_Header, HaH_NavBar } from '../components/common/index.js';
import Moment from 'moment';

import testResponse from '../testdata/report.json'

const userWeight = {};
const today = new Date();

class ReportCard extends React.Component {

	state = {
		curWeight: 0,
		userWeightState: userWeight,
		shownData: {},
		category: 0,
		shownColor: false
	}

	componentWillMount = () => {
		today.setHours(0,0,0,0);
		for(i = 0; i < testResponse.report_card.length; i++)
		{
			testResponse.report_card[i].date = new Date(testResponse.report_card[i].date)
		}
		userWeight = testResponse.report_card;
		this.setState({
			curWeight: userWeight[userWeight.length - 1].weight.toString(),
			userWeightState: this.changeDomain(userWeight)
		});
	}

	changeDomain(userWeight, category) {
		min = Moment(new Date()).subtract(1, 'week');
		max = new Date();
		if(category == 1)
		{
			min = Moment(new Date()).subtract(1, 'month');
		}
		else if(category == 2)
		{
			min = Moment(new Date()).subtract(1, 'year');
		}
		dates = userWeight.filter(
			function(each) {
				return Moment(each.date).isBetween(min, max);
			}
		)
		dates.filter(a => a.date > min && a.date < max);
		this.setState({shownData: dates[dates.length - 1]})
		return dates;
	}

	addWeight = () => {
		if(userWeight[userWeight.length - 1].date != today)
		{			
			userWeight.push({"date": today, "weight": parseInt(this.state.curWeight)})
		}
		else
		{
			userWeight[userWeight.length - 1].weight = parseInt(this.state.curWeight);
		}
		this.setState({userWeightState: this.changeDomain(userWeight, this.state.category), shownData: userWeight[userWeight.length - 1]})
	}

	check(weightString) {
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
		//console.log(d)
		
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
			<View style = {{flex:1, marginTop: Expo.Constants.statusBarHeight}}>
				<HaH_Header
					text = 'Report'
				/>
				<View style = {{flex: 1, paddingTop: '5%', paddingBottom: 0}}>
					<View style = {{flex: 8, justifyContent: 'center', alignContent: 'center'}}>
						<View style = {{paddingRight: '5%'}}>
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
						<View style={styles.chartView}>
							<VictoryGroup
								height={200}
								scale={{x: "time"}}
								padding = {{top: 5, bottom: 5, left: 0, right: 0}}
								domainPadding={{y: 5}}
								containerComponent = {	
														<VictoryCursorContainer
															//defaultCursorValue={{x: 7}}
															cursorDimension ="x"
															onCursorChange={(d) => (this.setShownWeight(d))}
														/>
													}
								animate={{duration: 500, easing: "poly"}}
								>
								{/*<VictoryAxis 
									//tickFormat={this.state.userWeightState.date}
												/>*/}
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
								onChangeText={(curWeight) => this.check(curWeight)}
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
		//backgroundColor: 'red'
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

export default ReportCard;