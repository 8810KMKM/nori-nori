import React, { Component } from "react";
import { View, StyleSheet, Alert, Text } from "react-native";

import firebase, { wishListActions } from "../../utils/firebase";

import Loading from "../../libs/components/Loading";
import Form from "../../libs/components/Form";
import Button from "../../libs/components/Button";
import RefreshContainer from "../../libs/components/RefreshContainer";

// TODO: 追加するときにuidをfieldに入れたい 自分の端末（アカウント）で追加したものを取得するため。

export default class extends Component {
  state = {
    wishLists: [],
    title: "",
    price: "",
    errorMessage: { title: "", price: "" },
    refreshing: false,
    loading: false
  };

  getInitialState = () => {
    return {
      wishLists: [],
      title: "",
      price: "",
      errorMessage: { title: "", price: "" },
      refreshing: false,
      loading: false
    };
  };

  onRefresh = async () => {
    const initialState = this.getInitialState();
    const wishLists = await wishListActions.index();
    this.setState({ ...initialState, wishLists, refreshing: true });
    this.setState({ refreshing: false });
  };

  fetchWishLists = async () => {
    this.setState({ loading: true });
    const wishLists = await wishListActions.index();
    this.setState({ wishLists, loading: false });
  };

  componentDidMount() {
    this.fetchWishLists();
  }

  createWishItem = async () => {
    const { title, price } = this.state;
    this.setState({ loading: true, title: "", price: "" });
    wishListActions.create(title, parseInt(price));
    this.fetchWishLists();
  };

  deleteWishItem = async id => {
    this.setState({ loading: true });
    await wishListActions.delete(id);
    this.fetchWishLists();
  };

  render() {
    const { wishLists, title, price, refreshing, errorMessage } = this.state;
    console.log(wishLists);
    return (
      <RefreshContainer refreshing={refreshing} onRefresh={this.onRefresh}>
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
          placeholder="例）1000, 100"
          keyboardType="number-pad"
        />
        <Button onPress={this.createWishItem} text="追加" />
      </RefreshContainer>
    );
  }
}
