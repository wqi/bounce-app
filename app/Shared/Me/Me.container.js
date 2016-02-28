"use strict";

import React, {
  View,
  Component,
  StyleSheet,
  Text
} from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default class Me extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{"Ayy lmao"}</Text>
        <Text>{"Hopefully this will work"}</Text>
      </View>
    );
  }
}
