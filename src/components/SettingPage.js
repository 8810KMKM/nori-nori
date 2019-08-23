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

  componentDidMount() {
    this.setData();
  }

  setData = async () => {
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
  };

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.setData();
    this.setState({ refreshing: false, errorMessage: { fuel: "", cost: "" } });
  };

  handleChange = (target, text) => {
    this.setState({ [target]: text });
  };

  filterInt = value => {
    if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) return false;
    return true;
  };

  filterFloat = value => {
    if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value)) return false;
    return true;
  };
  save = async () => {
    const { fuel, cost } = this.state;
    const errorMessage = "数字以外を入力しないでください";

    if (this.filterFloat(fuel)) {
      return this.setState({ errorMessage: { fuel: errorMessage } });
    }
    if (this.filterInt(cost)) {
      return this.setState({ errorMessage: { cost: errorMessage } });
    }

    if (parseFloat(fuel) < 3 || parseFloat(fuel) > 30) {
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
    this.setState({ loading: false, errorMessage: { fuel: "", cost: "" } });
    this.setData();

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
