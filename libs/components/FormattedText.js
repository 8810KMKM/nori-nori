import React from "react";
import { View, Text, StyleSheet } from "react-native";
import fonts from "../../assets/variables/fonts";

export default ({ category, value, fontSize = fonts.small }) => {
  const styles = StyleSheet.create({
    textWrapper: {
      width: "100%",
      borderBottomWidth: 2,
      borderBottomColor: colors.gray,
      marginVertical: 8,
      flexDirection: "row",
      justifyContent: "space-between"
    },
    category: {
      color: colors.white,
      fontSize: fontSize,
      paddingLeft: 1
    },
    value: {
      color: colors.accent,
      fontWeight: "bold",
      fontSize: fontSize,
      paddingRight: 1
    }
  });

  return (
    <View style={styles.textWrapper}>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};
