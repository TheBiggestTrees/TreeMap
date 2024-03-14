import React, { useEffect, useState } from "react";
import Mapbox from "@rnmapbox/maps";
import axios from "axios";

// const API_URL = "https://aquamarine-kitten-cape.cyclic.app/api/tree/";

const Trees = (props) => {
  const { apiURL } = props;
  const [trees, setTrees] = useState(null);

  const fetchTrees = async () => {
    try {
      const data = await axios({
        method: "get",
        url: apiURL + "/tree/",
        timeout: 8000,
      });
      console.log(data.data.message);
      setTrees(data.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTrees();
  }, []);

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
