import React, { Component } from "react";
import { Router, Scene } from "react-native-router-flux";
import * as Font from "expo-font";
import { Recorded } from "rx";

import Route from "./src/utils/Route";

export default class App extends Component {
  state = {
    fontLoaded: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      erica: require("./assets/fonts/EricaOne-Regular.ttf"),
      "mplus-1p-r": require("./assets/fonts/MPLUS1p-Regular.ttf"),
      "mplus-1p-b": require("./assets/fonts/MPLUS1p-Bold.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const { fontLoaded } = this.state;
    return fontLoaded ? <Route /> : null;
  }
}
