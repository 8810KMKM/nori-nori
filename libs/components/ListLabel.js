import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default ({ title, text, fontSize = 16 }) => {
  const styles = StyleSheet.create({
    textWrapper: {
      borderBottomWidth: 2,
      borderBottomColor: colors.gray,
      marginVertical: 8,
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between"
    },
    title: {
      color: colors.white,
      fontSize: fontSize,
      paddingLeft: 1
    },
    text: {
      color: colors.accent,
      fontWeight: "bold",
      fontSize: fontSize,
      paddingRight: 1
    }
  });

  return (
    <View style={styles.textWrapper}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
