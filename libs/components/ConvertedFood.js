import React from "react";
import { _ } from "underscore";
import { View, Image, StyleSheet, Svg } from "react-native";

import resize_image from "../../utils/resize_image";
import colors from "../../assets/variables/colors";

import ListLabel from "./ListLabel";

export default ({ name, amount, icon, grayIcon, multiIcon }) => {
  const singleSize = resize_image(amount);
  const multiSize = resize_image(amount);
  const styles = StyleSheet.create({
    resultContainer: {
      width: "100%"
    },
    icons: {
      flexWrap: "wrap",
      flexDirection: "row",
      marginBottom: 16
    },
    singleIcon: {
      width: singleSize,
      height: singleSize,
      margin: 4
    },
    multiIcon: {
      width: multiSize,
      height: multiSize,
      margin: 4
    }
  });

  const multiAmount = Math.floor(amount / 10);
  const singleAmount = amount - Math.floor(amount / 10) * 10;

  return (
    <View style={styles.resultContainer}>
      <ListLabel
        title={name}
        text={amount === 0 ? "--" : `${amount}個`}
        fontSize={24}
      />
      {amount === 0 ? (
        <Image style={styles.singleIcon} source={grayIcon} />
      ) : (
        <>
          <View style={styles.icons}>
            {multiAmount !== 0 &&
              _.times(multiAmount, i => (
                <Image key={i} style={styles.multiIcon} source={multiIcon} />
              ))}
          </View>
          <View style={styles.icons}>
            {_.times(singleAmount, i => (
              <Image key={i} style={styles.singleIcon} source={icon} />
            ))}
          </View>
        </>
      )}
    </View>
  );
};
