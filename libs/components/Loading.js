import React, { Component } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

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

const styles = StyleSheet.create({
  loading: {
    position: "absolute"
  }
});
