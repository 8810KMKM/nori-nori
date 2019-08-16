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

export default async (origin, destination, people) => {
  const data = await fetchData(origin, destination);
  const route = data.routes[0];
  const leg = route.legs[0];
  const [distance, duration] = [leg.distance.value, leg.duration.value];

  // 燃費
  const fuel = 150000;
  // ガソリン代/リットル
  const cost = 140;
  return 500;
};
