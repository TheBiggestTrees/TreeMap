import React, { useState } from "react";
import trees from "../trees.json";
import Mapbox from "@rnmapbox/maps";
import { View } from "react-native";

const Trees = () => {
  return (
    <Mapbox.ShapeSource
      id="trees1"
      shape={trees}
      buffer={128}
      cluster
      clusterMaxZoomLevel={15}
    >
      <Mapbox.CircleLayer
        id="Treepoint"
        style={{
          circleRadius: 4,
          circleColor: "#1bc21b",
          circleStrokeWidth: 1,
          circleStrokeColor: "#000",
        }}
        minZoomLevel={16.5}
        maxZoomLevel={100}
      />
    </Mapbox.ShapeSource>
  );
};

export default Trees;
