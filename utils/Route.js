import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Router, Scene, Tabs } from "react-native-router-flux";
import Icon from "react-native-vector-icons/AntDesign";

import TopPage from "../src/components/TopPage";
import ResultPage from "../src/components/ResultPage";
import DetailPage from "../src/components/DetailPage";
import SettingPage from "../src/components/SettingPage";
import WishListPage from "../src/components/WishListPage";
import AccountPage from "../src/components/AccountPage";

import topIcon from "../assets/icon.png";
import colors from "../assets/variables/colors";

// 色とかいい感じに頼む
const styles = StyleSheet.create({
  tabIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    color: colors.main
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
      <Scene key="root" hideNavBar>
        <Tabs key="tabBar" swipeEnabled={true} animationEnabled={true}>
          <Scene
            key="top"
            initial
            component={TopPage}
            iconName="car"
            icon={TabBarIcon}
            hideNavBar
          />
          <Scene
            key="wish list"
            component={WishListPage}
            iconName="profile"
            icon={TabBarIcon}
            hideNavBar
          />
          <Scene
            key="setting"
            component={SettingPage}
            iconName="setting"
            icon={TabBarIcon}
            hideNavBar
          />
          <Scene
            key="account"
            component={AccountPage}
            iconName="user"
            icon={TabBarIcon}
            hideNavBar
          />
        </Tabs>
        <Scene key="result" component={ResultPage} title="結果" />
        <Scene key="detail" component={DetailPage} title="詳細" />
      </Scene>
    </Router>
  );
};
