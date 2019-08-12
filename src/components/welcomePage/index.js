import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});

class WelcomePage extends Component{
  render() {
    return (
      <View style={styles.container}>
        <Text>のりのり</Text>
        <Button onPress={() => {Actions.refresh()}}>はじめる</Button>
      </View>
    )
  }
}

export default WelcomePage