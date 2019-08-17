import React, { Component } from "react";
import { View } from "react-native";
import { Actions } from "react-native-router-flux";

import globalStyles from "../../assets/styleSheets/globalStyles";

import FoodList from "../../libs/components/FoodList";
import Button from "../../libs/components/Button";

export default class extends Component {
  render() {
    return (
      <View style={globalStyles.container}>
        <FoodList foodAmounts={this.props.foodAmounts} />
        <Button text="再入力" onPress={() => Actions.pop()} />
      </View>
    );
  }
}
