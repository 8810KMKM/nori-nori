import React from 'react';
import { View, Text } from 'react-native';
import juiceImage from '../../assets/images/foods/003-soda.png';
import burgerImage from '../../assets/images/foods/002-burger.png';
import ramenImage from '../../assets/images/foods/001-food-and-restaurant.png';
import globalStyles from '../../assets/styleSheets/globalStyles';
import ConvertedFood from './ConvertedFood';
import Button from './Button';
import { Actions } from 'react-native-router-flux';

const sample = {
  juice: 5,
  burger: 2,
  ramen: 1
};

export default () => (
  <View>
    <Text>お礼は一人あたり このどれか!!</Text>
    <ConvertedFood
      name="ジュース"
      amount={sample.juice}
      foodIcon={juiceImage}
    />
    <ConvertedFood
      name="ハンバーガー"
      amount={sample.burger}
      foodIcon={burgerImage}
    />
    <ConvertedFood
      name="ラーメン"
      amount={sample.ramen}
      foodIcon={ramenImage}
    />
  </View>
);