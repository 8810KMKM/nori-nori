import React, { Component } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import globalStyles from "../../assets/styleSheets/globalStyles";
import Button from "../../libs/components/Button";
import ConvertedFoodCollection from "../../libs/components/ConvertedFoodCollection";

const { height, width } = Dimensions.get("window");

export default class ResultPage extends Component {
  render() {
    return (
      <View style={globalStyles.container}>
        <ConvertedFoodCollection
          style={styles.foodList}
          foodAmounts={this.props.foodAmounts}
        />
        <View style={styles.buttonWrapper}>
          <Button text="戻る" onPress={() => Actions.pop()} />
          <Button text="詳細" onPress={() => Actions.detail()} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  foodList: {
    height: height - 120
  },
  buttonWrapper: {
    height: 120
  }
});
