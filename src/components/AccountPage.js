import React, { Component } from "react";
import { Alert, AsyncStorage } from "react-native";

import { userActions } from "../../utils/firebase";

import RefreshContainer from "../../libs/components/RefreshContainer";
import AccountTemplate from "../../libs/components/AccountTemplate";

export default class extends Component {
  state = {
    userEmail: "",
    mode: "login",
    email: "",
    password: "",
    passwordConfirmation: "",
    loading: false,
    refreshing: false
  };

  handleChange = (target, text) => {
    this.setState({ [target]: text });
  };

  componentDidMount = async () => {
    const { userEmail } = await userActions.current();
    userEmail && this.setState({ userEmail, mode: "logout" });
  };

  onPress = async () => {
    const { mode, email, password, passwordConfirmation } = this.state;

    // logout
    if (mode === "logout") {
      await userActions.logout();
      return this.setState({ mode: "login" });
    }

    // login signup
    if (!email || !password) {
      return Alert.alert("値を入力してください");
    }
    if (mode === "signup") {
      if (password !== passwordConfirmation) {
        return Alert.alert("パスワードが一致していません");
      }
    }

    this.setState({ logding: true });
    mode === "login"
      ? await userActions.login(email, password)
      : await userActions.signup(email, password);

    const { userEmail } = await userActions.current();
    this.setState({
      userEmail,
      mode: "logout",
      loading: "false",
      email: "",
      password: "",
      passwordConfirmation: ""
    });
  };

  toggleMode = () => {
    const { mode } = this.state;
    mode === "login"
      ? this.setState({ mode: "signup" })
      : this.setState({ mode: "login" });
  };

  render() {
    return (
      <RefreshContainer>
        <AccountTemplate
          {...this.state}
          handleChange={this.handleChange}
          onPress={this.onPress}
          toggleMode={this.toggleMode}
        />
      </RefreshContainer>
    );
  }
}
