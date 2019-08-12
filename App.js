import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import WelcomePage from './src/components/welcomePage';

export default function App() {
  return (
    <Router>
      <Scene key='main'>
        <Scene
          key='welcome'
          component={WelcomePage}
          initial={true}
        />
      </Scene>
    </Router>
  );
}
