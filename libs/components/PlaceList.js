import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import fonts from '../../assets/variables/fonts';
import colors from '../../assets/variables/colors';
import omit_text from '../../utils/omit_text';


export default ({ places, target, handleClick }) => (
  places && places.length > 0
    ?
    <View style={styles.placeList}>
      {places.map((place, i) => (
        <Text
          style={styles.place}
          key={i}
          onPress={() => handleClick(target, place)}
        >
          {omit_text(place)}
        </Text>
      ))}
    </View>
    :
    <></>
);

const styles = StyleSheet.create({
  placeList: {
    width: "90%",
    padding: 2,
    backgroundColor: colors.gray
  },
  place: {
    fontFamily: "mplus-1p-r",
    fontSize: fonts.small,
    lineHeight: fonts.small * 2,
    color: colors.black
  }
})