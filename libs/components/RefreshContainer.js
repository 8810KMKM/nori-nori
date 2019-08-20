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
      <View style={styles.container}>
        <View style={{ height: offset }} />
        {children}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "mplus-1p-r",
    // justifyContent: "flex-start",
    alignItems: "center",
    color: colors.white,
    backgroundColor: colors.main
  },
  contentContainer: {
    width: "100%",
    height: "100%"
  }
});
