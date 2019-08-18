import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import juiceImage from '../../assets/images/foods/soda.png';
import burgerImage from '../../assets/images/foods/burger.png';
import ramenImage from '../../assets/images/foods/ramen.png';
import grayJuiceImage from '../../assets/images/foods/soda-gray.png';
import grayBurgerImage from '../../assets/images/foods/burger-gray.png';
import grayRamenImage from '../../assets/images/foods/ramen-gray.png';
import multiJuiceImage from '../../assets/images/foods/soda-x10.png';
import ConvertedFood from './ConvertedFood';
import colors from '../../assets/variables/colors';
import divide_amount from '../../utils/divide_amount';

export default ({ foodAmounts }) => (
  <View style={styles.wrapper}>
    <Text style={styles.message}>お礼は一人あたり...</Text>
    <ScrollView>
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
    flex: 1,
    justifyContent: "flex-start",
    // alignItems: "flex-start",
    width: "90%"
  },
  message: {
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 80,
    color: colors.white,
    marginTop: 16
  }
});