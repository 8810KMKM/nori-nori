import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import styles from '../../../assets/styleSheets/components/welcomePage'

class WelcomePage extends Component{
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>nori-nori</Text>
        <Button
          style={styles.button}
          onPress={() => { Actions.refresh() }}
        >
          はじめる
        </Button>
      </View>
    )
  }
}

export default WelcomePage