import React, { Component } from "react";
import { View, Text, AsyncStorage, StyleSheet, Alert } from "react-native";

import globalStyles from "../../assets/styleSheets/globalStyles";

import Button from "../../libs/components/Button";
import Form from "../../libs/components/Form";

export default class extends Component {
  state = {
    fuel: "15",
    cost: "140",
    errorMessage: { fuel: "", cost: "" }
  };

  componentDidMount = async () => {
    try {
      const data = await AsyncStorage.multiGet(["fuel", "cost"]);
      data.map(d => {
        d[1] &&
          this.setState({
            [d[0]]: d[1]
          });
      });
    } catch (e) {
      console.log("async storage get error");
    }

    const { fuel, cost } = this.state;
  };

  handleChange = (target, text) => {
    this.setState({ [target]: text });
  };

  save = async () => {
    const { fuel, cost } = this.state;
    const errorMessage = "数字以外を入力しないでください";

    const filterInt = /^([1-9]\d*|0)$/;
    if (!filterInt.test(fuel)) {
      return this.setState({ errorMessage: { fuel: errorMessage } });
    }
    if (!filterInt.test(cost)) {
      return this.setState({ errorMessage: { cost: errorMessage } });
    }

    if (parseInt(fuel) < 3 || parseInt(fuel) > 30) {
      return this.setState({
        errorMessage: { fuel: "3~30の数字を入力してください" }
      });
    }

    if (parseInt(cost) < 100 || parseInt(cost) > 170) {
      return this.setState({
        errorMessage: { cost: "100~170の数字を入力してください" }
      });
    }

    try {
      await AsyncStorage.multiRemove(["fuel", "cost"]);
      await AsyncStorage.multiSet([["fuel", fuel], ["cost", cost]]);
    } catch (e) {
      console.log("async storage set error");
    }

    Alert.alert("設定を更新しました!");
  };

  render() {
    const { fuel, cost, errorMessage } = this.state;
    return (
      <View style={globalStyles.container}>
        <Text>設定</Text>
        <Form
          label="燃費"
          value={fuel}
          handleChange={text => this.handleChange("fuel", text)}
          placeholder="ex）15km/l→15"
          errorMessage={errorMessage.fuel}
        />
        <Form
          label="ガソリン相場"
          value={cost}
          handleChange={text => this.handleChange("cost", text)}
          placeholder="ex）140円/l→140"
          errorMessage={errorMessage.cost}
        />
        <Button text="保存" onPress={this.save} />
      </View>
    );
  }
}
