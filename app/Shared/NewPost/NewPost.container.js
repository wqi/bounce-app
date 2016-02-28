"use strict";

import React, {
	View,
	Component,
	StyleSheet,
	TextInput,
	TouchableHighlight,
	Text
} from "react-native";

import DeviceInfo from "react-native-device-info";

const deviceId = DeviceInfo.getUniqueID().split("-").join("");

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		alignItems: "stretch",
		backgroundColor: "#dddddd"
	},
	textarea: {
		height: 150,
		fontSize: 20,
		marginTop: 10,
		marginBottom: 20,
		padding: 10,
		backgroundColor: "#ffffff"
	},
	button: {
		backgroundColor: "#57A0E5",
		padding: 5,
		borderRadius: 5
	},
	buttonText: {
		fontSize: 24,
		textAlign: "center",
		color: "white"
	}
})

export default class NewPost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
			latitude: -1,
			longitude: -1
		};
	}

	getCurrentLocation() {
	    navigator.geolocation.getCurrentPosition(
	      (position) => {
	        this.state.latitude = position.coords.latitude;
	        this.state.longitude = position.coords.longitude;
	        this.sendPost();
	      },
	      (error) => alert(error.message),
	      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
	 }

	sendPost() {
		fetch("http://bounce9833.azurewebsites.net/api/post" ,{
	      method: "POST",
	      headers: {
	        'Content-Type': 'Application/JSON'
	      },
	      body: JSON.stringify({
	      	text: this.state.text,
	        lat: this.state.latitude,
	        lng: this.state.longitude,
	        user_id: deviceId
	      })
	    })
	    .then((response) => response.json())
	    .then((responseData) => {
	      console.log(responseData);
	      this.props.navigator.pop();
	    })
	    .done();
	}

	submit() {
		if (this.state.text.length == 0) {
			alert("Please enter text.");
			return;
		}

		this.getCurrentLocation();
	}

	render() {
		return (
			<View style={styles.container}>
				<TextInput
					style={styles.textarea}
					placeholder={"Post text"}
					multiline={true}
					onChangeText={(text) => this.setState({text})} />
				<TouchableHighlight style={{ marginLeft: 10, marginRight: 10 }} underlayColor={"#333333"} onPress={this.submit.bind(this)}>
					<View style={styles.button}>
						<Text style={styles.buttonText}>Submit</Text>
					</View>
				</TouchableHighlight>
			</View>
		)
	}
}