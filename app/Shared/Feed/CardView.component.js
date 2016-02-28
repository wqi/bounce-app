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
      index: 0,
      latitude: -1,
      longitude: -1
    };
  }

  componentDidMount() {
    this.getCurrentLocation();
    // this.setState({
    //   items: [{text: 'asdf'}, {text: 'asdfasdf'}, {text:'asdfasdfasdf'}]
    // });
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.state.latitude = position.coords.latitude;
        this.state.longitude = position.coords.longitude;
        this.getPostsAroundLocation();
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
  }

  getPostsAroundLocation() {
    fetch("http://bounce9833.azurewebsites.net/api/post?lat=" + this.state.latitude +
    "&lng=" + this.state.longitude + "&offset=" + this.state.items.length, {
      method: "GET"
    })
    .then((response) => response.json())
    .then((responseData) => {
      var posts = responseData.map(function(e) {
        return {text: e.text};
      });
      var currItems = this.state.items;
      currItems = currItems.concat(posts);
      this.setState({
        items: currItems
      });
    })
    .done();
  }

  _onMomentumScrollEnd(e, estate, context) {
    var cardIndex = estate.index;
    this.setState({
      index: cardIndex
    });
    var itemsArray = this.state.items
    if (cardIndex == itemsArray.length-1) {
      this.getPostsAroundLocation();
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
