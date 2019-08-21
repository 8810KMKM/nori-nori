import React from "react";
import { View, Text, StyleSheet } from "react-native";

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
      {mode === "logout" ? (
        <View style={styles.account}>
          <View style={styles.userInfo}>
            <Text style={styles.mail}>{user.email}</Text>  
            <Text style={styles.message}>でログインしています</Text>
          </View>
          <Button
            text="ログアウト"
            onPress={onPress}
            size={144}
          />
        </View>
      ) : (
          <View style={styles.account}>
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
            <Text
              style={styles.anotherWay}
              onPress={toggleMode}
            >
              {`${mode === "login" ? "新規登録" : "ログイン"}はこちら`}
            </Text>
          </View>
        )}
    </>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    width: "80%",
    height: "20%",
    alignItems: "center",
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
    lineHeight: fonts.small,
    fontFamily: "mplus-1p-r"
  },
  account: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  anotherWay: {
    color: colors.white,
    fontSize: fonts.small,
    lineHeight: fonts.small * 2,
    fontFamily: "mplus-1p-b"
  }
})
