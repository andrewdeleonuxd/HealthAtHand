import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux';

import { Header, SearchBar } from 'react-native-elements';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

import { VictoryLine, VictoryLabel, VictoryChart, VictoryAxis, VictoryVoronoiContainer } from "victory-native";

import {colors, margin, padding, fonts} from '../styles/base.js'
import { HaH_Header, HaH_NavBar } from '../components/common/index.js';

const userWeight = [
	{ date: "10/1", weight: 360 },
	{ date: "10/2", weight: 360 },
	{ date: "10/3", weight: 360 },
	{ date: "10/4", weight: 320 },
	{ date: "10/5", weight: 290 },
	{ date: "10/6", weight: 274 },
	{ date: "10/7", weight: 238 }
];

class ReportCard extends React.Component {

	state = {
		curWeightString: "" + userWeight[userWeight.length - 1].weight, //+ userWeights[userWeights.length - 1].weight
		curWeight: userWeight[userWeight.length - 1].weight,
		userWeightState: userWeight,
		shownWeight: userWeight[userWeight.length - 1].weight
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
		//console.log(this.state.curWeight)
		userWeight[userWeight.length - 1].weight = this.state.curWeight;
		this.setState({userWeightState: userWeight})
		console.log(this.state.userWeightState)
	}

	check(weightString) {
		//console.log(parseInt(weightString))
		this.setState({curWeightString: weightString})
		{/*
		if(weightString != "")
		{
			this.setState({curWeightString: weightString, curWeight: parseInt(weightString)})
			console.log(this.state.curWeight)
		}
	*/}
	}

	submit = () => {
		this.setState({curWeight: parseInt(this.state.curWeightString)})
	}

	setShownWeight = (d) => {
		weightLabel = d[0].weight;
		console.log(d[0].weight)
		if(this.state.shownWeight != d[0].weight){
			this.setState({shownWeight: weightLabel});
		} 
	}

	render() {
		return (
			<View style = {{flex:1, marginTop: Expo.Constants.statusBarHeight}}>
				<HaH_Header
					text = 'Report'
				/>
				<View style = {{flex: 1}}>
					<View style={styles.chartView}>
						<Text style={styles.weightText}>
							Weight (lbs) - {this.state.shownWeight}
						</Text>
						<VictoryChart
							domainPadding={{x: 30, y: 30}}
							containerComponent = {	
													<VictoryVoronoiContainer
														voronoiDimension ="x"
														onActivated={(d) => (this.setShownWeight(d))}
													/>
												}
							animate={{duration: 1000, easing: "poly"}}>
							<VictoryAxis tickValues={[1, 2, 3, 4, 5, 6]} tickFormat={this.state.userWeightState.date}/>
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
						</VictoryChart>
						
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
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	pointsHeader: {
		backgroundColor: 'transparent',
		//position: 'absolute',
		//top: 72,
		//left: 56,
		//width: 90,
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
		//position: 'absolute',
		//top: 72,
		//left: 56,
		//width: 90,
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
		textAlign: 'center',
        color: colors.primary,
        opacity: 0.8,
        fontSize: fonts.lg,
        fontWeight: "100",
        justifyContent: 'center'
	},
	weightInputText: {
		textAlign: 'left',
		fontSize: fonts.lg, 
		fontWeight: 'bold',
		fontFamily: 'sans-serif-condensed',
	},
	confirmButton: {
		backgroundColor: colors.brandblue,
		borderRadius: 10,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 7
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
		paddingBottom: '10%',
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
        
        //backgroundColor: "red",
    }
});

export default ReportCard;