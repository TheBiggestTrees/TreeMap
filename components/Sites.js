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
    setShowCustomMark,
    fetchTreesInSite,
    setShowAddSite,
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
          fetchTreesInSite(e.features[0].id);
          setSliderTitle(e.features[0].properties.siteID);
          setShowAddSite(false);
          setShowCustomMark(false);
          sliderRef.current.show({
            toValue: 200,
          });

          camera.current?.setCamera({
            centerCoordinate: e.features[0].geometry.coordinates,
            zoomLevel: 15,
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
