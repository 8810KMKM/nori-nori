import React, { Component } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import { Actions } from "react-native-router-flux";

import { feePerPeople } from "../../utils/calculation";
import defaultFormat, { detailFormat } from "../../utils/format_result";
import { getCurrentLocation, fetchDirections } from "../../utils/google_api";

import Loading from "../../libs/components/Loading";
import DestinationForm from "../../libs/components/DestinationForm";
import RefreshContainer from "../../libs/components/RefreshContainer";
import logoImage from "../../assets/images/nori-nori-logo.png";

export default class extends Component {
  state = {
    origin: { label: "", value: "" },
    destination: "",
    people: 2,
    errorMessage: { origin: "", destination: "" },
    loading: false,
    refreshing: false
  };

  onRefresh = () => {
    this.setState({
      origin: { label: "", value: "" },
      destination: "",
      people: 2,
      errorMessage: { origin: "", destination: "" },
      refreshing: true
    });
    this.setState({ refreshing: false });
  };

  setCurrentLocation = async () => {
    this.setState({ loading: true });
    this.setState({
      origin: {
        label: "現在地",
        value: await getCurrentLocation()
      },
      loading: false,
      errorMessage: { origin: "" }
    });
  };

  handleChange = (target, text) => {
    if (target === "origin") {
      this.setState({ origin: { label: text, value: text } });
    } else {
      this.setState({ [target]: text });
    }
  };

  submit = async () => {
    const { origin, destination, people } = this.state;

    if (!origin.value) {
      return this.setState({ errorMessage: { origin: "入力してください" } });
    }
    if (!destination) {
      return this.setState({
        errorMessage: { destination: "入力してください" }
      });
    }
    if (origin.value === destination) {
      return this.setState({
        errorMessage: { destination: "出発地と到着地が同じです" }
      });
    }

    this.setState({ loading: true });
    const response = await fetchDirections(origin.value, destination);

    if (response.status === "NOT_FOUND") {
      this.setState({ loading: false });
      return Alert.alert("正しい地名が入力されているか確認してください");
    }
    if (response.status === "ZERO_RESULTS") {
      this.setState({ loading: false });
      return Alert.alert("車のみのルートでは移動できない可能性があります");
    }

    const data = response.routes[0].legs[0];
    const result = await feePerPeople(data.distance.value, people);

    this.setState({
      origin: {
        label: origin.label === "現在地" ? "現在地" : data.start_address,
        value: data.start_address
      },
      destination: "",
      errorMessage: { origin: "", destination: "" },
      loading: false
    });

    // データ整形
    const formattedResult = defaultFormat(result.payPerPerson);
    const formattedDetail = detailFormat(data, result);

    Actions.result({
      foodAmounts: formattedResult,
      detailData: formattedDetail
    });
  };

  render() {
    const { loading, refreshing } = this.state;
    return (
      <RefreshContainer
        refreshing={refreshing}
        onRefresh={this.onRefresh}
        offset="15%">
        <Image source={logoImage} style={styles.logo} />
        {loading && <Loading />}
        <DestinationForm
          {...this.state}
          handleChange={this.handleChange}
          submit={this.submit}
          setCurrentLocation={this.setCurrentLocation}
        />
      </RefreshContainer>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    width: 280,
    height: 80,
    marginBottom: 16
  }
});
