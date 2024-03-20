import React, { useEffect, useRef, useState } from "react";
import { REACT_APP_MAPBOX_ACCESS_TOKEN, REACT_APP_API_URL } from '@env'
import { StyleSheet, Text, View, StatusBar, TouchableHighlight } from "react-native";
import Sites from "./components/Sites";
import Trees from "./components/Trees";
import Mapbox from "@rnmapbox/maps";
import Slider from "./components/Slider";
import Splash from "./components/Splash";
import Icons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import * as Location from "expo-location";
import AddSite from "./components/AddSite";
import SiteCustPos from "./components/SiteCustPos";

Mapbox.setAccessToken(REACT_APP_MAPBOX_ACCESS_TOKEN);
const API_URL = REACT_APP_API_URL;

const App = () => {
  const sliderRef = useRef();
  const mapRef = useRef();
  const camera = useRef();

  const [trees, setTrees] = useState({ type: "FeatureCollection", features: []});
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
        setErrMsg("Location permissions were denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const postSite = async (temp) => {
    try {
      const res = await axios.post(`${API_URL}/site/`, temp);
      const data = res.data.data;
      data.id = data._id;
      setSites((prev) => ({ ...prev, features: [...prev.features, data] }));
      console.log(res.data.message);
      console.log(data);
    } catch (err) {
      console.error(err);
      setErrMsg(err);
    }
  };

  const postTree = async (temp) => {
    try { 
      const res = await axios.post(`${API_URL}/tree/${selectedSite}`, temp);
      const data = res.data.data;
      setSelectedTrees((prev) => [...prev, data])
      setTrees((prev) => ({ ...prev, features: [...prev.features, data] }));
      console.log(res.data.message);
    } catch (err) { 
      console.error(err);
      setErrMsg(err);
    }
  };

  const addNewSite = async () => {
    let temp;
    if (customMark && showCustomMark) {
      temp = {
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
      setShowCustomMark(false);
    } else {
      temp = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [location.coords.longitude, location.coords.latitude],
        },
        properties: {
          siteID: "0",
          trees: "",
        },
      };
    }
    postSite(temp);
  };

  const addNewTree = () => {
    let temp
    temp = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [location.coords.longitude, location.coords.latitude],
      },
      properties: {
        treeID: 0,
        treeSpecies: "Oak",
        needsWork: false,
        datePlanted: "Today",
        lastWorkDate: "N/A",
        siteID: `${selectedSite}`,
      },
    }
    
    postTree(temp);

    //use treeTemp to add a new tree to the selected site in the database using the API /tree/:siteID

    // axios
    //   .post(`${API_URL}/tree/${selectedSite}`, treeTemp)
    //   .then((res) => {

        
    //     console.log(res.data.data);
    //     console.log(res.data.message);
    //   })
    //   .catch((err) => {
    //     console.log("Failed to Add Tree: ", err);
    //     setErrMsg(err);
    //   });

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
            zoomLevel={10}
            centerCoordinate={[-95.959888483577, 36.131068862193]}
            animationMode={"none"}
            ref={camera}
          />

          <Trees apiURL={API_URL} trees={trees} setTrees={setTrees} />
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
          {/* Custom Position Marker */}
          {showCustomMark && (
            <Mapbox.PointAnnotation
              draggable={true}
              id="customMark"
              onLayout={(e) => setCustomMark(e.geometry.coordinates)}
              onDrag={(e) => {
                setCustomMark(e.geometry.coordinates);
              }}
              coordinate={[-95.959888483577, 36.131068862193]}
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
          <SiteCustPos
            setShowAddSite={setShowAddSite}
            setShowCustomMark={setShowCustomMark}
            addNewSite={addNewSite}
          />
        )}
        <Slider
          setSelectedSite={setSelectedSite}
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
