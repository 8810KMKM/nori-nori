import { StyleSheet } from "react-native";
import colors from "../../variables/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: colors.white,
    backgroundColor: colors.main
  },
  input: {
    height: 60,
    width: 200,
    fontSize: 80,
    color: colors.white,
    fontWeight: "bold",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 30
  }
});
