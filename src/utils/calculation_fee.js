import { GOOGLE_MAP_DIRECTIONS_KEY } from "../../.env";

export default ({}) => {
  fetch(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${key}&mode=driving`
  )
    .then(r =>
      r.json().then(res =>
        res.routes.map(route => {
          console.log(route);
          console.log("==============================================");
        })
      )
    )
    .catch(e => e.json().then(err => console.log(err)));
  console.log(origin, destination);
};
