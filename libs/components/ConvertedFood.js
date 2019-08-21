import React from "react";
import { View, Image, StyleSheet } from "react-native";

import FoodIconList from "./FoodIconList";
import FormattedText from "./FormattedText";

export default ({ name, amount, icon, grayIcon, multiIcon }) => {
  return (
    <View style={styles.resultContainer}>
      <FormattedText
        category={name}
        fontSize={24}
        value={amount === 0 ? "--" : `${amount}個`}
      />
      <FoodIconList
        amount={amount}
        icon={icon}
        grayIcon={grayIcon}
        multiIcon={multiIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    width: "100%"
  }
});
