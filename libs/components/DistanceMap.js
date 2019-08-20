import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

import originFlagIcon from "../../assets/images/flags/flag-origin.png";
import destinationFlagIcon from "../../assets/images/flags/flag-destination.png";

export default ({ region, start_latLng, end_latLng }) => {
  return (
    <MapView region={region} style={styles.map}>
      <Marker coordinate={start_latLng} title="origin" image={originFlagIcon} />
      <Marker
        coordinate={end_latLng}
        title="destination"
        image={destinationFlagIcon}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    position: "relative",
    marginBottom: 12,
    height: Dimensions.get("window").height * 0.21,
    width: Dimensions.get("window").width
  }
});
