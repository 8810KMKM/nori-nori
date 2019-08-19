import React, { Component } from "react";
import { AsyncStorage, Alert } from "react-native";

import RefreshContainer from "../../libs/components/RefreshContainer";
import SettingForm from "../../libs/components/SettingForm";
import Loading from "../../libs/components/Loading";

export default class extends Component {
  state = {
    fuel: "15",
    cost: "140",
    errorMessage: { fuel: "", cost: "" },
    refreshing: false,
    loading: false
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    try {
      const data = await AsyncStorage.multiGet(["fuel", "cost"]);
      data.map(d => {
        d[1] &&
          this.setState({
            [d[0]]: d[1]
          });
      });
    } catch (e) {
      console.log("async storage get error");
    }
    this.setState({ loading: false });

    const { fuel, cost } = this.state;
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.setState({ refreshing: false });
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

    if (parseInt(fuel) < 3 || parseInt(fuel) > 30) {
      return this.setState({
        errorMessage: { fuel: "3~30の数字を入力してください" }
      });
    }

    if (parseInt(cost) < 100 || parseInt(cost) > 170) {
      return this.setState({
        errorMessage: { cost: "100~170の数字を入力してください" }
      });
    }
    this.setState({ loading: true });

    try {
      await AsyncStorage.multiRemove(["fuel", "cost"]);
      await AsyncStorage.multiSet([["fuel", fuel], ["cost", cost]]);
    } catch (e) {
      console.log("async storage set error");
    }
    this.setState({ loading: false });

    Alert.alert("", "設定を更新しました!");
  };

  render() {
    const { loading, refreshing } = this.state;
    return (
      <RefreshContainer refreshing={refreshing} onRefresh={this.onRefresh}>
        {loading && <Loading />}
        <SettingForm
          {...this.state}
          handleChange={this.handleChange}
          save={this.save}
        />
      </RefreshContainer>
    );
  }
}
