import React, { Component } from "react";
import { View, StyleSheet, Alert, Text, Modal } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import firebase, { wishListActions } from "../../utils/firebase";

import Loading from "../../libs/components/Loading";
import Form from "../../libs/components/Form";
import Button from "../../libs/components/Button";
import RefreshContainer from "../../libs/components/RefreshContainer";
import HeadLine from "../../libs/components/HeadLine";
import FormattedText from "../../libs/components/FormattedText";
import colors from "../../assets/variables/colors";
import omit_text from "../../utils/omit_text";
import globalStyles from "../../assets/styleSheets/globalStyles";

// TODO: 追加するときにuidをfieldに入れたい 自分の端末（アカウント）で追加したものを取得するため。

export default class extends Component {
  state = {
    wishLists: [],
    title: "",
    price: "",
    errorMessage: { title: "", price: "" },
    refreshing: false,
    loading: false,
    modalVisible: false
  };

  getInitialState = () => {
    return {
      wishLists: [],
      title: "",
      price: "",
      errorMessage: { title: "", price: "" },
      refreshing: false,
      loading: false,
      modalVisible: false
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
    };

    const filterInt = /^([1-9]\d*|0)$/;
    if (!filterInt.test(price)) {
      const errorMessage = "数字以外を入力しないでください";
      return this.setState({ errorMessage: { price: errorMessage } });
    }

    this.setState({ loading: true });
    wishListActions.create(title, parseInt(price));
    this.setState({ ...this.getInitialState() });
    this.fetchWishLists();

    this.setModalVisible(false);
  };

  deleteWishItem = async id => {
    this.setState({ loading: true });
    await wishListActions.delete(id);
    this.fetchWishLists();
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  render() {
    const { wishLists, title, price, refreshing, errorMessage } = this.state;
    console.log(wishLists);
    return (
      <View style={globalStyles.container}>
        <HeadLine pageName="Wish List" />
        <View style={{ flex: 5 }}>
          <RefreshContainer refreshing={refreshing} onRefresh={this.onRefresh}>
            {/* ここから */}
            {wishLists.map((d, index) => (
              <View style={styles.wishList} key={index}>
                <View style={styles.wish}>
                  <FormattedText
                    key={index}
                    category={omit_text(d.title)}
                    value={`¥${d.price}`}
                  />
                  <Icon
                    name="closecircleo"
                    color={colors.gray}
                    onPress={() => this.deleteWishItem(d.id)}
                    style={styles.closeIcon}
                  />
                </View>
              </View>
            ))}
          </RefreshContainer>
        </View>
        {/* ここまで詳細画面みたいな感じでリスト表示したい */}
        {/* ここから */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          
          <View style={globalStyles.container}>
            <View style={styles.addWishContainer}>
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
            </View>
            <Button
              onPress={this.createWishItem}
              text="追加"
            />
            <Button text="閉じる" onPress={() => this.setModalVisible(false)} />
          </View>
        </Modal>
        {/* ここまでモーダルにしたい */}
        
        <Icon
          name="pluscircleo"
          style={styles.modalIcon}
          onPress={() => this.setModalVisible(true)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wishListContainer: {
    flex: 1,
    justifyContent: "flex-start"
  },
  wishList: {
    flex: 1,
    width: "90%",
  },
  wish: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    marginBottom: 8,
    width: "90%"
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    height: 24,
    width: 24,
    fontSize: 24,
    marginLeft: 8
  },
  addWishContainer: {
    height: 160,
    justifyContent: "center",
    marginBottom: 40,
  },
  modalIconContainer: {
    position: "absolute",
    top: 40,
    right: 24,
    height: 80,
    justifyContent: "center"
  },
  modalIcon: {
    flex: 1,
    height: 48,
    width: 48,
    fontSize: 48,
    color: colors.accent
  }
})
