import React from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";

import colors from "../../assets/variables/colors";

export default ({ refreshing, onRefresh, children, offset }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={{ height: offset }} />
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    fontFamily: "mplus-1p-r",
    justifyContent: "center",
    alignItems: "center",
    color: colors.white,
    backgroundColor: colors.main
  }
});
