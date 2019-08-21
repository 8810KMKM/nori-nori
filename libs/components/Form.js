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
import fonts from "../../assets/variables/fonts";

export default ({
  label,
  value,
  handleChange,
  errorMessage,
  placeholder,
  formStyles,
  setCurrentLocation,
  editable,
  keyboardType
}) => {
  const styles = defaultStyles(setCurrentLocation);
  return (
    <View>
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
          editable={editable}
          keyboardType={keyboardType}
          secureTextEntry={label.match(/パスワード/) ? true : false}
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
    </View>
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
      fontSize: fonts.small,
      marginBottom: 8
    },
    inputContainer: {
      flexDirection: "row",
      width: "90%"
    },
    input: {
      flex: 1,
      height: fonts.small * 2.2,
      paddingLeft: 8,
      fontSize: fonts.small,
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
      fontSize: fonts.small,
      fontWeight: "bold",
      color: colors.accent
    },
    currentLocationIconContainer: {
      width: fonts.small * 2.2,
      height: fonts.small * 2.2,
      borderLeftWidth: 2,
      borderLeftColor: "gray",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.white,
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8
    },
    currentLocationIcon: {
      width: fonts.small * 1.5,
      height: fonts.small * 1.5
    }
  });
