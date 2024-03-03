import React from "react";
import sites from "../sites.json";
import Mapbox from "@rnmapbox/maps";
import { View } from "react-native";

const Sites = (props) => {
  const { sliderRef, setSliderTitle } = props;

  return sites.features.map((site, index) => {
    if (Object.values(site.geometry.coordinates) != "") {
      return (
        <Mapbox.PointAnnotation
          id={"site_" + `${site.properties["Primary ID"]}`}
          key={`${site.properties["Primary ID"]}` + `${index}`}
          coordinate={Object.values(site.geometry.coordinates)}
          onSelected={(e) => {
            setSliderTitle(e.id);
            sliderRef.current.show({
              toValue: 125,
              velocity: 1,
            });
          }}
        >
          <View
            style={{
              height: 15,
              width: 15,
              backgroundColor: "blue",
              borderRadius: 50,
              borderColor: "black",
              borderWidth: 2,
            }}
          />
        </Mapbox.PointAnnotation>
      );
    }
  });
};

export default Sites;
