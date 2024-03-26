import React, { useContext, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  Animated,
  TouchableOpacity,
  View,
} from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";
import ScreenContext from "../../context/screenContext";

const SiteList = () => {
  const {
    camera,
    sliderRef,
    sites,
    trees,
    showList,
    setShowList,
    setSelectedSite,
    setCurrentScreen,
    setSliderTitle,
    setCustomMark,
    setSelectedTrees,
  } = useContext(ScreenContext);

  const holder = ["Search Site"];
  const [search, setSearch] = useState("");
  const [siteList, setSiteList] = useState(null);
  const [showTree, setShowTree] = useState(false);
  const [selectedSiteId, setSelectedSiteId] = useState(null);

  const handleChange = (e) => {
    {
      showList === true ? null : animateElement();
    }
    setShowList(true);
    setSearch(e.nativeEvent.text);

    const list = sites.features.find(
      (site) => +site.properties.siteID == e.nativeEvent.text
    );

    if (list === undefined) {
      setSiteList([{ properties: { siteID: "No Site Found" } }]);
      return;
    }
    setSiteList([list]);
    console.log(list);
  };

  const handleDrop = () => {
    animateElement();
  };

  const opacityAnimation = useRef(new Animated.Value(0)).current;

  const opacityStyle = { opacity: opacityAnimation };

  const animateElement = () => {
    if (opacityAnimation._value === 0) {
      setShowList(true);
      Animated.timing(opacityAnimation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    } else if (opacityAnimation._value === 1) {
      Animated.timing(opacityAnimation, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => setShowList(false));
    }
  };

  const handlePress = (siteID, coords) => {
    const siteNum = sites.features.find((site) => site.id === siteID);

    const treeList = trees.features.filter(
      (tree) => tree.properties.siteID === siteID
    );

    camera.current?.setCamera({
      centerCoordinate: coords,
      zoomLevel: 19,
      animationDuration: 500,
      animationMode: "flyTo",
    });
    sliderRef.current.show({ toValue: 200 });
    setSelectedTrees(treeList);
    setSelectedSite(siteID);
    setCurrentScreen("SelectedSite");
    setCustomMark(siteNum.geometry.coordinates);
    setSliderTitle(siteNum.properties.siteID.toString().padStart(4, "0"));
    setShowList(false);
  };

  const handleSitePress = (siteID) => {
    if (selectedSiteId === siteID) {
      setShowTree(!showTree);
      setSelectedSiteId(siteID);
    } else {
      setShowTree(true);
      setSelectedSiteId(siteID);
    }
  };

  const handleSiteLongPress = (siteID) => {
    const siteNum = sites.features.find((site) => site.id === siteID);
    const treeList = trees.features.filter(
      (tree) => tree.properties.siteID === siteID
    );
    camera.current?.setCamera({
      centerCoordinate: siteNum.geometry.coordinates,
      zoomLevel: 17,
      animationDuration: 500,
      animationMode: "flyTo",
    });
    sliderRef.current.show({ toValue: 200 });
    setSelectedSite(siteID);
    setSelectedTrees(treeList);
    setCurrentScreen("SelectedSite");
    setCustomMark(siteNum.geometry.coordinates);
    setSliderTitle(siteNum.properties.siteID.toString().padStart(4, "0"));
  };

  return (
    <>
      <View className="flex flex-col w-full items-center">
        <View className="flex flex-row items-center bg-slate-400 shadow-lg w-full p-4 rounded-full">
          <View className="flex grow">
            <Text className="text-white font-bold text-lg">Site</Text>
          </View>
          <View className="bg-[#4e545f56] w-1 rounded-full h-8 mx-2"></View>
          <View className="flex flex-row items-center">
            <TextInput
              className="text-white font-bold h-10 text-lg grow"
              onChange={(e) => {
                handleChange(e);
              }}
              value={search}
              placeholderTextColor={"#ffffff"}
              placeholder={holder[0]}
            />
            <TouchableOpacity
              onPress={() => {
                handleDrop();
              }}
              className="flex w-24 flex-row items-center justify-center grow text-center rounded-lg"
            >
              <Icons name="expand-more" size={40} color="#4e545f56"></Icons>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex w-full h-[78%] p-2 mt-4 bg-slate-400 rounded-2xl">
          <Text className="font-bold text-white text-lg px-4">
            Sites: {sites && sites.features.length} Trees:{" "}
            {trees && trees.features.length}
          </Text>
          <ScrollView className="">
            {/* map through trees and creates a touchable highlight that shows each tree and when touched displays the associated site in SelectedSite */}

            {sites &&
              sites.features.map((site) => {
                return (
                  <React.Fragment key={site.id}>
                    <TouchableHighlight
                      className="flex flex-row rounded-lg px-4 py-0 my-2 mx-4 border-b-2 bg-[#d4dbe044] border-gray-600 justify-between items-center shadow-xl"
                      onPress={() => {
                        handleSitePress(site.id);
                      }}
                      onLongPress={() => {
                        handleSiteLongPress(site.id);
                      }}
                      activeOpacity={0.6}
                      underlayColor={"#4e545f56"}
                    >
                      <View className="flex flex-row w-full justify-between items-center">
                        <Text className="font-bold pl-1 py-2 text-lg text-white">
                          Site:{" "}
                          {site.properties.siteID.toString().padStart(4, "0")}
                        </Text>
                        {showTree && selectedSiteId === site.id && (
                          <Icons
                            name={"remove"}
                            size={40}
                            color="#4e545f56"
                          ></Icons>
                        )}
                        {!showTree && selectedSiteId === site.id && (
                          <Icons
                            name={"expand-more"}
                            size={40}
                            color="#4e545f56"
                          ></Icons>
                        )}
                        {selectedSiteId !== site.id && (
                          <Icons
                            name="expand-more"
                            size={40}
                            color="#4e545f56"
                          ></Icons>
                        )}
                      </View>
                    </TouchableHighlight>
                    {showTree &&
                      selectedSiteId === site.id &&
                      trees.features.map((tree) => {
                        if (tree.properties.siteID === site.id) {
                          return (
                            <React.Fragment key={tree._id}>
                              <TouchableHighlight
                                className="flex flex-row rounded-lg px-8 py-0 my-2 mx-6 border-b-2 border-gray-500 bg-[#75797c36] justify-between items-center"
                                onPress={() => {
                                  handlePress(
                                    tree.properties.siteID,
                                    tree.geometry.coordinates
                                  );
                                }}
                                activeOpacity={0.6}
                                underlayColor={"#4e545f56"}
                              >
                                <Text className="font-bold pl-1 py-2 text-lg text-white">
                                  Tree:{" "}
                                  {tree.properties.treeID
                                    .toString()
                                    .padStart(4, "0")}
                                </Text>
                              </TouchableHighlight>
                            </React.Fragment>
                          );
                        }
                      })}
                  </React.Fragment>
                );
              })}
          </ScrollView>
        </View>
      </View>

      {showList && (
        <>
          <Animated.View
            className="absolute top-28 px-2 drop-shadow-2xl w-2/3 z-auto"
            style={opacityStyle}
          >
            <ScrollView className="w-full h-fit max-h-[400px] px-2 bg-slate-400 rounded-b-xl ">
              {search !== ""
                ? siteList.map((site, index) => (
                    <View
                      key={index}
                      className="flex flex-row w-full border-t-2 border-gray-600 justify-between items-center"
                    >
                      <Text className="font-bold pl-1 py-2 text-lg text-white">
                        {site.properties.siteID.toString().padStart(4, "0")}
                      </Text>
                    </View>
                  ))
                : sites.features.map((site, index) => (
                    <View
                      key={index}
                      className="flex flex-row w-full border-t-2 border-gray-600 justify-between items-center"
                    >
                      <Text className="font-bold pl-1 py-2 text-lg text-white">
                        {site.properties.siteID.toString().padStart(4, "0")}
                      </Text>
                    </View>
                  ))}
            </ScrollView>
          </Animated.View>
        </>
      )}
    </>
  );
};

export default SiteList;
