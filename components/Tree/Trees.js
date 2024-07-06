import React, { useContext, useEffect, useState } from "react";
import Mapbox from "@rnmapbox/maps";
import axios from "axios";
import ScreenContext from "../../context/screenContext";

const Trees = () => {
  const { setTreeLength, selectedTrees } = useContext(ScreenContext);
  const fetchTreeLength = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_URL}/tree/totalcount`
      );
      setTreeLength(data.data.data);
    } catch (err) {
      console.log(err.data.message);
    }
  };

  useEffect(() => {
    fetchTreeLength();
  }, [selectedTrees]);

  const [trees, setTrees] = useState({
    type: "FeatureCollection",
    features: [],
  });

  useEffect(() => {
    if (!selectedTrees) return;
    setTrees({ type: "FeatureCollection", features: [...selectedTrees] });
  }, [selectedTrees]);

  return (
    <Mapbox.ShapeSource id="trees1" shape={trees} buffer={128}>
      <Mapbox.CircleLayer
        id="Treepoint"
        style={{
          circleRadius: 6,
          circleColor: "#1bc21b",
          circleStrokeWidth: 1,
          circleStrokeColor: "#000",
        }}
        minZoomLevel={16}
        maxZoomLevel={100}
      />
    </Mapbox.ShapeSource>
  );
};

export default Trees;
