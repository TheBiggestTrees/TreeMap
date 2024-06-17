import React, { useContext, useEffect, useState } from "react";
import Mapbox from "@rnmapbox/maps";
import axios from "axios";
import ScreenContext from "../../context/screenContext";

const Sites = (props) => {
  const {
    sliderRef,
    setSliderTitle,
    camera,
    setSelectedSite,
    setShowCustomMark,
    setCurrentScreen,
    sites,
    setSites,
    setCustomMark,
    setSiteLength,
    setSelectedTrees,
  } = useContext(ScreenContext);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const data = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}/site/`,
          timeout: 8000,
        });

        const totalCount = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}/site/totalcount`,
          timeout: 8000,
        });

        const siteGeoJSON = {
          type: "FeatureCollection",
          features: [...data.data.data],
        };

        siteGeoJSON.features.map((site, index) => {
          site.id = siteGeoJSON.features[index]._id;
        });
        setSiteLength(totalCount.data.data);
        console.log(totalCount.data.message);
        setSites(siteGeoJSON);
      } catch (err) {
        console.log(err.data.message);
      }
    };
    fetchSites();
  }, []);

  //get trees for site
  const getTrees = async (siteID) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/site/trees/${siteID}`
      );

      setSelectedTrees([...res.data.data.trees]);

      console.log("Trees fetched successfully");
    } catch (err) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    }
  };

  return (
    <>
      <Mapbox.ShapeSource
        id="sites1"
        shape={sites}
        onPress={(e) => {
          setSelectedSite(e.features[0].id);
          getTrees(e.features[0].id);
          setSliderTitle(
            e.features[0].properties.siteID.toString().padStart(4, "0")
          );
          setCustomMark(e.features[0].geometry.coordinates);
          setShowCustomMark(false);
          setCurrentScreen("SelectedSite");

          sliderRef.current.show({
            toValue: 200,
          });

          camera.current?.setCamera({
            centerCoordinate: e.features[0].geometry.coordinates,
            zoomLevel: 19,
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
