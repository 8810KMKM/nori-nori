import React, { Component } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";

import globalStyles from "../../assets/styleSheets/globalStyles";
import FoodList from "../../libs/components/FoodList";
import Button from "../../libs/components/Button";

const { height, width } = Dimensions.get('window');

export default class ResultPage extends Component {
  render() {
    return (
      <View style={globalStyles.container}>
        <FoodList
          style={styles.foodList}
          foodAmounts={this.props.foodAmounts}
        />
        <View style={styles.buttonWrapper}>
          <Button
            text="再入力"
            onPress={() => Actions.pop()}
          />
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  foodList: {
    height: height - 120
  },
  buttonWrapper: {
    height: 120
  }
});
