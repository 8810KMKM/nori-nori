import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../../assets/variables/colors';

export default ({ name, amount, foodIcon }) => (
  <>
    <Text style={styles.name}>{name}</Text>
    <View style={styles.images}>
      {
        [...Array(amount)].map((_, i) => (
          <Image
            key={i}
            style={styles.image}
            source={foodIcon}
          />
        ))
      }
    </View>
  </>
);

const styles = StyleSheet.create({
  name: {
    color: colors.white,
    fontSize: 24,
    lineHeight: 32
  },
  images: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16
  },
  image: {
    width: 80,
    height: 80
  }
});