import React, { Component } from "react";
import { Router, Scene } from "react-native-router-flux";
import WelcomePage from "./src/components/WelcomePage"
import DestinationForm from "./src/components/DestinationForm";
import * as Font from "expo-font";
import { Recorded } from "rx";
import ResultPage from "./src/components/ResultPage";

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
          <Scene key="form" component={DestinationForm} />
          <Scene key="result" component={ResultPage}/>
        </Scene>
      </Router>
    ) : null;
  }
}
