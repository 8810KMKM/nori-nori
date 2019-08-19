import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default ({ label, onValueChange, items, value, placeholder }) => {
  return (
    <>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.selectBoxContainer}>
        <RNPickerSelect
          style={pickerSelectStyles}
          onValueChange={onValueChange}
          items={items}
          value={value}
          placeholder={placeholder}
        />
      </View>
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
    fontSize: 20,
    marginBottom: 8
  },
  selectBoxContainer: {
    height: 48,
    width: "90%",
    paddingLeft: 8,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: 32
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20,
    fontWeight: "bold",
    borderRadius: 8,
    color: "black",
    height: "100%",
    width: "100%"
  },
  inputAndroid: {
    fontSize: 24,
    fontWeight: "bold",
    borderRadius: 8,
    color: "black",
    height: "100%",
    width: "100%"
  }
});
