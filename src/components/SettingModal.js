import React, { Component } from "react";
import { View, Text, AsyncStorage, StyleSheet } from "react-native";

import Modal from "react-native-modal";
import Button from "./Button";
import Form from "./Form";

export default class extends Component {
  state = {
    fuel: "15",
    cost: "140",
    errorMessage: { fuel: "", cost: "" }
  };

  componentDidMount = async () => {
    try {
      const data = await AsyncStorage.multiGet(["fuel", "cost"]);
      data.map(d =>
        this.setState({
          [d[0]]: d[1]
        })
      );
    } catch (e) {
      console.log("async storage get error");
    }

    const { fuel, cost } = this.state;
    console.log(fuel, cost);
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

    try {
      await AsyncStorage.multiRemove(["fuel", "cost"]);
      await AsyncStorage.multiSet([["fuel", fuel], ["cost", cost]]);
    } catch (e) {
      console.log("async storage set error");
    }

    this.props.toggleModal();
  };

  render() {
    const isVisible = this.props.isVisible;
    const { fuel, cost, errorMessage } = this.state;
    return (
      <View>
        <Modal
          backdropColor="white"
          backdropOpacity={1.0}
          isVisible={isVisible}>
          <View style={{ flex: 1 }}>
            <Form
              label="燃費"
              value={fuel}
              handleChange={text => this.handleChange("fuel", text)}
              placeholder="ex）15km/l→15"
              errorMessage={errorMessage.fuel}
              formStyles={formStyles}
            />
            <Form
              label="ガゾリン相場"
              value={cost}
              handleChange={text => this.handleChange("cost", text)}
              placeholder="ex）140円/l→140"
              errorMessage={errorMessage.cost}
              formStyles={formStyles}
            />
          </View>
          <Button text="保存" onPress={this.save} />
        </Modal>
      </View>
    );
  }
}

const formStyles = StyleSheet.create({
  labelContainer: {
    paddingTop: 40,
    width: "90%",
    alignItems: "flex-start"
  },
  label: {
    fontWeight: "bold",
    color: colors.black,
    fontSize: 24,
    marginBottom: 8
  },
  input: {
    height: 56,
    width: "90%",
    paddingLeft: 8,
    fontSize: 24,
    backgroundColor: colors.white,
    color: colors.black,
    fontWeight: "bold",
    borderRadius: 8
  },
  error: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.accent
  }
});
