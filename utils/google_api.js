import { Alert } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import {
  GOOGLE_API_KEY,
  GOOGLE_API_KEY_2,
  GOOGLE_MAP_DIRECTIONS_URL,
  GOOGLE_MAP_GEOCODING_URL,
  GOOGLE_MAP_PLACE_AUTOCOMPLETE_URL
} from "react-native-dotenv";

export const getCurrentLocation = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    Alert.alert(
      "端末のアプリ設定から現在地取得の権限を許可するか、再インストールしてください。"
    );
    throw new Error();
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
      .catch(e => {
        Alert.alert("現在地の取得に失敗しました");
        throw new Error();
      });
  }
};

export const fetchDirections = async (origin, destination) => {
  return await fetch(
    `${GOOGLE_MAP_DIRECTIONS_URL}?origin=${origin}&destination=${destination}&key=${GOOGLE_API_KEY}&language=ja`
  )
    .then(res => res.json())
    .catch(e => e.json().then(err => console.log(err)));
};

export const fetchPlaceAutocomplete = async keyword => {
  const uuidv1 = require("uuid/v1");
  return await fetch(
    `${GOOGLE_MAP_PLACE_AUTOCOMPLETE_URL}?input=${keyword}&types=establishment&key=${GOOGLE_API_KEY_2}&language=ja&sessiontoken=${uuidv1()}`
  )
    .then(response =>
      response.json().then(res => {
        return res.predictions;
      })
    )
    .catch(err => Alert.alert(err));
};
