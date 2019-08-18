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

  const mapScale = data.distance.value / 160000;
  const latitudeRegion = (start_latLng.latitude + end_latLng.latitude) / 2;
  const longitudeRegion = (start_latLng.longitude + end_latLng.longitude) / 2;
  const region = {
    latitude: latitudeRegion,
    longitude: longitudeRegion,
    longitudeDelta: mapScale,
    latitudeDelta: mapScale
  };

  return {
    region,
    start_latLng,
    end_latLng,
    responseOrigin,
    responseDestination,
    distance,
    duration,
    useFuelAmount,
    feeOfFuel,
    payPerPerson
  };
};
