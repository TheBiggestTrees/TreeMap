import React, { useEffect, useRef, useState } from "react";
import { REACT_APP_MAPBOX_ACCESS_TOKEN, REACT_APP_API_URL } from "@env";
import { StyleSheet, View, StatusBar, Text } from "react-native";
import Sites from "./components/Sites";
import Trees from "./components/Trees";
import Mapbox from "@rnmapbox/maps";
import Slider from "./components/Layout/Slider";
import Splash from "./components/Splash";
import axios from "axios";
import * as Location from "expo-location";
import AddSite from "./components/AddSite";
import NavBar from "./components/Layout/NavBar";

Mapbox.setAccessToken(REACT_APP_MAPBOX_ACCESS_TOKEN);
const API_URL = REACT_APP_API_URL;

const App = () => {
  const sliderRef = useRef();
  const mapRef = useRef();
  const camera = useRef();

  const [trees, setTrees] = useState({
    type: "FeatureCollection",
    features: [],
  });
  const [tempTreeForm, setTempTreeForm] = useState({});
  const [sites, setSites] = useState(null);
  const [location, setLocation] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [sliderTitle, setSliderTitle] = useState("");
  const [showSplash, setShowSplash] = useState(true);
  const [selectedTrees, setSelectedTrees] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);
  const [showAddSite, setShowAddSite] = useState(false);
  const [showAddTree, setShowAddTree] = useState(false);
  const [customMark, setCustomMark] = useState([0, 0]);
  const [showCustomMark, setShowCustomMark] = useState(false);
  const [showCustomTree, setShowCustomTree] = useState(false);
  const [showSelectedSite, setShowSelectedSite] = useState(false);

  useEffect(() => {
    (async () => {
      try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrMsg("Location permissions were " + status);
        console.log("Location permissions were " + status);
        return;
      }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrMsg("Could not get location from device");
        console.log(error);
      }
    })();
  }, []);

  const fetchTreesInSite = async (site) => {
    try {
      const data = await axios({
        method: "get",
        url: `${API_URL}/site/trees/${site}`,
        timeout: 8000,
      });
      setSelectedTrees(data.data.data.trees);
    } catch (err) {
      console.log(err);
    }
  };

  const postSite = async (temp) => {
    try {
      const res = await axios.post(`${API_URL}/site/`, temp);
      const data = res.data.data;
      data.id = data._id;
      setSites((prev) => ({ ...prev, features: [...prev.features, data] }));
      console.log(res.data.message);
      console.log(data);
      setSelectedSite(data.id);
      fetchTreesInSite(data.id);
      setSliderTitle(data.properties.siteID);
      setShowAddSite(false);
      sliderRef.current.show({
        toValue: 200,
      });

      camera.current?.setCamera({
        centerCoordinate: data.geometry.coordinates,
        zoomLevel: 15,
        animationDuration: 500,
        animationMode: "flyTo",
      });
    } catch (err) {
      console.error(err);
      setErrMsg(err);
    }
  };

  const postTree = async (temp) => {
    try {
      const res = await axios.post(`${API_URL}/tree/${selectedSite}`, temp);
      const data = res.data.data;
      setSelectedTrees((prev) => [...prev, data]);
      setTrees((prev) => ({ ...prev, features: [...prev.features, data] }));
      console.log(res.data.message);
    } catch (err) {
      console.error(err);
      setErrMsg(err);
    }
  };

  const addNewSite = async () => {
    const today = new Date();
    const date = today.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    const time = today.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const formattedDate = `${date} ${time}`;

    let temp;
    if (customMark && showCustomMark) {
      temp = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [...customMark],
        },
        properties: {
          siteID: "0",
          dateCreated: formattedDate,
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
          dateCreated: formattedDate,
          trees: "",
        },
      };
    }
    postSite(temp);
  };

  const addNewTree = () => {
    const today = new Date();
    const date = today.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    const time = today.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const formattedDate = `${date} ${time}`;

    let temp;

    if (customMark && showCustomTree) {
      temp = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [...customMark],
        },
        properties: {
          ...tempTreeForm,
          dateCreated: formattedDate,
          siteID: `${selectedSite}`,
        },
      };
      setShowCustomTree(false);
    } else {
      temp = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [location.coords.longitude, location.coords.latitude],
        },
        properties: {
          ...tempTreeForm,
          dateCreated: formattedDate,
          siteID: `${selectedSite}`,
        },
      };
    }

    postTree(temp);
  };

  return (
    <View style={styles.page}>
      <StatusBar backgroundColor={"#6b7280"} />
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

          {/** Add Site */}

          <Trees apiURL={API_URL} trees={trees} setTrees={setTrees} />
          <Sites
            setShowSelectedSite={setShowSelectedSite}
            setShowCustomMark={setShowCustomMark}
            fetchTreesInSite={fetchTreesInSite}
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
            setShowAddSite={setShowAddSite}
          />
          {/* Custom Position Marker */}
          {showCustomMark &&  (
            <Mapbox.PointAnnotation
              draggable={true}
              id="customMark"
              onLayout={(e) => setCustomMark(e.geometry.coordinates)}
              onDrag={(e) => {
                setCustomMark(e.geometry.coordinates);
              }}
              coordinate={location ? [location.coords.longitude, location.coords.latitude] : [-96, 35] }
            />
          )}
           {showCustomTree &&  (
            <Mapbox.PointAnnotation
              draggable={true}
              id="customMark"
              onLayout={(e) => setCustomMark(e.geometry.coordinates)}
              onDrag={(e) => {
                setCustomMark(e.geometry.coordinates);
              }}
              coordinate={location ? [location.coords.longitude, location.coords.latitude] : [-96, 35] }
            />
          )}
        </Mapbox.MapView>

        <Slider
          customMark={customMark}
          setSites={setSites}
          API_URL={API_URL}
          location={location}
          showAddSite={showAddSite}
          setShowAddSite={setShowAddSite}
          setShowCustomMark={setShowCustomMark}
          addNewSite={addNewSite}
          showCustomMark={showCustomMark}
          setTempTreeForm={setTempTreeForm}
          setSelectedSite={setSelectedSite}
          showSelectedSite={showSelectedSite}
          setShowSelectedSite={setShowSelectedSite}
          selectedSite={selectedSite}
          setSelectedTrees={setSelectedTrees}
          selectedTrees={selectedTrees}
          sliderTitle={sliderTitle}
          sliderRef={sliderRef}
          showAddTree={showAddTree}
          setShowCustomTree={setShowCustomTree}
          showCustomTree={showCustomTree}
          setShowAddTree={setShowAddTree} 
          addNewTree={addNewTree}
          camera={camera}
          sites={sites}
          trees={trees}
        />

        {errMsg && (
          <View className="flex w-full absolute right-1 m-auto top-16 items-center justify-center text-center">
            <View className="bg-red-400 p-4 rounded-3xl">
              <Text className="text-white font-bold text-md">{errMsg}</Text>
            </View>
          </View>
        )}
        <NavBar
          sliderRef={sliderRef}
          setShowSelectedSite={setShowSelectedSite}
          setShowAddSite={setShowAddSite}
          setShowCustomMark={setShowCustomMark}
          setShowCustomTree={setShowCustomTree}
          setShowAddTree={setShowAddTree}
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
