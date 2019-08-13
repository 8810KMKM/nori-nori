import React, { Component } from "react";
import { Router, Scene } from "react-native-router-flux";
import WelcomePage from "./src/components/welcomePage";
import DistinationForm from "./src/components/distinationForm";
import * as Font from "expo-font";

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
    return this.state.fontLoaded ? (
      <Router>
        <Scene key="main">
          <Scene key="welcome" component={WelcomePage} initial={true} />
          <Scene key="form" component={DistinationForm} />
        </Scene>
      </Router>
    ) : null;
  }
}
