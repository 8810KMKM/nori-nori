import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Router, Scene, Tabs } from "react-native-router-flux";
import Icon from "react-native-vector-icons/AntDesign";

import TopPage from "../src/components/TopPage";
import ResultPage from "../src/components/ResultPage";
import DetailPage from "../src/components/DetailPage";
import Setting from "../src/components/Setting";
import WishListPage from "../src/components/WithListPage";

import topIcon from "../assets/icon.png";
import colors from "../assets/variables/colors";

// 色とかいい感じに頼む
const styles = StyleSheet.create({
  tabIconContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  tabIcon: {
    width: 24,
    height: 24,
    fontSize: 24,
    marginTop: 8,
    marginBottom: 2
  }
});

const TabBarIcon = props => {
  return (
    <View style={styles.tabIconContainer}>
      <Icon
        name={props.iconName}
        color={props.focused ? colors.main : colors.gray}
        style={styles.tabIcon}
      />
    </View>
  );
};

export default ({}) => {
  return (
    <Router>
      <Scene key="root" hideNavBar={true}>
        <Tabs key="tabBar" swipeEnabled={true} animationEnabled={true}>
          <Scene
            key="top"
            initial
            component={TopPage}
            iconName="car"
            icon={TabBarIcon}
            hideNavBar={true}
          />
          <Scene
            key="withList"
            component={WishListPage}
            iconName="car"
            icon={TabBarIcon}
            hideNavBar={true}
          />
          <Scene
            key="setting"
            component={Setting}
            iconName="setting"
            icon={TabBarIcon}
            hideNavBar={true}
          />
        </Tabs>
        <Scene key="result" component={ResultPage} title="結果" />
        <Scene key="detail" component={DetailPage} title="詳細" />
      </Scene>
    </Router>
  );
};
