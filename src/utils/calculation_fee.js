import {
  GOOGLE_MAP_DIRECTIONS_KEY,
  GOOGLE_MAP_DIRECTIONS_URL
} from "react-native-dotenv";

export default (origin, destination) => {
  fetch(
    `${GOOGLE_MAP_DIRECTIONS_URL}?origin=${origin}&destination=${destination}&key=${GOOGLE_MAP_DIRECTIONS_KEY}&mode=driving`
  )
    .then(r =>
      r.json().then(res =>
        res.routes.map(route => {
          console.log(route);
        })
      )
    )
    .catch(e => e.json().then(err => console.log(err)));
  console.log(origin, destination);
};
