import React from "react";
import { _ } from "underscore";
import { View, Image, StyleSheet } from "react-native";

import resize_image from "../../utils/resize_image";

import ListLabel from "./ListLabel";

export default ({ name, amount, icon, grayIcon, multiIcon }) => {
  const multiAmount = Math.floor(amount / 10);
  const singleAmount = Math.floor(amount) - Math.floor(amount / 10) * 10;
  const singleLastScale = Math.sqrt(amount % 1);

  const multiSize = resize_image(multiAmount);
  const singleSize = resize_image(singleAmount);

  const styles = StyleSheet.create({
    resultContainer: {
      width: "100%"
    },
    icons: {
      flexWrap: "wrap",
      flexDirection: "row",
      marginBottom: 16,
      alignItems: "center"
    },
    multiIcon: {
      width: multiSize,
      height: multiSize,
      margin: 4
    },
    singleIcon: {
      width: singleSize,
      height: singleSize,
      margin: 4
    },
    singleIconLast: {
      width: singleSize * singleLastScale,
      height: singleSize * singleLastScale,
      margin: 4
    }
  });

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
            {_.times(singleAmount + 1, i => (
              <Image
                key={i}
                style={
                  i === singleAmount ? styles.singleIconLast : styles.singleIcon
                }
                source={icon}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
};
