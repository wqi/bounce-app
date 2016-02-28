"use strict";
// Imports
import React, {
  StyleSheet,
  Component,
  Text,
  View
} from "react-native";

import Swiper from "react-native-swiper";
import * as D from "../Common/DimensionHelper.js";

const cardHeight = D.DEVICE_HEIGHT - 56;

// Styles
const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    flex: 1
  },
  cardcontainer: {
    flex: 1,
    alignItems: "stretch",
    flexDirection: "row"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  transparent: {
    width: 10,
  },
  card: {
    marginTop: 10,
    marginBottom: 35,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  }
});

// Classes
export default class CardView extends Component {
  render() {
    return (
      <View>
      <Swiper style={styles.wrapper} showsButtons={false} height={cardHeight}>
        <View style={styles.cardcontainer}>
          <View style={styles.transparent}>
          </View>
          <View style={styles.card}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.transparent}>
          </View>
        </View>
        <View style={styles.cardcontainer}>
          <View style={styles.transparent}>
          </View>
          <View style={styles.card}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.transparent}>
          </View>
        </View>
        <View style={styles.cardcontainer}>
          <View style={styles.transparent}>
          </View>
          <View style={styles.card}>
            <Text style={styles.text}>And Simple</Text>
          </View>
          <View style={styles.transparent}>
          </View>
        </View>
      </Swiper>
      </View>
    )    
  }
} 
