import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux';

import { Header, SearchBar } from 'react-native-elements';
import { Card, ListItem, Button, Icon, ButtonGroup } from 'react-native-elements';

import { VictoryLine, VictoryLabel, VictoryGroup, VictoryAxis, VictoryVoronoiContaine, VictoryCursorContainer } from "victory-native";

import {colors, margin, padding, fonts} from '../styles/base.js'
import { HaH_Header, HaH_NavBar } from '../components/common/index.js';
import Moment from 'moment';

const userWeight = [
	{ date: "2018-10-01", weight: 360 },
	{ date: "2018-10-02", weight: 400 },
	{ date: "2018-10-03", weight: 360 },
	{ date: "2018-10-04", weight: 320 },
	{ date: "2018-10-05", weight: 290 },
	{ date: "2018-10-06", weight: 274 },
	{ date: "2018-10-07", weight: 238 }
];

class ReportCard extends React.Component {

	state = {
		curWeightString: "" + userWeight[userWeight.length - 1].weight, //+ userWeights[userWeights.length - 1].weight
		curWeight: userWeight[userWeight.length - 1].weight,
		userWeightState: userWeight,
		shownData: userWeight[userWeight.length - 1],
		category: 0,
		shownColor: false
	}

	showHome = () => {
		Actions.home();
	}
  
	showAddFood = () => {  
		Actions.push("addfood",{type:"addfood"});
	}
  
	showAddExercise = () => {
		Actions.push("addexercise",{type:"addexercise"});
	}
  
	showAddFoodNotes = () => {
		Actions.push("foodnotes");
	}
  
	showAddExerciseNotes = () => {
		Actions.push("exercisenotes");
	}
  
	showReport = () => {
		Actions.push("report");
	}

	addWeight = () => {
		userWeight[userWeight.length - 1].weight = this.state.curWeight;
		this.setState({userWeightState: userWeight, shownData: userWeight[userWeight.length - 1]})
	}

	check(weightString) {
		this.setState({curWeightString: weightString})
	}

	submit = () => {
		this.setState({curWeight: parseInt(this.state.curWeightString)})
	}

	weightTextColor() {
		(this.state.shownColor == true) ? chosen = colors.brandgold : chosen = colors.brandblue
		return {color: chosen};
	}

	setShownWeight = (d) => {
		weight = Math.round(d, 1)
		if(weight > 0 && weight < 8 && this.state.shownData.weight != weight) {
			this.setState({shownData: this.state.userWeightState[weight-1], shownColor: true});
		}
		else if(d == null)
		{
			this.setState({shownData: {date: this.state.userWeightState[this.state.userWeightState.length-1].date, weight: this.state.curWeightString}, shownColor: false});
		}
	}

	
    updateCategory = (category) => {
        this.setState({showLoader: true});
        (category == 0) ? this.setState({category, showLoader: false}) : this.setState({category, showLoader: false})
    }

	render() {
		return (
			<View style = {{flex:1, marginTop: Expo.Constants.statusBarHeight}}>
				<HaH_Header
					text = 'Report'
				/>
				<View style = {{flex: 1, paddingTop: '5%', paddingBottom: 0}}>
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
								
								//labelComponent={<VictoryLabel renderInPortal dy={-10}/>}
								//interpolation="natural"
								data={this.state.userWeightState}
								//labels={(d) => String(Math.round(d.weight))}
								
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
					<View style = {{flex:1}}/>
					<View style={styles.weightInput}>
						<Text style={styles.weightInputText}>
							Set Today's Weight:
						</Text>
						<View style={{backgroundColor: colors.brandgrey, paddingLeft: 10, paddingTop: 0, padding: 2, borderRadius: 10}}>
							
							<TextInput
								style={styles.userInput}
								onChangeText={(curWeight) => this.check(curWeight)}
								onSubmitEditing={this.submit}
								value={this.state.curWeightString}
								underlineColorAndroid = 'rgba(0,0,0,0)'
								keyboardType='numeric'>
							</TextInput>
							
						</View>
					</View>

					<View style={styles.confirmView}>
						<TouchableOpacity 
							style = {styles.confirmContainer}
							onPress = {this.addWeight}>
							<Text style = {styles.confirmText}>
								Confirm Changes
							</Text>
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
		fontFamily: 'sans-serif-condensed'
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
		fontFamily: 'sans-serif-condensed',
	},
	dateText: {
		textAlign: 'right',
		fontSize: fonts.sm,
		fontWeight: 'bold',
		fontFamily: 'sans-serif-condensed',
	},
	weightInputText: {
		textAlign: 'right',
		fontSize: fonts.lg, 
		fontWeight: 'bold',
		fontFamily: 'sans-serif-condensed',
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
		fontFamily: 'sans-serif-condensed',
		color: colors.brandwhite,
		textAlignVertical: 'center'
	},
	userInput: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'right',
        fontFamily: 'sans-serif-condensed', 
        color: colors.primary,
        paddingLeft: 35,
        paddingRight: 10,
        justifyContent: 'center',
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
        fontFamily: 'sans-serif-condensed',
        color: colors.primary
    },
    categoryTextSelected: {
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-condensed',
        color: colors.brandwhite
    },
    categoryButtonSelected: {
        opacity: 0.8, 
        backgroundColor: colors.brandblue
	},
	unit: {
		fontSize: fonts.md,
        fontFamily: 'sans-serif-condensed', 
        color: colors.brandgrey,
        textAlign:'right',
        alignSelf: 'flex-end',
	}
});

export default ReportCard;