import { Router, Scene } from "react-native-router-flux";
import WelcomePage from "../components/welcomePage";
import DistinationForm from "../components/distinationForm";

export default (
  <Router>
    <Scene key="home" component={WelcomePage} />
    <Scene key="distinationForm" component={DistinationForm} />
  </Router>
);
