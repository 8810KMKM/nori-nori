import React from "react";
import AwesomeButtonCartman from "react-native-really-awesome-button/src/themes/cartman";
import colors from "../../assets/variables/colors";
import { View, StyleSheet, Dimensions} from "react-native";

const { height, width } = Dimensions.get('window');

export default ({ onPress, text}) => (
  <View style={styles.wrapper}>
    <AwesomeButtonCartman
      backgroundColor={colors.accent}
      textSize={24}
      textColor={colors.main}
      textFontFamily="mplus-1p-b"
      width={width / 3}
      height={width / 6}
      onPress={onPress}>
      {text}
    </AwesomeButtonCartman>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 8,
    marginBottom: 24
  }
})
