"use strict";
// Imports
import React, {
  StyleSheet,
  Component,
  Text,
  View
} from "react-native";

import CardView from "../Feed/CardView.component"

// Styles
const styles = StyleSheet.create({
  wrapper: {
  },
  cardcontainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  transparent: {
    width: 10,
    height: 200
  },
  card: {
    flex: 1,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  }
})

// Classes
export default class Feed extends Component {
  render() {
    return (
      <View style={styles.root}>
        <CardView/>
      </View>
    )    
  }
} 
