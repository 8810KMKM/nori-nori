import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { captureRef as takeSnapshotAsync } from "react-native-view-shot";

import HeadLine from "../../libs/components/HeadLine";
import Button from "../../libs/components/Button";
import ConvertedFoodCollection from "../../libs/components/ConvertedFoodCollection";
import RefreshContainer from "../../libs/components/RefreshContainer";

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
    // const resultImgSource = await takeSnapshotAsync(
    //   this.resultImgRef.current,
    //   options
    // );
    //
    // const resultImgSourcePath = resultImgSource.match("file://")
    //   ? resultImgSource
    //   : `file://${resultImgSource}`;
    //
    const resultImgSourcePath = "";

    Actions.detail({ resultImgSourcePath, detailData });
  };

  render() {
    const { foodAmounts } = this.props;
    return (
      <RefreshContainer>
        <View ref={this.resultImgRef}>
          <HeadLine pageName="Result" />
          <ConvertedFoodCollection
            style={styles.foodList}
            foodAmounts={foodAmounts}
          />
        </View>
        <View style={styles.actions}>
          <Button text="戻る" onPress={Actions.pop} />
          <Button text="詳細" onPress={this.moveDetailPage} />
        </View>
      </RefreshContainer>
    );
  }
}

const styles = StyleSheet.create({
  actions: {
    height: "10%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
