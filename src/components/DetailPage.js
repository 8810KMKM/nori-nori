import React, { Component } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import globalStyles from "../../assets/styleSheets/globalStyles";

// マップ

export default class extends Component {
  render() {
    console.log(this.props.detailData);
    const {
      region,
      responseOrigin,
      responseDestination,
      distance,
      duration,
      useFuelAmount,
      feeOfFuel,
      payPerPerson
    } = this.props.detailData;
    return (
      <View style={globalStyles.container}>
        <Text>出発地:{responseOrigin}</Text>
        <Text>到着地:{responseDestination}</Text>
        <Text>走行距離:{distance}</Text>
        <Text>運転時間:{duration}</Text>
        <Text>
          ガソリン消費量:{Math.round(useFuelAmount * 10) / 10}リットル
        </Text>
        <Text>ガソリン代:{Math.round(feeOfFuel)}円</Text>
        <Text>一人あたりの支払い:{Math.round(payPerPerson)}円</Text>
      </View>
    );
  }
}
