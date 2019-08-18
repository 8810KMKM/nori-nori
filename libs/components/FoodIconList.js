import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import resize_image from '../../utils/resize_image';

export default ({ amount, icon, grayIcon, multiIcon }) => {
  const singleSize = resize_image(amount.single);
  const multiSize = resize_image(amount.multi);

  const styles = StyleSheet.create({
    icons: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "flex-start",
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

  const SingleIcons = () => amount.single === 0 ?
    <Image
      style={styles.singleIcon}
      source={grayIcon}
    />
    :
    <View style={styles.icons}>
      {
        [...Array(amount.single)].map((_, i) => (
          <Image
            key={i}
            style={styles.singleIcon}
            source={icon}
          />
        ))
      }
    </View> 
  
  const MultiIcons = () => amount.multi === 0 ?
    <></>
    :
    <View style={styles.icons}>
      {
        [...Array(amount.multi)].map((_, i) => (
          <Image
            key={i}
            style={styles.multiIcon}
            source={multiIcon}
          />
        ))
      }
    </View>
  
  return (
    <View>
      <MultiIcons />
      <SingleIcons />
    </View>
  );
};