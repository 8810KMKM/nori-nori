import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../../../assets/styleSheets/components/welcomePage'
import MyButton from '../../utils/MyButton';


class WelcomePage extends Component{
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>nori-nori</Text>
        <MyButton
          text={"ドライブする"}
          action={() => Actions.refresh()}
        />
      </View>
    )
  }
}

export default WelcomePage