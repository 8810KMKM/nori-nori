import React, { Component } from "react";
import { View, StyleSheet, Modal } from "react-native";
import Form from "../../libs/components/Form";
import Button from "../../libs/components/Button";
import HeadLine from "../../libs/components/HeadLine";

// TODO: キーボードでてきたらフォーム動くのやめたい

export default ({
  title,
  price,
  errorMessage,
  handleChange,
  modalVisible,
  createWishItem,
  toggleModalVisible
}) => {
  return (
    <Modal animationType="slide" transparent={false} visible={modalVisible}>
      <View style={styles.modalContainer}>
        <HeadLine pageName="Add Wish Item" />
        <View style={styles.addWishForm}>
          <Form
            label="ほしいもの"
            value={title}
            handleChange={text => handleChange("title", text)}
            errorMessage={errorMessage.title}
            placeholder="例）本、もみじ饅頭"
          />
          <Form
            label="値段"
            value={price}
            handleChange={text => handleChange("price", text)}
            errorMessage={errorMessage.price}
            placeholder="例）1200, 100"
            keyboardType="number-pad"
          />
          <View style={styles.actions}>
            <Button text="閉じる" onPress={toggleModalVisible} />
            <Button onPress={createWishItem} text="追加" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    fontFamily: "mplus-1p-r",
    alignItems: "center",
    color: colors.white,
    backgroundColor: colors.main
  },
  addWishForm: {
    height: "80%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  actions: {
    height: "15%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
