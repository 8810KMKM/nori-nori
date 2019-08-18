import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import colors from '../../assets/variables/colors';
import resize_image from '../../utils/resize_image';
import FoodIconList from '../../src/components/FoodIconList';

export default ({ name, amount, icon, grayIcon, multiIcon }) => {
  const imageSize = resize_image(amount);
  const imageStyle = StyleSheet.create({
    width: imageSize,
    height: imageSize,
    margin: 4
  })
  return (
    <View style={{ width: "100%" }}>
      <View style={styles.textWrapper}>
        <View style={styles.text}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.amount}>
            {amount.single === 0 && amount.multi === 0 ?
                "--"
                :
                `${amount.multi * 10 + amount.single}個`}
          </Text>
        </View>
      </View>
      <FoodIconList
        amount={amount}
        icon={icon}
        grayIcon={grayIcon}
        multiIcon = {multiIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textWrapper: {
    borderBottomWidth: 4,
    borderBottomColor: colors.gray,
    marginVertical: 8,
    width: "100%"
  },
  text: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  name: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 24
  },
  amount: {
    color: colors.accent,
    fontWeight: "bold",
    fontSize: 24
  }
});