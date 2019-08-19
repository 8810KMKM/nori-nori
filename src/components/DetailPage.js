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

import originFlagIcon from "../../assets/images/flags/flag-origin.png";
import destinationFlagIcon from "../../assets/images/flags/flag-destination.png";
import omit_text from "../../utils/omit_text";

export default class extends Component {
  constructor(props) {
    super(props);
    this.detailImgRef = React.createRef();
  }

  state = {
    loading: false
  };

  captureDetailImg = async () => {
    const options = {
      format: "png",
      quality: 1
    };
    const detailImgSource = await takeSnapshotAsync(
      this.detailImgRef.current,
      options
    );

    const detailImgSourcePath = detailImgSource.match("file://")
      ? detailImgSource
      : `file://${detailImgSource}`;

    return detailImgSourcePath;
  };

  onShare = async () => {
    const { resultImgSourcePath } = this.props;

    this.setState({ loading: true });
    Alert.alert("選択", "共有する画像を選択してください", [
      {
        text: "結果",
        onPress: () => this._share(resultImgSourcePath)
      },
      {
        text: "詳細",
        onPress: () => {
          this.captureDetailImg().then(uri => this._share(uri));
        }
      }
    ]);

    this.setState({ loading: false });
  };

  _share = uri => {
    Sharing.shareAsync(uri).catch(e => {
      console.log(e);
      Alert.alert("共有に失敗しました");
    });
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

    const details = [
      {
        category: "出発地",
        value: omit_text(responseOrigin)
      },
      {
        category: "到着地",
        value: omit_text(responseDestination)
      },
      {
        category: "走行距離",
        value: duration
      },
      {
        category: "運転時間",
        value: distance
      },
      {
        category: "ガソリン消費量",
        value: `${Math.round(useFuelAmount * 10) / 10}リットル`
      },
      {
        category: "ガソリン代",
        value: `${Math.round(feeOfFuel)}円`
      },
      {
        category: "一人あたりの支払い",
        value: `${Math.round(payPerPerson)}円`
      }
    ];

    return (
      <View style={globalStyles.container} ref={this.detailImgRef}>
        <HeadLine pageName="Drive Info" />
        <MapView region={region} style={styles.map}>
          <Marker
            coordinate={start_latLng}
            title="origin"
            image={originFlagIcon}
          />
          <Marker
            coordinate={end_latLng}
            title="destination"
            image={destinationFlagIcon}
          />
        </MapView>
        <View style={styles.text}>
          {details.map((detail, i) => (
            <FormattedText
              key={i}
              category={detail.category}
              value={detail.value}
            />
          ))}
        </View>
        <View style={styles.buttonWrapper}>
          <Button text="ホーム" onPress={() => Actions.top()} />
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
    flex: 3,
    position: "relative",
    width: "90%",
    marginBottom: 4
  },
  text: {
    flex: 3,
    width: "90%",
    marginBottom: 24
  },
  buttonWrapper: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start"
  }
});
