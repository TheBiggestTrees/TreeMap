import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Alert, StatusBar } from "react-native";
import Sites from "./components/Sites";
import Trees from "./components/Trees";
import Mapbox from "@rnmapbox/maps";
import Slider from "./components/Slider";
import Splash from "./components/Splash";

Mapbox.setAccessToken(
  "pk.eyJ1IjoidGlpcm5ha28iLCJhIjoiY2xzb2JiZXI4MGRiODJrb3c5NnlmZnRjYyJ9.Fv2ex2k4_1efbXdhZjMl1Q"
);

const App = () => {
  const sliderRef = useRef();
  const mapRef = useRef();
  const camera = useRef();
  const [showTreeLayer, setShowTreeLayer] = useState(false);
  const [sliderTitle, setSliderTitle] = useState("");
  const [showSplash, setShowSplash] = useState(true);

  return (
    <View style={styles.page}>
      <StatusBar />
      <View style={styles.container}>
        {showSplash && <Splash />}

        <Mapbox.MapView
          ref={mapRef}
          scaleBarEnabled={false}
          styleURL="mapbox://styles/tiirnako/clsoeendf04ev01nlbuki52pf"
          style={styles.map}
          onLayout={() => {
            setShowSplash(false);
          }}
        >
          <Mapbox.Camera
            zoomLevel={10}
            centerCoordinate={[-95.92682, 36.135769]}
            animationMode={"none"}
            ref={camera}
          />

          {showTreeLayer ? (
            <Trees />
          ) : (
            <Sites
              sliderRef={sliderRef}
              setShowTreeLayer={setShowTreeLayer}
              setSliderTitle={setSliderTitle}
              camera={camera}
            />
          )}
        </Mapbox.MapView>
        <Slider
          setShowTreeLayer={setShowTreeLayer}
          sliderTitle={sliderTitle}
          sliderRef={sliderRef}
        />
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
