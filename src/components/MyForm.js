import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import colors from "../../assets/variables/colors";

export default ({ label, value, onChangeText, errorMessage }) => {
  return (
    <>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
      <Text style={styles.error}>{errorMessage}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    width: "90%",
    alignItems: "flex-start"
  },
  label: {
    fontWeight: "bold",
    color: colors.white,
    fontSize: 40
  },
  input: {
    height: 60,
    width: "90%",
    fontSize: 30,
    color: colors.white,
    fontWeight: "bold",
    borderColor: "gray",
    borderWidth: 1
  },
  error: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: colors.accent
  }
});
