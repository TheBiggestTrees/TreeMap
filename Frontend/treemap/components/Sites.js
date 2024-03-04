import React, { useEffect } from "react";
import sites from "../sites.json";
import trees from "../trees.json";
import Mapbox, { CircleLayer, ShapeSource } from "@rnmapbox/maps";
import { View } from "react-native";

const Sites = (props) => {
  const { sliderRef, mapRef, setShowTreeLayer, setSliderTitle, camera } = props;
  const map = mapRef;

  useEffect(() => {}, []);

  return (
    <>
      <Mapbox.ShapeSource
        id="sites1"
        shape={sites}
        onPress={(e) => {
          setSliderTitle(e.features[0].properties["Site Name"]);
          sliderRef.current.show({
            toValue: 125,
            velocity: 1,
          });

          setShowTreeLayer(true);

          camera.current?.setCamera({
            centerCoordinate: e.features[0].geometry.coordinates,
            zoomLevel: 17,
            animationDuration: 500,
            animationMode: "flyTo",
          });
        }}
      >
        <Mapbox.CircleLayer
          id="point"
          style={{
            circleRadius: 6,
            circleColor: "#03c2fc",
            circleStrokeWidth: 1,
            circleStrokeColor: "#000",
          }}
        />
      </Mapbox.ShapeSource>
    </>
  );

  // sites.features.map((site, index) => {
  //   if (Object.values(site.geometry.coordinates) != "") {
  //     return (
  //       <Mapbox.PointAnnotation
  //         id={"site_" + `${site.properties["Primary ID"]}`}
  //         key={`${site.properties["Primary ID"]}` + `${index}`}
  //         coordinate={Object.values(site.geometry.coordinates)}
  //         onSelected={(e) => {
  //           setSliderTitle(e.id);
  //           sliderRef.current.show({
  //             toValue: 125,
  //             velocity: 1,
  //           });

  //           setShowTreeLayer(true);

  //           camera.current?.setCamera({
  //             centerCoordinate: Object.values(site.geometry.coordinates),
  //             zoomLevel: 17,
  //             animationDuration: 800,
  //             animationMode: "flyTo",
  //           });
  //         }}
  //       >
  //       <View
  //         style={{
  //           height: 15,
  //           width: 15,
  //           backgroundColor: "blue",
  //           borderRadius: 50,
  //           borderColor: "black",
  //           borderWidth: 2,
  //         }}
  //       />
  //       </Mapbox.PointAnnotation>

  //     );
  //   }
  // });
};

export default Sites;
