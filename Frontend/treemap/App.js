import React, { useRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Sites from "./components/Sites";
import Trees from "./components/Trees";
import Mapbox from "@rnmapbox/maps";
import Slider from "./components/Slider";

Mapbox.setAccessToken(
  "pk.eyJ1IjoidGlpcm5ha28iLCJhIjoiY2xzb2JiZXI4MGRiODJrb3c5NnlmZnRjYyJ9.Fv2ex2k4_1efbXdhZjMl1Q"
);

const App = () => {
  const sliderRef = useRef();
  const [sliderTitle, setSliderTitle] = useState("");

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView
          scaleBarEnabled={false}
          styleURL="mapbox://styles/tiirnako/clsoeendf04ev01nlbuki52pf"
          style={styles.map}
          deselectAnnotationOnTap={true}
        >
          <Mapbox.Camera
            zoomLevel={10}
            centerCoordinate={[-95.92682, 36.135769]}
            animationMode={"none"}
          />
          {/* <Trees /> */}
          <Sites sliderRef={sliderRef} setSliderTitle={setSliderTitle} />
        </Mapbox.MapView>
        <Slider sliderTitle={sliderTitle} sliderRef={sliderRef} />
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
