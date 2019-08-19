import React from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";

import globalStyles from "../../assets/styleSheets/globalStyles";

export default ({ refreshing, onRefresh, children, offset }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={globalStyles.container}>
        <View style={{ height: offset }} />
        {children}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    borderWidth: 2,
    width: "100%",
    height: "100%"
  }
});
