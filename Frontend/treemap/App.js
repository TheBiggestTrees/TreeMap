import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  StatusBar,
  Button,
  TouchableHighlight,
} from "react-native";
import Sites from "./components/Sites";
import Trees from "./components/Trees";
import Mapbox from "@rnmapbox/maps";
import Slider from "./components/Slider";
import Splash from "./components/Splash";
import Icons from "@expo/vector-icons/MaterialIcons";

Mapbox.setAccessToken(
  "pk.eyJ1IjoidGlpcm5ha28iLCJhIjoiY2xzb2JiZXI4MGRiODJrb3c5NnlmZnRjYyJ9.Fv2ex2k4_1efbXdhZjMl1Q"
);
const API_URL = "https://teal-goose-sock.cyclic.app";

const App = () => {
  const sliderRef = useRef();
  const mapRef = useRef();
  const camera = useRef();

  const [sliderTitle, setSliderTitle] = useState("");
  const [showSplash, setShowSplash] = useState(true);
  const [selectedTrees, setSelectedTrees] = useState({
    properties: {
      trees: [""],
    },
  });
  const [selectedSite, setSelectedSite] = useState(null);

  const addNewSite = async () => {
    const temp = {
      type: "Feature",
      geometry: {
        type: "point",
        coordinates: [""],
      },
      properties: {
        siteID: "",
        trees: [""],
      },
    };
  };

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
            zoomLevel={17}
            centerCoordinate={[-95.959888483577, 36.131068862193]}
            animationMode={"none"}
            ref={camera}
          />

          <Trees apiURL={API_URL} />
          <Sites
            apiURL={API_URL}
            sliderRef={sliderRef}
            setSliderTitle={setSliderTitle}
            selectedSite={selectedSite}
            setSelectedSite={setSelectedSite}
            selectedTrees={selectedTrees}
            setSelectedTrees={setSelectedTrees}
            camera={camera}
          />
        </Mapbox.MapView>

        <TouchableHighlight
          className="rounded-lg w-[60px] h-[60px] flex items-center justify-center bg-[#6b7280] absolute top-[5%] right-[5%]"
          activeOpacity={0.5}
          underlayColor="#6b7280"
          onPress={() => {
            Alert.alert("Add site pressed");
          }}
        >
          <Icons name="add-circle" size={40} color="#56ccdb"></Icons>
        </TouchableHighlight>

        <Slider
          sliderTitle={sliderTitle}
          sliderRef={sliderRef}
          selectedSite={selectedSite}
          setSelectedSite={setSelectedSite}
          camera={camera}
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
