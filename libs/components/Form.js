import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import colors from "../../assets/variables/colors";
import currentLocationIcon from "../../assets/images/currentLocation.png";

export default ({
  label,
  value,
  handleChange,
  errorMessage,
  placeholder,
  formStyles,
  setCurrentLocation
}) => {
  const styles = defaultStyles(setCurrentLocation);
  return (
    <>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={text => handleChange(text)}
          autoCapitalize="none"
          style={styles.input}
          placeholder={placeholder}
        />
        {setCurrentLocation && (
          <TouchableOpacity
            style={styles.currentLocationIconContainer}
            onPress={setCurrentLocation}>
            <Image
              style={styles.currentLocationIcon}
              source={currentLocationIcon}
            />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.error}>{errorMessage}</Text>
    </>
  );
};

const defaultStyles = setCurrentLocation =>
  StyleSheet.create({
    labelContainer: {
      width: "90%"
    },
    label: {
      fontWeight: "bold",
      color: colors.white,
      fontSize: 24,
      marginBottom: 8
    },
    inputContainer: {
      flexDirection: "row",
      width: "90%"
    },
    input: {
      flex: 1,
      height: 56,
      paddingLeft: 8,
      fontSize: 24,
      backgroundColor: colors.white,
      color: colors.black,
      fontWeight: "bold",
      borderRadius: 8,
      borderTopRightRadius: setCurrentLocation && 0,
      borderBottomRightRadius: setCurrentLocation && 0
    },
    error: {
      marginTop: 8,
      marginBottom: 16,
      fontSize: 16,
      fontWeight: "bold",
      color: colors.accent
    },
    currentLocationIconContainer: {
      width: 56,
      height: 56,
      borderLeftWidth: 2,
      borderLeftColor: "gray",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.white,
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8
    },
    currentLocationIcon: {
      width: 36,
      height: 36
    }
  });
