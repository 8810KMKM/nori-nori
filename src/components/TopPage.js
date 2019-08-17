import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";

import { feePerPeople } from "../../utils/calculation";
import default_format from "../../utils/format_result";

import globalStyles from "../../assets/styleSheets/globalStyles";

import DestinationForm from "../../libs/components/DestinationForm";
import Button from "../../libs/components/Button";

export default class extends Component {
  state = {
    origin: "",
    destination: "",
    people: 2,
    errorMessage: { origin: "", destination: "" }
  };

  handleChange = (target, text) => {
    this.setState({ [target]: text });
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
    if (origin === destination) {
      return this.setState({
        errorMessage: { destination: "出発地と到着地が同じです" }
      });
    }

    const fee_per_people = await feePerPeople(
      origin,
      destination,
      people
    ).catch(e => console.log(e));

    const formatted_result = default_format(fee_per_people);

    Actions.result({ foodAmounts: formatted_result });
  };

  render() {
    return (
      <View style={globalStyles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>nori-nori</Text>
        </View>
        <DestinationForm
          {...this.state}
          handleChange={this.handleChange}
          submit={this.submit}
        />
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
