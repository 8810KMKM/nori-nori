import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Router, Scene, Tabs } from "react-native-router-flux";

import TopPage from "../components/TopPage";
import ResultPage from "../components/ResultPage";
import Setting from "../components/Setting";

import topIcon from "../../assets/icon.png";

// 色とかいい感じに頼む
const styles = StyleSheet.create({
  tabIconContainerStyle: {
    justifyContent: "center",
    alignItems: "center"
  },
  tabIconStyle: {
    width: 24,
    height: 24
  }
});

const TabBarIcon = ({ iconName, focused }) => {
  return (
    <View style={styles.tabIconContainerStyle}>
      <Image style={styles.tabIconStyle} source={topIcon} />
    </View>
  );
};

export default ({}) => {
  return (
    <Router>
      <Tabs key="root" swipeEnabled={true} animationEnabled={true}>
        <Scene
          key="top"
          initial
          component={TopPage}
          // 画面上部
          title="Top"
          // タブアイコンの下
          tabBarLabel="nori-nori"
          icon={TabBarIcon}
        />
        <Scene
          key="setting"
          component={Setting}
          title="設定"
          tabBarLabel="settings"
        />
      </Tabs>
    </Router>
  );
};
