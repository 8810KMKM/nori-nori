import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import colors from '../../assets/variables/colors';
import resize_image from '../utils/resize_image';

export default ({ name, amount, foodIcon, grayFoodIcon }) => {
  const imageSize = resize_image(amount);
  return (
    <View style={{ width: "100%" }}>
      <View style={styles.textWrapper}>
        <View style={styles.text}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.amount}>{amount}個</Text>
        </View>
      </View>
      <View style={styles.images}>
        {
          amount === 0 ?
            <Image
              style={styles.image}
              source={grayFoodIcon}
            />
            :
            [...Array(amount)].map((_, i) => (
              <Image
                key={i}
                style={{
                  width: imageSize,
                  height: imageSize,
                  margin: 4
                }}
                source={foodIcon}
              />
            ))
        }
      </View>
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
  },
  images: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 16
  }
});