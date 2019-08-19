import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
  AsyncStorage
} from "react-native";
import { Actions } from "react-native-router-flux";

import { userActions } from "../../utils/firebase";

import Form from "../../libs/components/Form";
import Button from "../../libs/components/Button";
import RefreshContainer from "../../libs/components/RefreshContainer";

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
        <LoginForm
          {...this.state}
          handleChange={this.handleChange}
          onPress={this.onPress}
          toggleMode={this.toggleMode}
        />
      </RefreshContainer>
    );
  }
}

const LoginForm = ({
  userEmail,
  email,
  password,
  passwordConfirmation,
  handleChange,
  onPress,
  toggleMode,
  mode
}) => {
  return (
    <>
      {mode === "logout" ? (
        <>
          <Text>{userEmail}でログインしています</Text>
          <Button text="ログアウト" onPress={onPress} />
        </>
      ) : (
        <>
          <Form
            label="メールアドレス"
            value={email}
            handleChange={text => handleChange("email", text)}
            placeholder="nori-nori@email.com"
          />
          <Form
            label="パスワード"
            value={password}
            handleChange={text => handleChange("password", text)}
            placeholder=""
          />
          {mode === "signup" && (
            <Form
              label="パスワード（確認）"
              value={passwordConfirmation}
              handleChange={text => handleChange("passwordConfirmation", text)}
              placeholder=""
            />
          )}
          <Button
            text={mode === "login" ? "ログイン" : "新規登録"}
            onPress={onPress}
          />
          <Text onPress={toggleMode}>
            {mode === "login" ? "新規登録" : "ログイン"}はこちら
          </Text>
        </>
      )}
    </>
  );
};
