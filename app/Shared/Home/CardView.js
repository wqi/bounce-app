"use strict";
// Imports
import React, {
  StyleSheet,
  Component,
  Text,
  View
} from "react-native";

import Swiper from "react-native-swiper";

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
});

// Classes
export default class CardView extends Component {
  render() {
    return (
      <Swiper style={styles.wrapper} showsButtons={false} height={200}>
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
    )    
  }
} 
