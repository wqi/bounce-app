"use strict";
// Imports
import React, {
  View,
  Component,
  StyleSheet,
  Text,
  ListView,
  TouchableHighlight,
  PixelRatio,
  Image
} from "react-native";

import RefreshableListView from "react-native-refreshable-listview";
import BounceIcon from "../../../assets/icons/blue.png";

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 58
  },
  outerListItem: {
    marginTop: 20
  },
  listitem: {
    backgroundColor: "#57A0E5",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5
  },
  cellBorder: {
    backgroundColor: "#000000",
    height: 1 / PixelRatio.get(),
    marginLeft: 4,
    marginRight: 4
  },
  bounceIcon: {
    height: 25,
    width: 25,
    bottom: 78,
    marginLeft: 16,
    borderRadius: 5
  },
  titleContainer: {
    backgroundColor: "#ABABAD",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  titleText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 15,
    marginTop: 3,
    marginBottom: 3,
    textAlign: "right"
  },
  body: {
    color: "#000",
    fontSize: 14,
    marginLeft: 16,
    marginTop: 10,
    marginBottom: 20,
  }
});

// Classes
export default class Me extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchPosts();
    // this.fetchBounces();
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <View style={styles.outerListItem}>   
        <View style={styles.listitem}>
          <TouchableHighlight underlayColor='#dddddd'>
            <View>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{rowData.bounce_count} bounce</Text>
              </View>
              <Text style={styles.body}>{rowData.text}</Text>
            </View>
          </TouchableHighlight>
        </View>
        <Image source={BounceIcon} style={styles.bounceIcon}/>
      </View>
    );
  }

  render() {


    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          loadData={this.reloadData}
          style={styles.container}/>
      </View>
    );
  }

  genRows() {
    var activityArr = [];
    for (var i = 0; i < 10; i++) {
      activityArr.push({title: "You Bounced:"});
    }

    return activityArr;
  }

  fetchPosts(uid) {
    fetch("http://bounce9833.azurewebsites.net/api/my_posts", {method: "GET", query: JSON.stringify({uid: "me"})})
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        loaded: true
      });
    })
    .done();
  }

  fetchBounces(uid) {
    fetch("http://bounce9833.azurewebsites.net/api/bounce", {method: "GET", query: JSON.stringify({uid: "me"})})
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        loaded: true
      });
    })
    .done();    
  }
}
