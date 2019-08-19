import React from "react";
import { Text, StyleSheet } from "react-native";
import colors from "../../assets/variables/colors";

export default ({ pageName }) => (
  <Text style={styles.headline}>{pageName}</Text>
);

const styles = StyleSheet.create({
  headline: {
    fontSize: 40,
    fontFamily: "erica",
    color: colors.accent,
    height: "10%",
    marginTop: "10%"
  }
});
