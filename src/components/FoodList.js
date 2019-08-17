import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import juiceImage from '../../assets/images/foods/003-soda.png';
import burgerImage from '../../assets/images/foods/002-burger.png';
import ramenImage from '../../assets/images/foods/001-food-and-restaurant.png';
import ConvertedFood from './ConvertedFood';
import globalStyles from '../../assets/styleSheets/globalStyles';

export default ({foodAmounts}) => (
  <View style={styles.wrapper}>
    <Text>お礼は一人あたり このどれか!!</Text>
    <ConvertedFood
      name="ジュース"
      amount={foodAmounts.juice}
      foodIcon={juiceImage}
    />
    <ConvertedFood
      name="ハンバーガー"
      amount={foodAmounts.burger}
      foodIcon={burgerImage}
    />
    <ConvertedFood
      name="ラーメン"
      amount={foodAmounts.ramen}
      foodIcon={ramenImage}
    />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-start"
  }
})