import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import juiceImage from '../../assets/images/foods/003-soda.png';
import burgerImage from '../../assets/images/foods/002-burger.png';
import ramenImage from '../../assets/images/foods/001-food-and-restaurant.png';
import globalStyles from '../../assets/styleSheets/globalStyles';
import SelectBox from './SelectBox';
import colors from '../../assets/variables/colors';

const sample = {
  juice: 5,
  burger: 2,
  ramen: 1
};

export default class extends Component {
  state = {
    activeFood: 'juice'
  };

  JuiceResult = () => {
    if (this.state.activeFood === "juice") {
      return (
        [...Array(sample.juice)].map((_, i) => (
          <Image
            key={i}
            style={{ width: 80, height: 80 }}
            source={juiceImage}
          />
        ))
      );
    }
    return <></>
  }

  BurgerResult = () => {
    if (this.state.activeFood === "burger") {
      return (
        [...Array(sample.burger)].map((_, i) => (
          <Image
            key={i}
            style={{ width: 80, height: 80 }}
            source={burgerImage}
          />
        ))
      );
    }
    return <></>
  }

  RamenResult = () => {
    if (this.state.activeFood === "ramen") {
      return (
        [...Array(sample.ramen)].map((_, i) => (
          <Image
            key={i}
            style={{ width: 80, height: 80 }}
            source={ramenImage}
          />
        ))
      );
    }
    return <></>
  }

  render() {
    const foods = [
      { label: "バーガーセット", value: "burger" },
      { label: "ラーメン", value: "ramen" }
    ];

    const placeholder = {
      label: "ジュース",
      value: "juice",
      color: colors.black
    };

    return (
      <View style={globalStyles.container}>
        <SelectBox
          label="お礼"
          items={foods}
          placeholder={placeholder}
          onValueChange={value => this.setState({ activeFood: value })}
        />
        {this.JuiceResult()}
        {this.BurgerResult()}
        {this.RamenResult()}
      </View>
    );
  };



}