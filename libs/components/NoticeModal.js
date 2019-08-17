import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import Modal from "react-native-modal";

import colors from "../../assets/variables/colors";

export default ({ text, isNoticeModalVisible, toggleNoticeModal }) => {
  return (
    <View>
      <Modal style={styles.bottomModal} isVisible={isNoticeModalVisible}>
        <View style={styles.modal}>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{text}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="閉じる" color="gray" onPress={toggleNoticeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: "flex-end",
    marginBottom: "10%"
  },
  modal: {
    backgroundColor: colors.white,
    borderRadius: 8,
    opacity: 0.9
  },
  messageContainer: {
    borderBottomWidth: 1
  },
  message: {
    fontSize: 20,
    fontWeight: "bold"
  },
  buttonContainer: {
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8
  }
});
