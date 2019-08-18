import React, { Component } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import { Actions } from "react-native-router-flux";

import { feePerPeople } from "../../utils/calculation";
import defaultFormat, { detailFormat } from "../../utils/format_result";
import { getCurrentLocation, fetchDirections } from "../../utils/google_api";

import globalStyles from "../../assets/styleSheets/globalStyles";

import DestinationForm from "../../libs/components/DestinationForm";
import logoImage from "../../assets/images/nori-nori-logo.png";

export default class extends Component {
  state = {
    origin: "",
    destination: "",
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

    this.setState({
      origin: data.start_address,
      destination: "",
      errorMessage: { origin: "", destination: "" }
    });

    const result = await feePerPeople(data.distance.value, people);

    // データ整形
    const formattedResult = defaultFormat(result.payPerPerson);
    const formattedDetail = detailFormat(data, result);

    Actions.result({
      foodAmounts: formattedResult,
      detailData: formattedDetail
    });
  };

  render() {
    return (
      <View style={globalStyles.container}>
        <Image source={logoImage} style={styles.logo} />
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
  logo: {
    width: 320,
    height: 160,
    marginTop: 48
  }
});
