import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import juiceImage from '../../assets/images/foods/003-soda.png';
import burgerImage from '../../assets/images/foods/002-burger.png';
import ramenImage from '../../assets/images/foods/001-food-and-restaurant.png';
import globalStyles from '../../assets/styleSheets/globalStyles';

const sample = [
  {
    name: 'juice',
    count: 5
  },
  {
    name: 'burger',
    count: 2
  },
  {
    name: 'ramen',
    count: 1
  }
]

export default class extends Component {
  state = {
    isActive: {
      juice: true,
      hamburgerSet: false,
      ramen: false
    }
  };

  render() {
    return (
      <View style={globalStyles.container}>
        {sample.map(food => (
          [...Array(food.count)].map((_, i) => (
            <Image
              key={i}
              style={{width: 80, height: 80}}
              source={juiceImage}
            />
          ))
        ))}
      </View>
    );
  };



}