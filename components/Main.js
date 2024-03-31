import React, { useContext, useEffect } from "react";
import { REACT_APP_MAPBOX_ACCESS_TOKEN, REACT_APP_API_URL } from "@env";
import { StyleSheet, View, StatusBar, Text } from "react-native";
import Sites from "../components/Site/Sites";
import Trees from "../components/Tree/Trees";
import Mapbox from "@rnmapbox/maps";
import Slider from "../components/Layout/Slider";
import Splash from "../components/Splash";
import axios from "axios";
import * as Location from "expo-location";
import NavBar from "../components/Layout/NavBar";
import ScreenContext from "../context/screenContext";
import Login from "./Users/Login";
import { useAuth } from "../context/AuthContext";

Mapbox.setAccessToken(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || REACT_APP_MAPBOX_ACCESS_TOKEN);
const API_URL = process.env.REACT_APP_API_URL || REACT_APP_API_URL;

const Main = () => {
  const {
    location,
    setLocation,
    errMsg,
    setErrMsg,
    sliderRef,
    mapRef,
    camera,
    setTrees,
    tempTreeForm,
    setTempTreeForm,
    setSites,
    setSliderTitle,
    showSplash,
    setShowSplash,
    setSelectedTrees,
    selectedSite,
    setSelectedSite,
    customMark,
    setCustomMark,
    showCustomMark,
    setShowCustomMark,
    showCustomTree,
    setShowCustomTree,
    setCurrentScreen,
  } = useContext(ScreenContext);

  const { authenticated } = useAuth();



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
      setSliderTitle(data.properties.siteID.toString().padStart(4, "0"));
      setCurrentScreen("SelectedSite");
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
      const res = await axios.post(`${API_URL}/tree/${selectedSite}`, temp);
      const data = res.data.data;
      setSelectedTrees((prev) => [...prev, data]);
      setTrees((prev) => ({ ...prev, features: [...prev.features, data] }));
      setCurrentScreen("SelectedSite");
      setTempTreeForm({
        treeID: 0,
        treeSpecies: "Oak",
        treeFamily: "Fagaceae",
        status: "Alive",
        condition: "Good",
        leafCondition: "Good",
        comment: "N/A",
        lastModifiedDate: "N/A",
        lastModifiedBy: "N/A",
        lastWorkDate: "N/A",
        lastWorkedBy: "N/A",
        needsWork: false,
        needsWorkComment: "N/A",
        dbh: 0,
        dateCreated: 'N/A',
        createdBy: 'N/A',
        plantedBy: "N/A",
        datePlanted: "N/A",
        photos: ["N/A"],
        siteID: '0',
      });
      console.log(res.data.message);
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
    <View style={styles.page}>
      <StatusBar backgroundColor={"#6b7280"} />
      {authenticated ? (
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

          <Trees apiURL={API_URL} />
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
              coordinate={ customMark }
            />
          )}

        </Mapbox.MapView>

        <Slider addNewSite={addNewSite} addNewTree={addNewTree} />

        {errMsg && (
          <View className="flex w-full absolute right-1 m-auto top-16 items-center justify-center text-center">
            <View className="bg-red-400 p-4 rounded-3xl">
              <Text className="text-white font-bold text-md">{errMsg}</Text>
            </View>
          </View>
        )}

        <NavBar />

      </View>
      ) : (
        <Login />
      )}
    </View>
  );
};

export default Main;

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
