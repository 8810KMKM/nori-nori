import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { captureRef as takeSnapshotAsync } from "react-native-view-shot";
import * as Sharing from "expo-sharing";

import globalStyles from "../../assets/styleSheets/globalStyles";
import Button from "../../libs/components/Button";
import { Actions } from "react-native-router-flux";
import FormattedText from "../../libs/components/FormattedText";
import HeadLine from "../../libs/components/HeadLine";

import Loading from "../../libs/components/Loading";
import colors from "../../assets/variables/colors";

// style={globalStyles.container} 

export default class extends Component {
  constructor(props) {
    super(props);
    this.shareImgRef = React.createRef();
  }

  state = {
    loading: false
  };

  onShare = async () => {
    this.setState({ loading: true });
    const options = {
      format: "png",
      quality: 1
    };
    const shareImgSource = await takeSnapshotAsync(
      this.shareImgRef.current,
      options
    );

    Sharing.shareAsync(shareImgSource).catch(() =>
      Alert.alert("共有に失敗しました")
    );
    this.setState({ loading: false });
  };

  render() {
    const { loading } = this.state;
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
      <View style={globalStyles.container} ref={this.shareImgRef}>
        <HeadLine pageName="Drive Info" />
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
        </ScrollView>
        <View style={styles.buttonWrapper}>
          <Button
            text="戻る"
            onPress={() => Actions.pop()}
          />
          <Button text="共有" onPress={this.onShare} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detail: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%"
  },
  map: {
    flex: 1,
    position: "relative",
    height: "40%",
    width: "90%"
  },
  text: {
    flex: 1,
    width: "90%",
    marginBottom: 24
  },
  buttonWrapper: {
    height: 96,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
