import React, { Component } from "react";
import { Router, Scene } from "react-native-router-flux";
import * as Font from "expo-font";
import { Recorded } from "rx";

import Route from "./utils/Route";

export default class App extends Component {
  constructor(props) {
    super(props);
    global.__old_console_warn = global.__old_console_warn || console.warn;
    global.console.warn = (...args) => {
      let tst = (args[0] || "") + "";
      if (tst.startsWith("Setting a timer")) {
        return;
      }
      return global.__old_console_warn.apply(console, args);
    };
  }
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
