import React from "react";
import AwesomeButtonCartman from "react-native-really-awesome-button/src/themes/cartman";
import colors from "../../assets/variables/colors";
import { View, StyleSheet} from "react-native";

export default ({ onPress, text}) => (
  <View style={styles.wrapper}>
    <AwesomeButtonCartman
      backgroundColor={colors.accent}
      textSize={24}
      textColor={colors.main}
      textFontFamily="mplus-1p-b"
      width={120}
      height={64}
      onPress={onPress}>
      {text}
    </AwesomeButtonCartman>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 16,
    marginBottom: 40
  }
})
