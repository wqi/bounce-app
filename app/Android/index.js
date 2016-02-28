"use strict";
// Imports
import React, {
  StyleSheet,
  Component,
  Text,
  View
} from "react-native";

import CardView from "../Shared/Feed/CardView.component.js"
var ToolbarAndroid = require('ToolbarAndroid');

// Classes
export default class Bounce extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          title="Bounce"
          titleColor="#ffffff"
          style={styles.toolbar} />
        <View>
          <CardView/>
        </View>
      </View>
    )    
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    flexDirection: "column",
    alignItems: "stretch"
  },
  toolbar: {
    height: 56,
    backgroundColor: "#2196f3"
  },
});