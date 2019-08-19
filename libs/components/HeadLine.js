import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../assets/variables/colors';

export default ({pageName}) => (
  <View style={styles.wrapper}>
    <Text style={styles.headline}>{pageName}</Text>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 4
  },
  headline: {
    fontSize: 40,
    fontFamily: "erica",
    color: colors.accent
  }
})