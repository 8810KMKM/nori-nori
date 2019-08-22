import omni_text from "./omit_text";
import { wishListActions } from "../utils/firebase";

export default fee => {
  const juice = Math.round((fee / 100) * 10) / 10;
  const burger = Math.round((fee / 500) * 10) / 10;
  const ramen = Math.round((fee / 1000) * 10) / 10;

  return { juice, burger, ramen };
};

export const detailFormat = (data, calcData, fee) => {
  const start_latLng = {
    latitude: data.start_location.lat,
    longitude: data.start_location.lng
  };
  const end_latLng = {
    latitude: data.end_location.lat,
    longitude: data.end_location.lng
  };
  const [responseOrigin, responseDestination] = [
    data.start_address,
    data.end_address
  ];
  const [distance, duration] = [data.distance.text, data.duration.text];
  const { useFuelAmount, feeOfFuel, payPerPerson } = calcData;

  const mapScale = data.distance.value / 100000;
  const latitudeRegion = (start_latLng.latitude + end_latLng.latitude) / 2;
  const longitudeRegion = (start_latLng.longitude + end_latLng.longitude) / 2;
  const region = {
    latitude: latitudeRegion,
    longitude: longitudeRegion,
    longitudeDelta: mapScale,
    latitudeDelta: mapScale
  };
  const details = [
    { title: "出発地", text: omni_text(responseOrigin) },
    { title: "到着地", text: omni_text(responseDestination) },
    { title: "距離", text: distance },
    { title: "時間", text: duration },
    {
      title: "ガソリン消費量",
      text: `${Math.round(useFuelAmount * 10) / 10}リットル`
    },
    { title: "ガソリン代", text: `${Math.round(feeOfFuel)}円` },
    { title: "同乗者のお礼合計", text: `${fee}円` },
    { title: "一人あたりのお礼", text: `${Math.round(payPerPerson)}円` }
  ];

  return { region, start_latLng, end_latLng, details };
};

export const placesFormat = data => {
  return data && data.length > 0
    ? data.map(d => d.structured_formatting.main_text)
    : [];
};

export const wishListFormat = async fee => {
  const wishList = await wishListActions.index();
  const canBuyWishList = wishList.filter(item => item.price < fee);
  return canBuyWishList.slice(-1)[0];
};
