import React from "react";
import AwesomeButtonCartman from "react-native-really-awesome-button/src/themes/cartman";
import colors from "../../assets/variables/colors";
import { View, StyleSheet, Dimensions } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import fonts from "../../assets/variables/fonts";

const { height, width } = Dimensions.get('window');

export default ({ onPress, text, size = (width / 3) }) => (
  <View style={styles.wrapper}>
    <AwesomeButtonCartman
      backgroundColor={colors.accent}
      textSize={fonts.middle}
      textColor={colors.main}
      textFontFamily="mplus-1p-b"
      width={size}
      height={size / 2}
      onPress={onPress}>
      {text}
    </AwesomeButtonCartman>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8
  }
})
