import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Actions } from "react-native-router-flux";
import { captureRef as takeSnapshotAsync } from "react-native-view-shot";

import colors from "../../assets/variables/colors";
import { wishListFormat } from "../../utils/format_result";

import Button from "../../libs/components/Button";
import ConvertedFoodCollection from "../../libs/components/ConvertedFoodCollection";
import RefreshContainer from "../../libs/components/RefreshContainer";
import HeadLine from "../../libs/components/HeadLine";
import ListLabel from "../../libs/components/ListLabel";

export default class ResultPage extends Component {
  constructor(props) {
    super(props);
    this.resultImgRef = React.createRef();
  }

  state = {
    loading: false,
    refreshing: false,
    wishItem: { title: "", price: 0 }
  };

  componentDidMount = async () => {
    const { fee } = this.props;
    const wishItem = await wishListFormat(fee);
    this.setState({ wishItem });
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.setState({ refreshing: false });
  };

  moveDetailPage = async () => {
    const { detailData, fee } = this.props;
    const options = {
      format: "png",
      quality: 1
    };
    this.setState({ loading: true });
    const resultImgSource = await takeSnapshotAsync(
      this.resultImgRef.current,
      options
    );

    const resultImgSourcePath = resultImgSource.match("file://")
      ? resultImgSource
      : `file://${resultImgSource}`;

    this.setState({ loading: false });
    Actions.detail({ resultImgSourcePath, detailData, fee });
  };

  render() {
    const { loading, refreshing, wishItem } = this.state;
    const { foodAmounts, fee } = this.props;
    const wishItemCount = Math.floor(fee / wishItem.price);
    return (
      <RefreshContainer refreshing={refreshing} onRefresh={this.onRefresh}>
        <View style={styles.resultContainer}>
          <ScrollView>
            <View
              ref={this.resultImgRef}
              collapsable={false}
              style={styles.result}>
              <HeadLine pageName="Result" />
              {wishItem.title !== "" && (
                <>
                  <Text style={styles.message}>みんなで...</Text>
                  <ListLabel
                    title={wishItem.title}
                    text={`${wishItem.price}円...${wishItemCount}個`}
                  />
                </>
              )}
              <ConvertedFoodCollection
                style={styles.foodList}
                foodAmounts={foodAmounts}
              />
            </View>
            <View style={styles.actions}>
              <Button text="戻る" onPress={Actions.pop} />
              <Button text="詳細" onPress={this.moveDetailPage} />
            </View>
          </ScrollView>
        </View>
      </RefreshContainer>
    );
  }
}

const styles = StyleSheet.create({
  resultContainer: {
    width: "100%",
    flex: 1
  },
  result: {
    flex: 1,
    backgroundColor: colors.main,
    paddingHorizontal: "5%"
  },
  actions: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 20
  },
  message: {
    fontSize: fonts.small,
    fontFamily: "mplus-1p-b",
    color: colors.white,
    marginVertical: 8
  }
});
