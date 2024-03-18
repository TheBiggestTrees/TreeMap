import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, StatusBar, TouchableHighlight } from "react-native";
import Sites from "./components/Sites";
import Trees from "./components/Trees";
import Mapbox from "@rnmapbox/maps";
import Slider from "./components/Slider";
import Splash from "./components/Splash";
import Icons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import * as Location from "expo-location";
import AddSite from "./components/AddSite";

Mapbox.setAccessToken(
  "pk.eyJ1IjoidGlpcm5ha28iLCJhIjoiY2xzb2JiZXI4MGRiODJrb3c5NnlmZnRjYyJ9.Fv2ex2k4_1efbXdhZjMl1Q"
);
const API_URL = "https://teal-goose-sock.cyclic.app";

const App = () => {
  const sliderRef = useRef();
  const mapRef = useRef();
  const camera = useRef();

  const [sites, setSites] = useState(null);
  const [location, setLocation] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [sliderTitle, setSliderTitle] = useState("");
  const [showSplash, setShowSplash] = useState(true);
  const [selectedTrees, setSelectedTrees] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);
  const [showAddSite, setShowAddSite] = useState(false);
  const [customMark, setCustomMark] = useState([0, 0]);
  const [showCustomMark, setShowCustomMark] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrMsg("Permissions denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const addNewSite = async () => {
    if (customMark && showCustomMark) {
      const temp = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [...customMark],
        },
        properties: {
          siteID: 0,
          trees: "",
        },
      };

      axios
        .post(`${API_URL}/site/`, temp)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const temp = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [location.coords.longitude, location.coords.latitude],
        },
        properties: {
          siteID: 0,
          trees: "",
        },
      };

      axios
        .post(`${API_URL}/site/`, temp)
        .then((res) => {
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    try {
      const data = await axios({
        method: "get",
        url: API_URL + "/site/",
      });

      data.data.data.features.map((site, index) => {
        site.id = data.data.data.features[index]._id;
      });
      console.log(data.data.message);
      setSites(data.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addNewTree = async () => {
    const temp = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [null],
      },
      properties: {
        treeID: 0,
        treeSpecies: "Oak",
        needsWork: false,
        datePlanted: "Today",
        lastWorkDate: "N/A",
        siteID: 0,
      },
    };

    axios
      .post(`${API_URL}/tree/`, temp)
      .then((res) => {
        console.log(res.data.data);
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
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
            zoomLevel={15}
            centerCoordinate={[-95.959888483577, 36.131068862193]}
            animationMode={"none"}
            ref={camera}
          />

          <Trees apiURL={API_URL} />
          <Sites
            sites={sites}
            setSites={setSites}
            apiURL={API_URL}
            sliderRef={sliderRef}
            setSliderTitle={setSliderTitle}
            selectedSite={selectedSite}
            setSelectedSite={setSelectedSite}
            selectedTrees={selectedTrees}
            setSelectedTrees={setSelectedTrees}
            camera={camera}
          />
          {showCustomMark && (
            <Mapbox.PointAnnotation
              draggable={true}
              id="customMark"
              onDrag={(e) => {
                setCustomMark(e.geometry.coordinates);
              }}
              coordinate={[location.coords.longitude, location.coords.latitude]}
            />
          )}
        </Mapbox.MapView>

        {showAddSite && (
          <AddSite
            addNewSite={addNewSite}
            customMark={customMark}
            showCustomMark={showCustomMark}
            setSites={setSites}
            setShowCustomMark={setShowCustomMark}
            API_URL={API_URL}
            setShowAddSite={setShowAddSite}
            location={location}
          />
        )}
        {!showAddSite && !showCustomMark && (
          <TouchableHighlight
            className="rounded-lg w-[60px] h-[60px] flex items-center justify-center bg-[#6b7280] absolute top-[5%] right-[5%]"
            activeOpacity={0.5}
            underlayColor="#6b7280"
            onPress={() => {
              setShowAddSite(true);
            }}
          >
            <Icons name="add-circle" size={40} color="#56ccdb"></Icons>
          </TouchableHighlight>
        )}
        {showCustomMark && (
          <>
            <TouchableHighlight
              className="rounded-lg w-[60px] h-[60px] flex items-center justify-center bg-[#6b7280] absolute bottom-[5%] left-[5%]"
              activeOpacity={0.5}
              underlayColor="#6b7280"
              onPress={() => {
                setShowAddSite(true);
                setShowCustomMark(false);
              }}
            >
              <Icons name="undo" size={40} color="#56ccdb"></Icons>
            </TouchableHighlight>

            <TouchableHighlight
              className="rounded-lg w-[60px] h-[60px] flex items-center justify-center bg-[#6b7280] absolute bottom-[5%] right-[5%]"
              activeOpacity={0.5}
              underlayColor="#6b7280"
              onPress={() => {
                addNewSite();
                setShowAddSite(true);
                setShowCustomMark(false);
              }}
            >
              <Icons name="task-alt" size={40} color="#56ccdb"></Icons>
            </TouchableHighlight>
          </>
        )}
        <Slider
          selectedSite={selectedSite}
          selectedTrees={selectedTrees}
          sliderTitle={sliderTitle}
          sliderRef={sliderRef}
          addNewTree={addNewTree}
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
