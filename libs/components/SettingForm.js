import React, { Component } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";

import Button from "../../libs/components/Button";
import Form from "../../libs/components/Form";
import HeadLine from "../../libs/components/HeadLine";

export default ({ fuel, cost, errorMessage, handleChange, save }) => {
  return (
    <>
      <HeadLine pageName="Setting" />
      <KeyboardAvoidingView behavior="padding" style={styles.formWrapper}>
        <Form
          label="燃費 [km/l]"
          value={fuel}
          handleChange={text => handleChange("fuel", text)}
          placeholder="ex）15km/l→15"
          errorMessage={errorMessage.fuel}
          keyboardType="number-pad"
        />
        <Form
          label="ガソリン相場 [円/l]"
          value={cost}
          handleChange={text => handleChange("cost", text)}
          placeholder="ex）140円/l→140"
          errorMessage={errorMessage.cost}
          keyboardType="number-pad"
        />
        <Button text="保存" onPress={save} />
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  formWrapper: {
    height: "80%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});
