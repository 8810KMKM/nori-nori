import { Alert } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import {
  GOOGLE_API_KEY,
  GOOGLE_MAP_DIRECTIONS_URL,
  GOOGLE_MAP_GEOCODING_URL
} from "react-native-dotenv";

export const getCurrentLocation = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    Alert.alert("現在地取得の権限を許可してください");
  } else {
    const currentLocation = await Location.getCurrentPositionAsync({});
    return await fetch(
      `${GOOGLE_MAP_GEOCODING_URL}?language=ja&latlng=${currentLocation.coords.latitude},${currentLocation.coords.longitude}&key=${GOOGLE_API_KEY}`
    )
      .then(response =>
        response.json().then(res => {
          return res.results[0].formatted_address;
        })
      )
      .catch(e => Alert.alert("現在地の取得に失敗しました"));
  }
};

export const fetchDirections = async (origin, destination) => {
  return await fetch(
    `${GOOGLE_MAP_DIRECTIONS_URL}?origin=${origin}&destination=${destination}&key=${GOOGLE_API_KEY}&language=ja`
  )
    .then(res => res.json())
    .catch(e => e.json().then(err => console.log(err)));
};
