import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";

import { feePerPeople } from "../utils/calculation";
import default_format from "../utils/format_result";

import globalStyles from "../../assets/styleSheets/globalStyles";

import DestinationForm from "./DestinationForm";
import SettingModal from "./SettingModal";
import Button from "./Button";

export default class extends Component {
  state = {
    origin: "",
    destination: "",
    people: 1,
    errorMessage: { origin: "", destination: "" },
    isModalVisible: false
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

    const fee_per_people = await feePerPeople(origin, destination, people);
    const formatted_result = default_format(fee_per_people);

    console.log(formatted_result);

    Actions.result({ foodAmounts: formatted_result });
  };

  toggleModal = () => {
    const { isModalVisible } = this.state;
    this.setState({ isModalVisible: !isModalVisible });
  };

  render() {
    const { isModalVisible } = this.state;
    return (
      <View style={globalStyles.container}>
        <SettingModal
          isVisible={isModalVisible}
          toggleModal={this.toggleModal}
        />
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>nori-nori</Text>
        </View>
        <DestinationForm
          {...this.state}
          handleChange={this.handleChange}
          submit={this.submit}
        />
        {/* TODO:styleよろしく */}
        <Button text="設定" onPress={this.toggleModal} />
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
