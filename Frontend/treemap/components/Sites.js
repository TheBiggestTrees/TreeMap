import React, { useEffect, useState } from "react";
import Mapbox from "@rnmapbox/maps";
import axios from "axios";

const Sites = (props) => {
  const {
    sliderRef,
    apiURL,
    setSliderTitle,
    camera,
    setSelectedSite,
    setSelectedTrees,
    sites,
    setSites,
  } = props;

  const fetchSites = async () => {
    try {
      const data = await axios({
        method: "get",
        url: apiURL + "/site/",
        timeout: 8000,
      });

      data.data.data.features.map((site, index) => {
        site.id = data.data.data.features[index]._id;
      });
      console.log(data.data.message);
      setSites(data.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTreesInSite = async (site) => {
    try {
      const data = await axios({
        method: "get",
        url: `${apiURL}/site/trees/${site}`,
        timeout: 8000,
      });
      setSelectedTrees(data.data.data.trees);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSites();
  }, []);

  return (
    <>
      <Mapbox.ShapeSource
        id="sites1"
        shape={sites}
        onPress={(e) => {
          setSelectedSite(e.features[0].id);
          setSelectedTrees(null);
          fetchTreesInSite(e.features[0].id);
          setSliderTitle(e.features[0].properties.siteID);
          sliderRef.current.show({
            toValue: 125,
            velocity: 500,
          });

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
          minZoomLevel={0}
          maxZoomLevel={16.5}
        />
      </Mapbox.ShapeSource>
    </>
  );
};

export default Sites;
