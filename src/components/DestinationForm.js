import React, { Component } from "react";
import { View, AsyncStorage, Text, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";

import { feePerPeople } from "../utils/calculation";
import default_format from "../utils/format_result";

import globalStyles from "../../assets/styleSheets/globalStyles";

import Button from "./Button";
import Form from "./Form";
import SelectBox from "./SelectBox";

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

    const fee_per_people = await feePerPeople(origin, destination, people);
    const formatted_result = default_format(fee_per_people);

    console.log(formatted_result);

    Actions.result();
  };

  render() {
    const { origin, destination, errorMessage, people } = this.state;

    const people_count = [
      { label: "1人", value: 1 },
      { label: "2人", value: 2 },
      { label: "3人", value: 3 },
      { label: "4人", value: 4 },
      { label: "5人", value: 5 },
      { label: "6人", value: 6 },
      { label: "7人", value: 7 },
      { label: "8人", value: 8 }
    ];

    const placeholder = {
      label: "人数を選択してください",
      value: null,
      color: "#9EA0A4"
    };

    return (
      <View style={globalStyles.container}>
        <View style={styles.titleWrapper}>
        <Text style={styles.title}>nori-nori</Text>
        </View>
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
        <Button text="決定!!" onPress={this.submit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleWrapper: {
    borderBottomWidth: 8,
    borderBottomColor: colors.accent,
    marginBottom: 64
  },
  title: {
    fontSize: 56,
    fontWeight: "bold",
    color: colors.white,
    // fontFamily: 'bangers-r',
    fontFamily: "erica",
    textAlign: "center",
    marginBottom: -8
  }
});
