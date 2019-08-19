import React, { Component } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { captureRef as takeSnapshotAsync } from "react-native-view-shot";
import * as Sharing from "expo-sharing";

import Button from "../../libs/components/Button";
import { Actions } from "react-native-router-flux";
import FormattedText from "../../libs/components/FormattedText";
import HeadLine from "../../libs/components/HeadLine";
import DistanceMap from "../../libs/components/DistanceMap";
import RefreshContainer from "../../libs/components/RefreshContainer";

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
    const { region, start_latLng, end_latLng, details } = this.props.detailData;

    return (
      <View style={{ flex: 1 }} ref={this.detailImgRef}>
        <RefreshContainer>
          <HeadLine pageName="Drive Info" />
          <View style={styles.text}>
            <DistanceMap
              region={region}
              start_latLng={start_latLng}
              end_latLng={end_latLng}
            />
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
        </RefreshContainer>
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
