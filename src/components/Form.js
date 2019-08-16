import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import colors from "../../assets/variables/colors";

export default ({
  label,
  value,
  handleChange,
  errorMessage,
  placeholder,
  formStyles
}) => {
  const styles = formStyles || defaultStyles;
  return (
    <>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <TextInput
        value={value}
        onChangeText={text => handleChange(text)}
        autoCapitalize="none"
        style={styles.input}
        placeholder={placeholder}
      />
      <Text style={styles.error}>{errorMessage}</Text>
    </>
  );
};

const defaultStyles = StyleSheet.create({
  labelContainer: {
    width: "90%",
    alignItems: "flex-start"
  },
  label: {
    fontWeight: "bold",
    color: colors.white,
    fontSize: 24,
    marginBottom: 8
  },
  input: {
    height: 56,
    width: "90%",
    paddingLeft: 8,
    fontSize: 24,
    backgroundColor: colors.white,
    color: colors.black,
    fontWeight: "bold",
    borderRadius: 8
  },
  error: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: colors.accent
  }
});
