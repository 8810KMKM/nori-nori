import React, { Component } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";

import Button from "../../libs/components/Button";
import Form from "../../libs/components/Form";
import HeadLine from "../../libs/components/HeadLine";

export default ({ fuel, cost, errorMessage, handleChange, save }) => {
  return (
    <>
      <HeadLine pageName="Setting" />
      <View style={styles.container}>
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
        </KeyboardAvoidingView>
        <View style={styles.actions}>
          <Button text="保存" onPress={save} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "80%"
  },
  formWrapper: {
    height: "70%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  actions: {
    height: "30%",
    justifyContent: "center",
    alignItems: "center"
  }
});
