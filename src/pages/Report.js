import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Actions} from 'react-native-router-flux';

import { Header, SearchBar } from 'react-native-elements';
import { Card, ListItem, Button, Icon } from 'react-native-elements';

import { VictoryLine, VictoryLabel, VictoryChart, VictoryAxis, VictoryVoronoiContainer } from "victory-native";

import {colors, margin, padding, fonts} from '../styles/base.js'

const userWeights = [
	{ date: "10/1", weight: 360 },
	{ date: "10/2", weight: 355 },
	{ date: "10/3", weight: 340 },
	{ date: "10/4", weight: 320 },
	{ date: "10/5", weight: 290 },
	{ date: "10/6", weight: 274 },
	{ date: "10/7", weight: 238 }
];


class ReportCard extends React.Component {
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

	render() {
		return (
			<View style = {{flex:1, marginTop: Expo.Constants.statusBarHeight}}>
				<Header
					outerContainerStyles={{height:60,backgroundColor:colors.primary, opacity:0.8}}
					//leftComponent={hamburger}
					centerComponent={{ text: 'Report Card', style: styles.headerCenter}}
					//rightComponent={search}
				/>
				<View style={styles.chartView}>
					<VictoryChart
						domainPadding={{x: 30, y: 30}}
						containerComponent = {<VictoryVoronoiContainer
							labels={(d) => (d.y)}/>}>
						<VictoryAxis tickValues={[1, 2, 3, 4, 5, 6]} tickFormat={userWeights.date}/>
						<VictoryLine
							style={{
								data:{
									stroke: colors.brandblue, strokeWidth: 3
								},
								labels: {
									fontSize: fonts.md,
									fill: (d) => d.date == userWeights[userWeights.length - 1].date ? colors.brandgold : colors.brandblue
								}
							}}
							
							labelComponent={<VictoryLabel renderInPortal dy={-10}/>}
							interpolation="natural"
							data={userWeights}
							labels={(d) => d.weight}
							
							x="date"
							y="weight"
						/>
					</VictoryChart>
					<Text style={styles.weightText}>
						Weight (lbs)
					</Text>
				</View>
				<View style={styles.space}/>
				<View style={styles.weightInput}>
					<Text style={styles.weightInputText}>
						Enter Today's Weight:
					</Text>
					
				</View>
				<View style={styles.confirmView}>
					<Button 
						titleStyle = {{fontSize: 100, textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}
						title = 'Confirm Weight'
						onPress = {this.addWeight}
						buttonStyle = {styles.confirmButton}
						containerStyle = {styles.confirmContainer}
					/>
				</View>
				<View style={{flexDirection: 'row', height:60, backgroundColor: colors.primary, justifyContent:"space-around", opacity: 0.8}}>
					<Icon
						name='tachometer'
						type='font-awesome'
						color={colors.secondary}
						onPress={this.showHome}
						size={30}
						underlayColor='transparent'>
					</Icon>
					<Icon
						name='food'
						type='material-community'
						color={colors.brandwhite}
						onPress={this.showAddFood}
						size={30}
						underlayColor='transparent'>
					</Icon>
					<Icon
						name='run'
						type='material-community'
						color={colors.brandwhite}
						onPress={this.showAddExercise}
						size={30}
						underlayColor='transparent'>
					</Icon>
					<Icon
						name='message'
						type='Entypo'
						color={colors.brandwhite}
						onPress={this.showReport}
						size={30}
						underlayColor='transparent'> 
					</Icon>
					<Icon
						name='settings'
						type='Feather'
						color={colors.brandwhite}
						onPress={this.showAddExercise}
						size={30}
						underlayColor='transparent'>
					</Icon>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	chartView: {
		backgroundColor: colors.brandwhite,
		alignItems: 'center',
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
		color: colors.brandwhite,
		fontSize:30, 
		fontWeight: 'bold',
		fontFamily: 'sans-serif-condensed'
	},
	space: {
		flex: 1,
		backgroundColor: colors.brandwhite
	},
	weightInput: {
		backgroundColor: colors.brandwhite,
		paddingBottom: padding.sm,
		paddingLeft: padding.lg,
		paddingRight: padding.lg
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
		backgroundColor: colors.primary,
		opacity: 0.8,
		//marginLeft: '10%',
		//marginRight: '10%',
		borderRadius: 5,
		//borderWidth: 1
	},
	confirmContainer: {
		flexDirection:'row',
		alignItems: 'center',
		justifyContent: 'center',
		
	},
	confirmView: {
		backgroundColor: colors.brandwhite,
		paddingLeft: '10%',
		paddingRight: '10%',
		paddingTop: '3%',
		//paddingBottom: padding.sm,
        flex: 1
	},
});

export default ReportCard;