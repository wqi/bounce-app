"use strict";
// Imports
import React, {
  StyleSheet,
  Component,
  Text,
  View,
  Dimensions
} from "react-native";

import CardView from "../Shared/Home/CardView.js";
import * as D from "../Shared/Common/DimensionHelper.js";

// Styles
const styles = StyleSheet.create({
  root: {
    height: D.DEVICE_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  }
});

// Classes
export default class Bounce extends Component {
  render() {
    return (
      <View style={styles.root}>
        <CardView/>
      </View>
    )    
  }
} 
