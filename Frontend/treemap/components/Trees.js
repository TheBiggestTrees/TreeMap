import React from "react";
import trees from "../trees.json";
import Mapbox from "@rnmapbox/maps";
import { View } from "react-native";

const Trees = () => {
  return (
    <>
      <Mapbox.ShapeSource
        id="trees1"
        shape={trees}
        buffer={64}
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
        />
      </Mapbox.ShapeSource>

      {/* {trees.features.map((tree, index) => {
        if (Object.values(tree.geometry.coordinates) != "") {
          return (
            <Mapbox.PointAnnotation
              key={`${tree.properties["Primary ID"]}` + `${index}`}
              id={`${tree.properties["Primary ID"]}`}
              coordinate={Object.values(tree.geometry.coordinates)}
            >
              <View
                style={{
                  height: 10,
                  width: 10,
                  backgroundColor: "green",
                  borderRadius: 50,
                  borderColor: "black",
                  borderWidth: 2,
                }}
              />
            </Mapbox.PointAnnotation>
          );
        }
      })} */}
    </>
  );
};

export default Trees;
