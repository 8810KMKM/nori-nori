import React, { Component } from "react";
import { View } from "react-native";
import { Actions } from "react-native-router-flux";
import globalStyles from "../../assets/styleSheets/globalStyles";
import FoodList from "./FoodList";
import Button from "./Button";

export default class ResultPage extends Component {
  render() {
    return (
      <View style={globalStyles.container}>
        <FoodList />
        <Button
          text="再入力"
          onPress={() => Actions.pop()}
        />
      </View>
    );
  };
};
