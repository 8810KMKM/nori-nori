import React from "react";
import { View, Text } from "react-native";

import Form from "../../libs/components/Form";
import Button from "../../libs/components/Button";

export default ({
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
