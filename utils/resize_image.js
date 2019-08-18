import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default foodAmount => {
  switch (true) {
    case foodAmount < 6:
      return width / 8;
    case foodAmount < 11:
      return width / 9;
    case foodAmount < 31:
      return width / 10;
    case foodAmount < 51:
      return width / 12;
    default:
      return width / 8;
  }
};