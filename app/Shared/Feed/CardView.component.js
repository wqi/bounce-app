"use strict";
// Imports
import React, {
  StyleSheet,
  Component,
  Text,
  View
} from "react-native";

import Swiper from "../../../node_modules/react-native-swiper/dist/index.js";
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
    fontSize: 20,
    margin: 10
  },
  transparent: {
    width: 10,
  },
  card: {
    marginTop: 10,
    marginBottom: 68,
    flex: 1,
    backgroundColor: "#9DD6EB",
    borderRadius: 10
  }
});


// Classes
export default class CardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      index: 0
    };
  }

  componentDidMount() {
    this.setState({
      items: [{text: 'asdf'}, {text: 'asdfasdf'}, {text:'asdfasdfasdf'}]
    });
  }

  _onMomentumScrollEnd(e, estate, context) {
    var cardIndex = estate.index;
    this.setState({
      index: cardIndex
    });
    var itemsArray = this.state.items
    if (cardIndex == itemsArray.length-1) {
      itemsArray.push({text:'new item'});
      this.setState({
        items: itemsArray
      })
    }
  }

  render() {
    return (
        <Swiper style={styles.wrapper} 
          index={this.state.index} 
          showsButtons={false} 
          height={cardHeight} 
          loop={false} 
          showsPagination={false} 
          onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}>
          {this.state.items.map(function(item, index) {
            return (
              <View key={index} style={styles.cardcontainer}>
                <View style={styles.transparent}>
                </View>
                <View style={styles.card}>
                  <Text style={styles.text}>{item.text}</Text>
                </View>
                <View style={styles.transparent}>
                </View>
              </View>
            )
          })}
        </Swiper>
    )    
  }

  _onScrollEnd(e) {
    console.log('asdf');
  }

  

} 
