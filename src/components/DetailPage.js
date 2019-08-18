import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";

import globalStyles from "../../assets/styleSheets/globalStyles";
import Button from "../../libs/components/Button";
import { Actions } from "react-native-router-flux";
import FormattedText from "../../libs/components/FormattedText";
import HeadLine from "../../libs/components/HeadLine";

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
        <HeadLine pageName="Drive Info"/>
        <MapView region={region} style={styles.map}>
          <Marker coordinate={start_latLng} title="origin" />
          <Marker coordinate={end_latLng} title="destination" />
        </MapView>
        <ScrollView style={styles.text}>
          <FormattedText
            category="出発地"
            value={responseOrigin}
          />
          <FormattedText
            category="到着地"
            value={responseDestination}
          />
          <FormattedText
            category="走行距離"
            value={distance}
          />
          <FormattedText
            category="運転時間"
            value={duration}
          />
          <FormattedText
            category="ガソリン消費量"
            value={`${Math.round(useFuelAmount * 10) / 10}リットル`}
          />
          <FormattedText
            category="ガソリン代"
            value={`${Math.round(feeOfFuel)}円`}
          />
          <FormattedText
            category="一人あたりの支払い"
            value={`${Math.round(payPerPerson)}円`}
          />
          <Button
            text="戻る"
            onPress={() => Actions.pop()}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: "relative",
    height: "40%",
    width: "90%"
  },
  text: {
    width: "90%"
  }
});
