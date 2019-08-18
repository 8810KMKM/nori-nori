import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { captureRef as takeSnapshotAsync } from "react-native-view-shot";
import * as Sharing from "expo-sharing";

import globalStyles from "../../assets/styleSheets/globalStyles";

import Loading from "../../libs/components/Loading";

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

    const shareImgSourcePath = shareImgSource.match("file://")
      ? shareImgSource
      : `file://${shareImgSource}`;

    Sharing.shareAsync(shareImgSourcePath).catch(() =>
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
        <MapView region={region} style={styles.map}>
          <Marker coordinate={start_latLng} title="origin" />
          <Marker coordinate={end_latLng} title="destination" />
        </MapView>
        {loading && <Loading />}
        <Text>出発地:{responseOrigin}</Text>
        <Text>到着地:{responseDestination}</Text>
        <Text>走行距離:{distance}</Text>
        <Text>運転時間:{duration}</Text>
        <Text>
          ガソリン消費量:{Math.round(useFuelAmount * 10) / 10}リットル
        </Text>
        <Text>ガソリン代:{Math.round(feeOfFuel)}円</Text>
        <Text>一人あたりの支払い:{Math.round(payPerPerson)}円</Text>
        <Button title="share" onPress={this.onShare} />
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
