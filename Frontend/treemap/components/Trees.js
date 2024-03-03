import React from "react";
import trees from "../trees.json";
import Mapbox from "@rnmapbox/maps";
import { View } from "react-native";

const Trees = () => {
  return (
    <>
      {trees.features.map((tree, index) => {
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
      })}
    </>
  );
};

export default Trees;
