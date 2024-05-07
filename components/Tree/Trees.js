import React, { useContext, useEffect, useState } from "react";
import Mapbox from "@rnmapbox/maps";
import axios from "axios";
import ScreenContext from "../../context/screenContext";

const Trees = () => {
  const { trees, setTreeLength } = useContext(ScreenContext);

  useEffect(() => {
    const fetchTreeLength = async () => {
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_API_URL}/tree/totalcount`
        );
        console.log(data.data.message);
        setTreeLength(data.data.data);
        // setTrees(data.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    // fetchTreeLength();
  }, []);

  return (
    <Mapbox.ShapeSource id="trees1" shape={trees} buffer={128}>
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
