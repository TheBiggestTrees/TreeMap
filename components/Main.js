import React, { useContext } from "react";
import { REACT_APP_MAPBOX_ACCESS_TOKEN } from "@env";
import { StyleSheet, View, StatusBar } from "react-native";
import Mapbox from "@rnmapbox/maps";
import ScreenContext from "../context/screenContext";
import Login from "./Users/Login";
import { useAuth } from "../context/AuthContext";
import PopupMsg from "./UI/PopupMsg";
import Home from "./Home";
import { decode, encode } from "base-64";

if (!global.btoa) {
  global.btoa = encode;
} else {
  global.btoa = global.btoa;
}

Mapbox.setAccessToken(
  process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || REACT_APP_MAPBOX_ACCESS_TOKEN
);

console.log(process.env.REACT_APP_API_URL);

const Main = () => {
  const { errMsg } = useContext(ScreenContext);

  const { authenticated } = useAuth();

  return (
    <View style={styles.page}>
      <StatusBar backgroundColor={"#6b7280"} />
      {authenticated ? (
        <Home />
      ) : (
        <>
          <Login />
          {errMsg && <PopupMsg type="error" />}
        </>
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
