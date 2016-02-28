"use strict";
// Imports
import React, {
  StyleSheet,
  Component,
  Text,
  View,
  LayoutAnimation,
  TouchableHighlight
} from "react-native";

import Swiper from "../../../node_modules/react-native-swiper/dist/index.js";
import * as D from "../Common/DimensionHelper.js";
import { swipeable } from "react-native-gesture-recognizers";
import DeviceInfo from "react-native-device-info";
import FlipCard from 'react-native-flip-card'
const { directions: { SWIPE_UP, SWIPE_LEFT, SWIPE_DOWN, SWIPE_RIGHT } } = swipeable;

const cardHeight = D.DEVICE_HEIGHT - 56;
const cardWidth = D.DEVICE_WIDTH;

// Styles
const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    flex: 1,
    backgroundColor: '#dddddd'
  },
  cardcontainer: {
    flex: 1,
    alignItems: "stretch",
    flexDirection: "row"
  },
  text: {
    color: "#000000",
    fontSize: 36,
    margin: 15
  },
  transparent: {
    width: 10,
  },

  card: {
    marginTop: 10,
    marginBottom: 68,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: 2,
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowColor: 'black',
    shadowOpacity: 0.2
  },
  viewMap: {
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10
  }
});


// Classes

class SwipeCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      y: 0
    }
  }

  render() {
    const { cardText } = this.props;
    return ( 
      <View style={styles.cardcontainer}>
        <View style={styles.transparent}>
        </View>
        <FlipCard>
          <View style={[styles.card, styles.face]}>
            <Text style={styles.text}>{cardText}</Text>
            <Text style={styles.viewMap}>Tap to View Map</Text>
          </View>
          <View style={[styles.card, styles.back]}>
            <Text style={styles.viewMap}>Tap to Return to Post</Text>
          </View>
        </FlipCard>
        <View style={styles.transparent}>
        </View>
      </View> 
    )
  }
}

SwipeCard = swipeable({down: true})(SwipeCard);

export default class CardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      index: 0,
      latitude: -1,
      longitude: -1,
      y: 0,
      offset: 0
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
    "&lng=" + this.state.longitude + "&offset=" + this.state.offset, {
      method: "GET"
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      var posts = responseData.map(function(e) {
        return {text: e.text, y: 0, id: e._id};
      });
      var currItems = this.state.items;
      currItems = currItems.concat(posts);
      this.setState({
        items: currItems,
        offset: this.state.offset + 10
      });
    })
    .done();
  }

  postBounceAtLocation() {
    fetch("http://bounce9833.azurewebsites.net/api/bounce?lat=" + this.state.latitude + 
    "&lng=" + this.state.longitude + "&user_id=" + DeviceInfo.getUniqueID() 
    + "&post_id=" + this.state.items[this.state.index].id ,{
      method: "POST"
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
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

  onSwipeBegin = ({direction, distance, velocity}) => {
    console.log('onSwipeBegin');
    this.postBounceAtLocation();
    var newY = 0
    switch(direction) {
      case SWIPE_DOWN:
        newY = 50;
        break;
      default:
        break;
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    var itemsArray = this.state.items;
    itemsArray[this.state.index].y = newY;

    this.setState({
      items: itemsArray
    });

    setTimeout(function() {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      itemsArray[this.state.index].y = -cardHeight;
      this.setState({
        items: itemsArray
      });

      setTimeout(function() {
        itemsArray.splice(this.state.index, 1);
        this.setState({
          items: itemsArray
        });
      }.bind(this), 300);
    }.bind(this), 200);
  };

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
              <SwipeCard key={index} cardText={item.text} onSwipeBegin={this.onSwipeBegin}
                swipeDecoratorStyle={{
                  top: item.y,
                  position: 'absolute',
                  height: cardHeight,
                  width: cardWidth}}/>
            )
          }.bind(this))}
        </Swiper>
    )    
  }

  _onScrollEnd(e) {
    console.log('asdf');
  }

  

} 
