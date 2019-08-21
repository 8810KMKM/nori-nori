import React from "react";
import { Text, StyleSheet } from "react-native";
import colors from "../../assets/variables/colors";
import fonts from "../../assets/variables/fonts";

export default ({ pageName }) => (
  <Text style={styles.headline}>{pageName}</Text>
);

const styles = StyleSheet.create({
  headline: {
    fontSize: fonts.large,
    fontFamily: "erica",
    color: colors.accent,
    height: "10%",
    marginTop: "10%"
  }
});
