import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

import globalStyles from "../../assets/styleSheets/globalStyles";

export default class extends Component {
  render() {
    const {
      region,
      start_latLng,
      end_latLng,
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
        <MapView region={region} style={styles.map}>
          <Marker coordinate={start_latLng} title="origin" />
          <Marker coordinate={end_latLng} title="destination" />
        </MapView>
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

const styles = StyleSheet.create({
  map: {
    position: "relative",
    height: "60%",
    width: "90%"
  }
});
