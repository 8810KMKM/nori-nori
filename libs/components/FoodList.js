import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import juiceImage from '../../assets/images/foods/soda.png';
import burgerImage from '../../assets/images/foods/burger.png';
import ramenImage from '../../assets/images/foods/ramen.png';
import grayJuiceImage from '../../assets/images/foods/soda-gray.png';
import grayBurgerImage from '../../assets/images/foods/burger-gray.png';
import grayRamenImage from '../../assets/images/foods/ramen-gray.png';
import ConvertedFood from './ConvertedFood';
import colors from '../../assets/variables/colors';

export default ({foodAmounts}) => (
  <View style={styles.wrapper}>
    <Text style={styles.message}>お礼は一人あたり このどれか!!</Text>
    <ConvertedFood
      name="ジュース"
      amount={foodAmounts.juice}
      foodIcon={juiceImage}
      grayFoodIcon={grayJuiceImage}
    />
    <ConvertedFood
      name="ハンバーガー"
      amount={foodAmounts.burger}
      foodIcon={burgerImage}
      grayFoodIcon={grayBurgerImage}
    />
    <ConvertedFood
      name="ラーメン"
      amount={foodAmounts.ramen}
      foodIcon={ramenImage}
      grayFoodIcon={grayRamenImage}
    />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "90%"
  },
  message: {
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 64,
    color: colors.white
  }
});