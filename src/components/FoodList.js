import React from 'react';
import { View, Text } from 'react-native';
import juiceImage from '../../assets/images/foods/003-soda.png';
import burgerImage from '../../assets/images/foods/002-burger.png';
import ramenImage from '../../assets/images/foods/001-food-and-restaurant.png';
import ConvertedFood from './ConvertedFood';

export default ({foodAmounts}) => (
  <View>
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