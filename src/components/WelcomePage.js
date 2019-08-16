import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import Button from "./Button";
import colors from "../../assets/variables/colors";
import globalStyles from "../../assets/styleSheets/globalStyles";

export default () => {
  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>nori-nori</Text>
      <Button text="ドライブする" onPress={() => Actions.form()} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 56,
    fontWeight: "bold",
    color: colors.white,
    // fontFamily: 'bangers-r',
    fontFamily: "erica",
    textAlign: "center",
    marginBottom: 40
  }
});
