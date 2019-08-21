import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";

import Form from "../../libs/components/Form";
import Button from "../../libs/components/Button";
import HeadLine from "./HeadLine";
import RefreshContainer from "./RefreshContainer";
import colors from "../../assets/variables/colors";
import fonts from "../../assets/variables/fonts";

export default ({
  user,
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
      <HeadLine pageName="Account" />
      <View style={styles.container}>
        {mode === "logout" ? (
          <>
            <View style={styles.userInfo}>
              <Text style={styles.mail}>{user.email}</Text>
              <Text style={styles.message}>でログインしています</Text>
            </View>
            <View style={styles.actions}>
              <Button text="ログアウト" onPress={onPress} width={200} />
            </View>
          </>
        ) : (
          <>
            <KeyboardAvoidingView behavior="padding" style={styles.account}>
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
                  handleChange={text =>
                    handleChange("passwordConfirmation", text)
                  }
                  placeholder=""
                />
              )}
            </KeyboardAvoidingView>
            <View style={styles.actions}>
              <Button
                text={mode === "login" ? "ログイン" : "新規登録"}
                onPress={onPress}
                width={180}
              />
              <Text style={styles.anotherWay} onPress={toggleMode}>
                {`${mode === "login" ? "新規登録" : "ログイン"}はこちら`}
              </Text>
            </View>
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "80%",
    width: "100%"
  },
  userInfo: {
    width: "80%",
    height: "80%",
    marginTop: 40
  },
  account: {
    width: "100%",
    height: "70%",
    alignItems: "center"
  },
  actions: {
    height: "30%",
    alignItems: "center",
    justifyContent: "center"
  },
  mail: {
    fontSize: fonts.small,
    color: colors.accent,
    lineHeight: fonts.small * 2,
    fontFamily: "mplus-1p-b"
  },
  message: {
    fontSize: fonts.small,
    color: colors.white,
    lineHeight: fonts.small * 2,
    fontFamily: "mplus-1p-r"
  },
  anotherWay: {
    color: colors.white,
    fontSize: fonts.small,
    lineHeight: fonts.small * 2,
    fontFamily: "mplus-1p-r",
    textAlign: "center",
    marginTop: 12
  }
});
