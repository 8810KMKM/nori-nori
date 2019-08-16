import React, { Component } from "react";
import { View } from "react-native";
import { Actions } from "react-native-router-flux";

import calculation_fee from "../utils/calculation_fee";

import globalStyles from "../../assets/styleSheets/globalStyles";

import MyButton from "./MyButton";
import MyForm from "./MyForm";

export default class extends Component {
  state = {
    origin: "",
    destination: "",
    errorMessage: { origin: "", destination: "" }
  };

  submit = () => {
    const { origin, destination } = this.state;
    const key = "AIzaSyDc51p9dKD29Ron4c-2lvsI9WSFCKDA_Io";

    if (!origin) {
      return this.setState({ errorMessage: { origin: "入力してください" } });
    }
    if (!destination) {
      return this.setState({
        errorMessage: { destination: "入力してください" }
      });
    }
    // Actions.result({origin: origin, destination: destination})

    const fee = calculation_fee(origin, destination);
  };

  render() {
    const { origin, destination, errorMessage } = this.state;

    return (
      <View style={globalStyles.container}>
        <MyForm
          label="出発地"
          value={origin}
          onChangeText={text => this.setState({ origin: text })}
          errorMessage={errorMessage.origin}
        />
        <MyForm
          label="到着地"
          value={destination}
          onChangeText={text => this.setState({ destination: text })}
          errorMessage={errorMessage.destination}
        />
        <MyButton text={"決定!!"} onPress={this.submit} />
      </View>
    );
  }
}
