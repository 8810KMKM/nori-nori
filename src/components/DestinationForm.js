import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";

import calculation_fee from "../utils/calculation_fee";

import globalStyles from "../../assets/styleSheets/globalStyles";

import MyButton from "./MyButton";
import Form from "./Form";
import SelectBox from "./SelectBox.js";

export default class extends Component {
  state = {
    origin: "",
    destination: "",
    people: 1,
    errorMessage: { origin: "", destination: "" }
  };

  submit = async () => {
    const { origin, destination, people } = this.state;

    if (!origin) {
      return this.setState({ errorMessage: { origin: "入力してください" } });
    }
    if (!destination) {
      return this.setState({
        errorMessage: { destination: "入力してください" }
      });
    }

    const fuel = (await AsyncStorage.getItem("fuel")) || 150000;
    const cost = (await AsyncStorage.getItem("cost")) || 140;

    const fee = await calculation_fee(origin, destination, people, fuel, cost);

    // Actions.result({origin: origin, destination: destination})
  };

  render() {
    const { origin, destination, errorMessage, people } = this.state;

    const people_count = [
      { label: "2人", value: 2 },
      { label: "3人", value: 3 },
      { label: "4人", value: 4 },
      { label: "5人", value: 5 },
      { label: "6人", value: 6 },
      { label: "7人", value: 7 },
      { label: "8人", value: 8 }
    ];

    const placeholder = {
      label: "デフォルト値：1人",
      value: 1,
      color: "#9EA0A4"
    };

    return (
      <View style={globalStyles.container}>
        <Form
          label="出発地"
          value={origin}
          onChangeText={text => this.setState({ origin: text })}
          errorMessage={errorMessage.origin}
          placeholder="例）福岡県, 警固公園"
        />
        <Form
          label="到着地"
          value={destination}
          onChangeText={text => this.setState({ destination: text })}
          errorMessage={errorMessage.destination}
          placeholder="例）北九州市, 門司港レトロ"
        />
        <SelectBox
          label="人数"
          onValueChange={value => this.setState({ people: value })}
          items={people_count}
          value={people}
          placeholder={placeholder}
        />
        <MyButton text="決定!!" onPress={this.submit} />
      </View>
    );
  }
}
