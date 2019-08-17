import React from "react";
import AwesomeButtonCartman from "react-native-really-awesome-button/src/themes/cartman";
import colors from "../../assets/variables/colors";

export default ({ onPress, text }) => {
  return (
    <AwesomeButtonCartman
      backgroundColor={colors.accent}
      textSize={24}
      textColor={colors.main}
      textFontFamily="mplus-1p-b"
      width={200}
      height={64}
      onPress={onPress}>
      {text}
    </AwesomeButtonCartman>
  );
};
