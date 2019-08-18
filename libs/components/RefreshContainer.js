import React from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";

import globalStyles from "../../assets/styleSheets/globalStyles";

export default ({ refreshing, onRefresh, children }) => {
  return (
    <View style={globalStyles.container}>
      <View style={styles.scrollViewContainer}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.contentContainer}>{children}</View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    height: "100%",
    width: "100%"
  },
  contentContainer: { alignItems: "center", justifyContent: "center" }
});
