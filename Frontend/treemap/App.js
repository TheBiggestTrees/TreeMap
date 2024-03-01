import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Mapbox from "@rnmapbox/maps";

Mapbox.setAccessToken(
  "pk.eyJ1IjoidGlpcm5ha28iLCJhIjoiY2xzb2JiZXI4MGRiODJrb3c5NnlmZnRjYyJ9.Fv2ex2k4_1efbXdhZjMl1Q"
);

const App = () => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView
          scaleBarEnabled={false}
          styleURL="mapbox://styles/tiirnako/clsoeendf04ev01nlbuki52pf"
          style={styles.map}
        >
          <Mapbox.Camera
            zoomLevel={10}
            centerCoordinate={[-95.92682, 36.135769]}
          />
        </Mapbox.MapView>
        <View className="bg-black">
          <Text className="text-white">Tailwind is working</Text>
        </View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: "100%",
    width: "100%",
  },
  map: {
    flex: 1,
  },
});
