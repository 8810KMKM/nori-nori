import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default amount => {
  switch (true) {
    case amount < 6:
      return width / 8;
    case amount < 11:
      return width / 9;
    case amount < 31:
      return width / 10;
    case amount < 51:
      return width / 12;
    default:
      return width / 8;
  }
};
