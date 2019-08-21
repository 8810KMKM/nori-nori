import React from "react";
import AwesomeButtonCartman from "react-native-really-awesome-button/src/themes/cartman";
import colors from "../../assets/variables/colors";
import { View, StyleSheet, Dimensions } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import fonts from "../../assets/variables/fonts";

const { height, width } = Dimensions.get("window");

export default ({ onPress, text, width = 120, height = 60 }) => (
  <View style={styles.wrapper}>
    <AwesomeButtonCartman
      backgroundColor={colors.accent}
      textSize={28}
      textLineHeight={0}
      textColor={colors.main}
      textFontFamily="mplus-1p-b"
      height={height}
      width={width}
      onPress={onPress}>
      {text}
    </AwesomeButtonCartman>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {}
});
