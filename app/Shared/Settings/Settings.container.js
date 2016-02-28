"use strict";

import React, {
  ListView,
  View,
  Component,
  StyleSheet,
  Text
} from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9e9e9',
    marginTop: 20
  },
  textView: {
    marginLeft: 20,
    marginBottom: 10
  },
  text: {
    fontSize: 24,
    fontWeight: '100',
    color: 'black',
  },
  }
});

export default class Settings extends Component {
  constructor() {
    super();
    var testData = [{settingName:"Range"}, {settingName:"Help"}, {settingName:"Created by"}]
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(testData)
    };
  }

  renderRow(rowData, sectionID, rowID) {
    return (
        <View>
          <Text>{rowData.settingName}</Text>
        </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}
