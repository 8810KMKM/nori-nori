import React, { Component } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Actions } from "react-native-router-flux";

import { feePerPeople } from "../../utils/calculation";
import default_format from "../../utils/format_result";
import { getCurrentLocation, fetchDirections } from "../../utils/google_api";

import globalStyles from "../../assets/styleSheets/globalStyles";

import DestinationForm from "../../libs/components/DestinationForm";
import Button from "../../libs/components/Button";

export default class extends Component {
  state = {
    origin: "",
    destination: "",
    responseOrigin: "",
    responseDestination: "",
    people: 2,
    errorMessage: { origin: "", destination: "" }
  };

  setCurrentLocation = async () => {
    this.setState({ origin: await getCurrentLocation() });
  };

  toggleNoticeModal = () => {
    const { isNoticeModalVisible } = this.state;
    this.setState({ isNoticeModalVisible: !isNoticeModalVisible });
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

    const response = await fetchDirections(origin, destination);

    if (response.status === "NOT_FOUND") {
      return Alert.alert("正しい地名が入力されているか確認してください");
    }
    if (response.status === "ZERO_RESULTS") {
      return Alert.alert("車のみのルートでは移動できない可能性があります");
    }

    const data = response.routes[0].legs[0];
    const [distance, duration] = [data.distance.value, data.duration.value];

    this.setState({
      origin: data.start_address,
      // 後で詳細表示に使いたい
      responseOrigin: data.start_address,
      responseDestination: data.end_address
    });

    const fee_per_people = await feePerPeople(distance, people);
    const formatted_result = default_format(fee_per_people);

    this.setState({
      destination: "",
      errorMessage: { origin: "", destination: "" }
    });
    Actions.result({ foodAmounts: formatted_result });
  };

  render() {
    return (
      <View style={globalStyles.container}>
        <View style={styles.titleWrapper}>
          <View style={styles.titleUnderLine}>
            <Text style={styles.title}>nori-nori</Text>
          </View>
        </View>
        <DestinationForm
          {...this.state}
          handleChange={this.handleChange}
          submit={this.submit}
          setCurrentLocation={this.setCurrentLocation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleWrapper: {
    flexBasis: "20%",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 56,
    textAlign: "center",
    fontWeight: "bold",
    color: colors.white,
    // fontFamily: 'bangers-r',
    fontFamily: "erica"
  },
  titleUnderLine: {
    marginTop: 20,
    borderBottomWidth: 8,
    borderBottomColor: colors.accent
  }
});
