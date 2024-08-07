import React, { useContext, useEffect } from "react";
import { REACT_APP_MAPBOX_ACCESS_TOKEN, REACT_APP_API_URL } from "@env";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableHighlight,
  Image,
} from "react-native";
import Sites from "./Site/Sites";
import Trees from "./Tree/Trees";
import Mapbox from "@rnmapbox/maps";
import Slider from "./Layout/Slider";
import Splash from "./Splash";
import axios from "axios";
import * as Location from "expo-location";
import NavBar from "./Layout/NavBar";
import ScreenContext from "../context/screenContext";
import * as RootNavigation from "../RootNavigation";
import Icons from "@expo/vector-icons/MaterialIcons";

Mapbox.setAccessToken(
  process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || REACT_APP_MAPBOX_ACCESS_TOKEN
);
const API_URL = process.env.REACT_APP_API_URL || REACT_APP_API_URL;
const Home = () => {
  const {
    location,
    setLocation,
    setErrMsg,
    sliderRef,
    mapRef,
    camera,
    setTrees,
    tempTreeForm,
    setSites,
    setSliderTitle,
    showSplash,
    setShowSplash,
    setSelectedTrees,
    selectedSite,
    customMark,
    setSelectedSite,
    setCustomMark,
    showCustomMark,
    setShowCustomMark,
    showCustomTree,
    setShowCustomTree,
    trees,
  } = useContext(ScreenContext);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrMsg("Permission to access location was denied");
        return;
      } else if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setErrMsg("Location Enabled");
        return;
      }
    } catch (err) {
      setErrMsg("Location is turned off");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const fetchTreesInSite = async (site) => {
    try {
      const treeList = trees.features.filter(
        (tree) => tree.properties.siteID === site
      );
      setSelectedTrees(treeList);
    } catch (err) {
      setErrMsg(err);
    }
  };

  const postSite = async (temp) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/site/`,
        temp
      );
      const data = res.data.data;
      data.id = data._id;
      setSites((prev) => ({ ...prev, features: [...prev.features, data] }));
      setErrMsg(res.data.message);
      setSelectedSite(data.id);
      fetchTreesInSite(data.id);
      setSliderTitle(data.properties.siteID.toString().padStart(4, "0"));
      RootNavigation.navigate("SelectedSite");
      setCustomMark(data.geometry.coordinates);
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
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/tree/${selectedSite}`,
        temp
      );
      const data = res.data.data;
      setSelectedTrees((prev) => [...prev, data]);
      setTrees((prev) => ({ ...prev, features: [...prev.features, data] }));
      RootNavigation.navigate("SelectedSite");
      setErrMsg(res.data.message);
    } catch (err) {
      console.error(err);
      setErrMsg(err);
    }
  };

  const addNewSite = async () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      timeZone: "America/Chicago",
      hour12: true,
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

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
    const formattedDate = today.toLocaleDateString("en-US", {
      timeZone: "America/Chicago",
      hour12: true,
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

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

        <Trees />
        <Sites fetchTreesInSite={fetchTreesInSite} apiURL={API_URL} />

        {/* Custom Site Position Marker */}
        {showCustomMark && (
          <Mapbox.PointAnnotation
            draggable={true}
            id="customMark"
            onDrag={(e) => {
              setCustomMark(e.geometry.coordinates);
            }}
            coordinate={
              location
                ? [location.coords.longitude, location.coords.latitude]
                : [-96, 35]
            }
          />
        )}

        {/* Custom Tree Position Marker */}
        {showCustomTree && (
          <Mapbox.PointAnnotation
            draggable={true}
            id="customMark"
            onDrag={(e) => {
              setCustomMark(e.geometry.coordinates);
            }}
            coordinate={customMark}
          />
        )}

        {location && <Mapbox.UserLocation visible={true} animated={true} />}
      </Mapbox.MapView>

      <TouchableHighlight
        underlayColor="#4e545f56"
        onPress={() => {
          camera.current?.setCamera({
            centerCoordinate: [
              location.coords.longitude,
              location.coords.latitude,
            ],
            zoomLevel: 15,
            animationDuration: 500,
            animationMode: "flyTo",
          });
        }}
        className="bg-gray-500"
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          borderRadius: 50,
          padding: 10,
        }}
      >
        <Icons name="my-location" size={30} color="#56ccdb" />
      </TouchableHighlight>

      <Slider addNewSite={addNewSite} addNewTree={addNewTree} />

      <NavBar />
    </View>
  );
};

export default Home;

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
