import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";

import juiceImage from "../../assets/images/foods/soda.png";
import burgerImage from "../../assets/images/foods/burger.png";
import ramenImage from "../../assets/images/foods/ramen.png";
import grayJuiceImage from "../../assets/images/foods/soda-gray.png";
import grayBurgerImage from "../../assets/images/foods/burger-gray.png";
import grayRamenImage from "../../assets/images/foods/ramen-gray.png";
import multiJuiceImage from "../../assets/images/foods/soda-x10.png";
import colors from "../../assets/variables/colors";

import divide_amount from "../../utils/divide_amount";

import ConvertedFood from "./ConvertedFood";
import fonts from "../../assets/variables/fonts";

export default ({ foodAmounts }) => (
  <View style={styles.wrapper}>
    <Text style={styles.message}>お礼は一人あたり...</Text>
    <ScrollView contentContainerStyle={styles.foodsWrapper}>
      <ConvertedFood
        name="ジュース"
        amount={divide_amount(foodAmounts.juice)}
        icon={juiceImage}
        grayFoodIcon={grayJuiceImage}
        multiIcon={multiJuiceImage}
      />
      <ConvertedFood
        name="ハンバーガー"
        amount={divide_amount(foodAmounts.burger)}
        icon={burgerImage}
        grayIcon={grayBurgerImage}
        multiIcon={multiJuiceImage}
      />
      <ConvertedFood
        name="ラーメン"
        amount={divide_amount(foodAmounts.ramen)}
        icon={ramenImage}
        grayIcon={grayRamenImage}
        multiIcon={multiJuiceImage}
      />
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "space-between",
    height: "70%",
  },
  foodsWrapper: {
    width: Dimensions.get('window').width * 0.9
  },
  message: {
    fontSize: fonts.small,
    fontFamily: "mplus-1p-b",
    color: colors.white,
    marginVertical: 8 
  }
});
