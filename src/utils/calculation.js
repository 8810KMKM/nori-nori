import { AsyncStorage } from "react-native";
import {
  GOOGLE_MAP_DIRECTIONS_KEY,
  GOOGLE_MAP_DIRECTIONS_URL
} from "react-native-dotenv";

const fetchData = async (origin, destination) => {
  return await fetch(
    `${GOOGLE_MAP_DIRECTIONS_URL}?origin=${origin}&destination=${destination}&key=${GOOGLE_MAP_DIRECTIONS_KEY}`
  )
    .then(res => res.json())
    .catch(e => e.json().then(err => console.log(err)));
};

const additionalBonusDuration = duration => {};

export const feePerPeople = async (origin, destination, people) => {
  const data = await fetchData(origin, destination);
  const route = data.routes[0];
  const leg = route.legs[0];
  const [distance, duration] = [leg.distance.value, leg.duration.value];

  // const fuel = (await AsyncStorage.getItem("fuel")) || 15000;
  // const cost = (await AsyncStorage.getItem("cost")) || 140;
  const fuel = 15000;
  const cost = 140;

  const use_fuel_amount = distance / fuel;
  const fee = use_fuel_amount * cost;

  const fee_per_people = fee / people;

  return Math.round(fee_per_people / 10) * 10;
};
