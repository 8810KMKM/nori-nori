import React, { Component } from "react";
import { Alert } from "react-native";

import firebase, { wishListActions } from "../../utils/firebase";

import RefreshContainer from "../../libs/components/RefreshContainer";
import AddWithModal from "../../libs/components/AddWithModal";
import WishList from "../../libs/components/WishList";
import Loading from "../../libs/components/Loading";

export default class extends Component {
  state = {
    wishList: [],
    title: "",
    price: "",
    errorMessage: { title: "", price: "" },
    refreshing: false,
    loading: false,
    modalVisible: false
  };

  onRefresh = async () => {
    this.setState({ refreshing: true });
    this.fetchWishLists();
    this.setState({
      title: "",
      price: "",
      errorMessage: { title: "", price: "" },
      refreshing: false
    });
  };

  fetchWishLists = async () => {
    this.setState({ loading: true });
    const wishList = await wishListActions.index();
    this.setState({ wishList, loading: false });
  };

  componentDidMount() {
    this.fetchWishLists();
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
    this.fetchWishLists();
    this.setState({
      title: "",
      price: "",
      errorMessage: { title: "", price: "" },
      loading: false,
      modalVisible: false
    });
  };

  deleteWishItem = id => {
    const confirmedDelete = async id => {
      await wishListActions.delete(id);
      this.fetchWishLists();
    };
    this.setState({ loading: true });
    Alert.alert("", "削除してもよろしいですか？", [
      {
        text: "削除",
        onPress: () => confirmedDelete(id)
      },
      {
        text: "キャンセル",
        onPress: () => console.log("cancel")
      }
    ]);
    this.setState({ loading: false });
  };

  toggleModalVisible = () => {
    const { modalVisible } = this.state;
    this.setState({ modalVisible: !modalVisible });
  };

  handleChange = (target, text) => {
    this.setState({ [target]: text });
  };

  render() {
    const { loading, refreshing } = this.state;
    return (
      <RefreshContainer refreshing={refreshing} onRefresh={this.onRefresh}>
        {loading && <Loading />}
        <AddWithModal
          {...this.state}
          handleChange={this.handleChange}
          createWishItem={this.createWishItem}
          toggleModalVisible={this.toggleModalVisible}
        />
        <WishList
          {...this.state}
          deleteWishItem={this.deleteWishItem}
          toggleModalVisible={this.toggleModalVisible}
        />
      </RefreshContainer>
    );
  }
}
