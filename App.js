import React, {Component} from 'react';
import { Router, Scene } from 'react-native-router-flux';
import WelcomePage from './src/components/welcomePage';
import * as Font from 'expo-font'

export default class App extends Component {
  state = {
    fontLoaded: false
  }

  async componentDidMount() {
    await Font.loadAsync({
      'bangers-r': require('./assets/fonts/Bangers-Regular.ttf'),
      'mplus-1p-r': require('./assets/fonts/MPLUS1p-Regular.ttf'),
      'mplus-1p-b': require('./assets/fonts/MPLUS1p-Bold.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      this.state.fontLoaded ? (
        < Router >
          <Scene key='main'>
            <Scene
              key='welcome'
              component={WelcomePage}
              initial={true}
            />
          </Scene>
        </Router >
      ) : null
    )
  }
}
