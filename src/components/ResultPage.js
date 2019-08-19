import React, { Component } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { captureRef as takeSnapshotAsync } from "react-native-view-shot";

import Button from "../../libs/components/Button";
import ConvertedFoodCollection from "../../libs/components/ConvertedFoodCollection";
import RefreshContainer from "../../libs/components/RefreshContainer";

const { height, width } = Dimensions.get("window");

export default class ResultPage extends Component {
  constructor(props) {
    super(props);
    this.resultImgRef = React.createRef();
  }

  moveDetailPage = async () => {
    const { detailData } = this.props;
    const options = {
      format: "png",
      quality: 1
    };
    const resultImgSource = await takeSnapshotAsync(
      this.resultImgRef.current,
      options
    );

    const resultImgSourcePath = resultImgSource.match("file://")
      ? resultImgSource
      : `file://${resultImgSource}`;

    Actions.detail({ resultImgSourcePath, detailData });
  };

  render() {
    const { foodAmounts } = this.props;
    return (
      <RefreshContainer ref={this.resultImgRef}>
        <ConvertedFoodCollection
          style={styles.foodList}
          foodAmounts={foodAmounts}
        />
        <View style={styles.buttonWrapper}>
          <Button text="戻る" onPress={Actions.pop} />
          <Button text="詳細" onPress={this.moveDetailPage} />
        </View>
      </RefreshContainer>
    );
  }
}

const styles = StyleSheet.create({
  foodList: {
    height: height - 120
  },
  buttonWrapper: {
    height: 120,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
