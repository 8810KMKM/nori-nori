import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Router, Scene, Tabs } from "react-native-router-flux";

import TopPage from "../src/components/TopPage";
import ResultPage from "../src/components/ResultPage";
import Setting from "../src/components/Setting";

import topIcon from "../assets/icon.png";

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
      {/* ここはタイトル隠したほうがいいかもしれないね・・・ 任せる */}
      <Scene key="root" title="nori-nori">
        <Tabs key="tabBar" swipeEnabled={true} animationEnabled={true}>
          <Scene
            key="top"
            initial
            component={TopPage}
            // タブアイコンの下
            tabBarLabel="nori-nori"
            icon={TabBarIcon}
            // SceneにhideNavBarをしたら、画面上部のtitleが表示されなくなる
            hideNavBar={true}
          />
          <Scene
            key="setting"
            component={Setting}
            // 画面上部タイトル
            title="設定"
            tabBarLabel="settings"
          />
        </Tabs>
        <Scene key="result" component={ResultPage} title="結果" />
      </Scene>
    </Router>
  );
};
