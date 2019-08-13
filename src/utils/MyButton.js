import React, { Component } from 'react';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import colors from '../../assets/variables/colors';


export default class MyButton extends Component {
  render() {
    return (
      <AwesomeButtonCartman
        backgroundColor={colors.accent}
        textSize={16}
        textColor={colors.main}
        textFontFamily='mplus-1p-b'
        onPress={() => { this.props.action() }}
      >
        {this.props.text}
      </AwesomeButtonCartman>
    )
  }
}
