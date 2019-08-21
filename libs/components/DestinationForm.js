import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import Button from "./Button";
import Form from "./Form";
import SelectBox from "./SelectBox";

export default ({
  origin,
  destination,
  people,
  errorMessage,
  handleChange,
  submit,
  setCurrentLocation
}) => {
  const people_count = [
    // { label: "1人", value: 1 },
    { label: "2人", value: 2 },
    { label: "3人", value: 3 },
    { label: "4人", value: 4 },
    { label: "5人", value: 5 },
    { label: "6人", value: 6 },
    { label: "7人", value: 7 },
    { label: "8人", value: 8 }
  ];

  const placeholder = {
    label: "人数を選択してください",
    value: null,
    color: "#9EA0A4"
  };

  return (
    <View style={styles.formContainer}>
      <Form
        label="出発地"
        value={origin.label}
        handleChange={text => handleChange("origin", text)}
        errorMessage={errorMessage.origin}
        placeholder="例）福岡県, 警固公園"
        setCurrentLocation={setCurrentLocation}
        editable={origin.label !== "現在地"}
      />
      <Form
        label="到着地"
        value={destination}
        handleChange={text => handleChange("destination", text)}
        errorMessage={errorMessage.destination}
        placeholder="例）北九州市, 門司港レトロ"
      />
      <SelectBox
        label="人数"
        onValueChange={value => handleChange("people", value)}
        items={people_count}
        value={people}
        placeholder={placeholder}
      />
      <Button text="決定!!" onPress={submit} />
    </View>
  );
};

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    height: "80%",
    alignItems: "center",
  }
});
