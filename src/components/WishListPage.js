import React, { Component } from "react";
import { View, StyleSheet, Alert, Text, Modal } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import firebase, { wishListActions } from "../../utils/firebase";
import colors from "../../assets/variables/colors";
import omit_text from "../../utils/omit_text";

import Loading from "../../libs/components/Loading";
import Form from "../../libs/components/Form";
import Button from "../../libs/components/Button";
import RefreshContainer from "../../libs/components/RefreshContainer";
import HeadLine from "../../libs/components/HeadLine";
import FormattedText from "../../libs/components/FormattedText";

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

  deleteWishItem = async id => {
    this.setState({ loading: true });
    await wishListActions.delete(id);
    this.fetchWishLists();
  };

  toggleModalVisible = () => {
    const { modalVisible } = this.state;
    this.setState({ modalVisible: !modalVisible });
  };

  render() {
    const { wishList, title, price, refreshing, errorMessage } = this.state;
    return (
      <RefreshContainer refreshing={refreshing} onRefresh={this.onRefresh}>
        <HeadLine pageName="Wish List" />
        <View style={styles.wishListContainer}>
          <View style={styles.wishListWrapper}>
            {wishList.map((d, index) => (
              <View style={styles.wishItem} key={index}>
                <FormattedText
                  fontSize={20}
                  key={index}
                  category={omit_text(d.title)}
                  value={`¥${d.price}`}
                />
                <Icon
                  name="closecircleo"
                  color={colors.gray}
                  onPress={() => this.deleteWishItem(d.id)}
                  style={styles.deleteIcon}
                />
              </View>
            ))}
          </View>
          <Icon
            name="pluscircleo"
            style={styles.addIcon}
            onPress={this.toggleModalVisible}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}>
          <View style={styles.modalContainer}>
            <HeadLine pageName="Add Wish Item" />
            <View style={styles.addWishForm}>
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
              <Button text="閉じる" onPress={this.toggleModalVisible} />
            </View>
          </View>
        </Modal>
      </RefreshContainer>
    );
  }
}

const styles = StyleSheet.create({
  wishListContainer: {
    height: "80%",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between"
  },
  wishListWrapper: {},
  addIcon: {
    height: 48,
    width: 48,
    fontSize: 48,
    color: colors.accent
  },
  wishItem: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    marginBottom: 12,
    width: "90%"
  },
  deleteIcon: {
    height: 24,
    width: 24,
    fontSize: 24,
    marginLeft: 8
  },
  modalContainer: {
    flex: 1,
    fontFamily: "mplus-1p-r",
    alignItems: "center",
    color: colors.white,
    backgroundColor: colors.main
  },
  addWishForm: {
    height: "80%",
    justifyContent: "center",
    alignItems: "center"
  }
});
