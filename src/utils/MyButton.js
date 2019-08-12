import React, { Component } from 'react';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import { Actions } from 'react-native-router-flux';
import colors from '../../assets/variables/colors';


export default class MyButton extends Component {
  render() {
    return (
      <AwesomeButtonCartman
        backgroundColor={colors.accent}
        textSize={16}
        textColor={colors.main}
        onPress={() => { Actions.refresh() }}
      >
        {this.props.text}
      </AwesomeButtonCartman>
    )
  }
}
