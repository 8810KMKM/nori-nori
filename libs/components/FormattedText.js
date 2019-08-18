import React from 'react';
import {View, Text, StyleSheet} from 'react-native'

export default ({ category, value }) => (
  <View style={styles.textWrapper}>
    <View style={styles.text}>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  textWrapper: {
    borderBottomWidth: 2,
    borderBottomColor: colors.gray,
    marginVertical: 8,
    width: "100%"
  },
  text: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  category: {
    color: colors.white,
    fontSize: 16
  },
  value: {
    color: colors.accent,
    fontWeight: "bold",
    fontSize: 16
  }
});