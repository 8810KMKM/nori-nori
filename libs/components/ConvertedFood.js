import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import colors from "../../assets/variables/colors";
import resize_image from "../../utils/resize_image";
import FoodIconList from "./FoodIconList";
import FormattedText from "./FormattedText";
import fonts from "../../assets/variables/fonts";

export default ({ name, amount, icon, grayIcon, multiIcon }) => {
  return (
    <View style={{ width: "100%" }}>
      <FormattedText
        category={name}
        fontSize={fonts.middle}
        value={
          amount.single === 0 && amount.multi === 0
            ? "--"
            : `${amount.multi * 10 + amount.single}個`
        }
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
