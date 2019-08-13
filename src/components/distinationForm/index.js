import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import { Actions } from "react-native-router-flux";
import styles from "../../../assets/styleSheets/components/distinationForm";
import MyButton from "../../utils/MyButton";

export default class extends Component {
  state = { from: "", to: "" };
  render() {
    const { from, to } = this.state;
    return (
      <View style={styles.container}>
        <Text>出発地</Text>
        <TextInput value={from} style={styles.input} />
        <Text>到着地</Text>
        <TextInput value={to} style={styles.input} />
        <MyButton text={"決定"} />
      </View>
    );
  }
}
