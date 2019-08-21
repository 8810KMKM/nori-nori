import React from "react";
import { _ } from "underscore";
import { Image, View, StyleSheet } from "react-native";
import resize_image from "../../utils/resize_image";
import colors from "../../assets/variables/colors";

export default ({ amount, icon, grayIcon, multiIcon }) => {
  const singleSize = resize_image(amount);
  const multiSize = resize_image(amount);

  const styles = StyleSheet.create({
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
    },
    mask: {
      backgroundColor: colors.blue,
      position: "relative",
      width: singleSize,
      height: singleSize,
      borderWidth: 3,
      marginRight: 10,
      zIndex: 100
    }
  });

  const multiAmount = Math.floor(amount / 10);
  const singleAmount = amount - Math.floor(amount / 10) * 10;

  return (
    <>
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
                style={i === singleAmount ? styles.mask : styles.singleIcon}
                source={icon}
              />
            ))}
          </View>
        </>
      )}
    </>
  );
};
