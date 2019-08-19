import React, { Component } from "react";
import { View, StyleSheet, Alert, Text } from "react-native";
import { Actions } from "react-native-router-flux";

import { wishListActions, userActions } from "../../utils/firebase";

import Loading from "../../libs/components/Loading";
import Form from "../../libs/components/Form";
import Button from "../../libs/components/Button";
import RefreshContainer from "../../libs/components/RefreshContainer";

export default class extends Component {
  state = {
    wishLists: [],
    title: "",
    price: "",
    errorMessage: { title: "", price: "" },
    refreshing: false,
    loading: false,
    uid: ""
  };

  onRefresh = async () => {
    const wishLists = await wishListActions.index();
    this.setState({
      title: "",
      price: "",
      errorMessage: { title: "", price: "" },
      wishLists,
      refreshing: true
    });
    this.setState({ refreshing: false });
  };

  fetchWishLists = async () => {
    this.setState({ loading: true });
    const wishLists = await wishListActions.index();
    this.setState({ wishLists, loading: false });
  };

  setUid = async () => {
    const { uid } = await userActions.current();
    this.setState({ uid });
  };

  componentDidMount() {
    this.fetchWishLists();
    this.setUid();
  }

  createWishItem = async () => {
    const { title, price } = this.state;

    if (!title) {
      return this.setState({
        errorMessage: {
          title: "入力してください"
        }
      });
    }
    if (!price) {
      return this.setState({
        errorMessage: {
          price: "入力してください"
        }
      });
    }

    const filterInt = /^([1-9]\d*|0)$/;
    if (!filterInt.test(price)) {
      const errorMessage = "数字以外を入力しないでください";
      return this.setState({ errorMessage: { price: errorMessage } });
    }

    this.setState({ loading: true });
    wishListActions.create(title, parseInt(price));
    this.setState({
      title: "",
      price: "",
      errorMessage: { title: "", price: "" }
    });
    this.fetchWishLists();
  };

  deleteWishItem = async id => {
    this.setState({ loading: true });
    await wishListActions.delete(id);
    this.fetchWishLists();
  };

  render() {
    const {
      wishLists,
      title,
      price,
      refreshing,
      errorMessage,
      uid
    } = this.state;
    console.log(uid);
    return (
      <RefreshContainer refreshing={refreshing} onRefresh={this.onRefresh}>
        {uid ? (
          <>
            {wishLists.map((d, index) => (
              <View style={{ flex: 1 }} key={index}>
                <Text>{d.title}</Text>
                <Text>{d.price}</Text>
                <Text onPress={() => this.deleteWishItem(d.id)}>削除</Text>
              </View>
            ))}
            <Form
              label="ほしいもの"
              value={title}
              handleChange={text => this.setState({ title: text })}
              errorMessage={errorMessage.title}
              placeholder="例）本、もみじ饅頭"
            />
            <Form
              label="値段"
              value={price}
              handleChange={text => this.setState({ price: text })}
              errorMessage={errorMessage.price}
              placeholder="例）1200, 100"
              keyboardType="number-pad"
            />
            <Button onPress={this.createWishItem} text="追加" />
          </>
        ) : (
          <Button text="アカウント情報" onPress={Actions.account} />
        )}
      </RefreshContainer>
    );
  }
}
