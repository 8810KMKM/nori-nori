import omni_text from "./omit_text";

export default fee => {
  const juice = Math.floor(fee / 100);
  const burger = Math.floor(fee / 500);
  const ramen = Math.floor(fee / 1000);

  return { juice, burger, ramen };
};

export const detailFormat = (data, calcData) => {
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
    { title: "一人あたりのお礼", text: `${Math.round(payPerPerson)}円` }
  ];

  return { region, start_latLng, end_latLng, details };
};
