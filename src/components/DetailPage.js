import React, { Component } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Dimensions } from "react-native";
import { captureRef as takeSnapshotAsync } from "react-native-view-shot";
import * as Sharing from "expo-sharing";

import colors from "../../assets/variables/colors";

import Button from "../../libs/components/Button";
import { Actions } from "react-native-router-flux";
import FormattedText from "../../libs/components/FormattedText";
import HeadLine from "../../libs/components/HeadLine";
import DistanceMap from "../../libs/components/DistanceMap";
import RefreshContainer from "../../libs/components/RefreshContainer";
import Loading from "../../libs/components/Loading";

export default class extends Component {
  constructor(props) {
    super(props);
    this.detailImgRef = React.createRef();
  }

  state = {
    loading: false,
    refreshing: false
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.setState({ refreshing: false });
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
    const { loading, refreshing } = this.state;
    const { region, start_latLng, end_latLng, details } = this.props.detailData;

    return (
      <RefreshContainer refreshing={refreshing} onRefresh={this.onRefresh}>
        {loading && <Loading />}
        {/* TODO:スクロールでok ボタンは見える必要なし */}
        <View ref={this.detailImgRef} collapsable={false} style={styles.detail}>
            <HeadLine pageName="Drive Info" />
            <ScrollView contentContainerStyle={{alignItems: "center"}}>
            <View style={styles.detailContainer}>
              <DistanceMap
                region={region}
                start_latLng={start_latLng}
                end_latLng={end_latLng}
              />
              <View style={styles.detailList}>
                {details.map((detail, i) => (
                  <FormattedText
                    key={i}
                    category={detail.category}
                    value={detail.value}
                    fontSize={16}
                  />
                ))}
              </View>
            </View>
            <View style={styles.actions}>
              <Button text="ホーム" onPress={() => Actions.top()} />
              <Button text="共有" onPress={this.onShare} />
            </View>
            </ScrollView>
        </View>
      </RefreshContainer>
    );
  }
}

const styles = StyleSheet.create({
  detail: {
    backgroundColor: colors.main,
    alignItems: "center",
    width: "100%",
    height: "90%"
  },
  detailContainer: {
    height: "80%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between"
  },
  detailList: {
    flex: 1,
    width: "100%",
    paddingHorizontal: "5%"
  },
  actions: {
    // height: "10%",
    height: Dimensions.get('window').height / 10,
    marginTop: 24,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
