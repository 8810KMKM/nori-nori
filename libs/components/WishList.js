import React, { Component } from "react";
import { View, StyleSheet, Modal, Dimensions, ScrollView } from "react-native";

import colors from "../../assets/variables/colors";
import omit_text from "../../utils/omit_text";

import Loading from "../../libs/components/Loading";
import HeadLine from "../../libs/components/HeadLine";
import ListLabel from "../../libs/components/ListLabel";
import Icon from "react-native-vector-icons/AntDesign";

export default ({ wishList, deleteWishItem, toggleModalVisible }) => {
  return (
    <>
      <HeadLine pageName="Wish List" />
      <View style={styles.wishListContainer}>
        <ScrollView contentContainerStyle={styles.wishListWrapper}>
          {wishList.map((d, index) => (
            <View style={styles.wishItem} key={index}>
              <ListLabel
                fontSize={20}
                key={index}
                title={omit_text(d.title)}
                text={`¥${d.price}`}
              />
              <Icon
                name="closecircleo"
                color={colors.gray}
                onPress={() => deleteWishItem(d.id)}
                style={styles.deleteIcon}
              />
            </View>
          ))}
        </ScrollView>
        <Icon
          name="pluscircleo"
          style={styles.addIcon}
          onPress={toggleModalVisible}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wishListContainer: {
    height: "80%",
    alignItems: "center",
    justifyContent: "space-between"
  },
  wishListWrapper: {
    width: Dimensions.get("window").width * 0.9
  },
  addIcon: {
    height: 48,
    width: 48,
    fontSize: 48,
    marginVertical: 8,
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
  }
});
