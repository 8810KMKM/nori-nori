import React, {Component} from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Actions } from "react-native-router-flux";
import MyButton from "./MyButton";
import colors from "../../assets/variables/colors";
import globalStyles from "../../assets/styleSheets/globalStyles";

export default class ResultPage extends Component {
  render() {
    return (
      <View style={globalStyles.container}>
        <Text style={styles.message}>ドライバーへのお礼は</Text>
        {/* <Text style={styles.result}>
          {`${this.props.from}から${this.props.to}までいくよ`}
        </Text> */}
        <Image
          style={styles.result}
          source={require('../../assets/images/image.png')}
        />
        <MyButton text={"トップに戻る"} onPress={() => Actions.welcome()} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  message: {
    fontSize: 24,
    color: colors.white,
    fontWeight: "bold",
    marginBottom: 16
  },
  result: {
    height: 264,
    width: 264,
    marginHorizontal: 8,
    marginBottom: 40,
    borderColor: colors.white,
    borderWidth: 4,
    borderRadius: 8
  }
});