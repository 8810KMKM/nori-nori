import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";
import { captureRef as takeSnapshotAsync } from "react-native-view-shot";
import * as Sharing from "expo-sharing";

import colors from "../../assets/variables/colors";

import Button from "../../libs/components/Button";
import { Actions } from "react-native-router-flux";
import ListLabel from "../../libs/components/ListLabel";
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
        <View style={styles.detailContainer}>
          <ScrollView>
            <View
              ref={this.detailImgRef}
              collapsable={false}
              style={styles.detail}>
              <HeadLine pageName="Drive Info" />
              <DistanceMap
                region={region}
                start_latLng={start_latLng}
                end_latLng={end_latLng}
              />
              <View style={styles.detailList}>
                {details.map((detail, i) => (
                  <ListLabel
                    key={i}
                    title={detail.title}
                    text={detail.text}
                    fontSize={16}
                  />
                ))}
              </View>
            </View>
            <View style={styles.actions}>
              <Button text="ホーム" onPress={Actions.top} />
              <Button text="共有" onPress={this.onShare} />
            </View>
          </ScrollView>
        </View>
      </RefreshContainer>
    );
  }
}

const styles = StyleSheet.create({
  detailContainer: {
    width: "100%",
    flex: 1
  },
  detail: {
    flex: 1,
    backgroundColor: colors.main,
    paddingHorizontal: "5%"
  },
  detailList: {
    width: "100%",
    flex: 1
  },
  actions: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 20
  }
});
