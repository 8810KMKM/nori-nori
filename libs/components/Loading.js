import React from "react";
import { ActivityIndicator, StyleSheet, Dimensions } from "react-native";

import colors from "../../assets/variables/colors";

export default ({}) => {
  return (
    <ActivityIndicator
      style={styles.loading}
      size="large"
      color={colors.accent}
    />
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    top: height / 2 - 20,
    left: width / 2 - 20
  }
});
