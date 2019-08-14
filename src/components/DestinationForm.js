import React, { Component } from "react";
import { View } from "react-native";
import { Actions } from "react-native-router-flux";

import globalStyles from "../../assets/styleSheets/globalStyles";

import MyButton from "./MyButton";
import MyForm from "./MyForm";

export default class extends Component {
  state = { from: "", to: "", errorMessage: { from: "", to: "" } };

  submit = () => {
    const { from, to } = this.state;

    if (!from) {
      return this.setState({ errorMessage: { from: "入力してください" } });
    }
    if (!to) {
      return this.setState({ errorMessage: { to: "入力してください" } });
    }
    Actions.result()
    console.log(from, to);
  };

  render() {
    const { from, to, errorMessage } = this.state;
    return (
      <View style={globalStyles.container}>
        <MyForm
          label="出発地"
          value={from}
          onChangeText={text => this.setState({ from: text })}
          errorMessage={errorMessage.from}
        />
        <MyForm
          label="到着地"
          value={to}
          onChangeText={text => this.setState({ to: text })}
          errorMessage={errorMessage.to}
        />
        <MyButton text={"決定!!"} onPress={this.submit} />
      </View>
    );
  }
}
