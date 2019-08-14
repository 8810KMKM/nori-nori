import React, { Component } from "react";
import AwesomeButtonCartman from "react-native-really-awesome-button/src/themes/cartman";
import colors from "../../assets/variables/colors";

export default class MyButton extends Component {
  render() {
    return (
      <AwesomeButtonCartman
        backgroundColor={colors.accent}
        textSize={24}
        textColor={colors.main}
        textFontFamily="mplus-1p-b"
        width={200}
        height={64}
        onPress={() => {
          this.props.onPress();
        }}>
        {this.props.text}
      </AwesomeButtonCartman>
    );
  }
}
