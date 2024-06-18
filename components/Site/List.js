import React, { useContext, useRef, useState } from "react";
import {
  Text,
  TextInput,
  TouchableHighlight,
  Animated,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";
import ScreenContext from "../../context/screenContext";
import axios from "axios";
import * as RootNavigation from "../../RootNavigation";

const SiteList = () => {
  const {
    camera,
    sliderRef,
    sites,
    setSites,
    trees,
    showList,
    setShowList,
    setSelectedSite,
    setSliderTitle,
    setCustomMark,
    setSelectedTrees,
    treeLength,
    siteLength,
    page,
    setPage,
  } = useContext(ScreenContext);

  const holder = ["Search Site"];
  const [search, setSearch] = useState("");
  const [siteList, setSiteList] = useState(null);

  const renderItem = ({ item: site }) => (
    <React.Fragment>
      <TouchableHighlight
        className="flex flex-row rounded-lg px-4 py-0 my-2 mx-4 border-b-2 bg-[#d4dbe044] border-gray-600 justify-between items-center shadow-xl"
        onPress={() =>
          handleSitePress(
            site._id,
            site.properties.siteID,
            site.geometry.coordinates
          )
        }
        activeOpacity={0.6}
        underlayColor={"#4e545f56"}
      >
        <View className="flex flex-row w-full justify-start items-center">
          <Text className="font-bold pl-1 py-2 text-lg text-white">
            Site: {site.properties.siteID.toString().padStart(4, "0")}
          </Text>
        </View>
      </TouchableHighlight>
    </React.Fragment>
  );

  const showlistItem = ({ item: site }) => (
    <TouchableHighlight
      className="bg-slate-400"
      onPress={() => {
        handleSitePress(
          search !== "" ? site._id : site.id,
          site.properties.siteID,
          site.geometry.coordinates
        );
      }}
      activeOpacity={0.6}
      underlayColor={"#818996"}
      style={{
        flexDirection: "row",
        width: "100%",
        borderTopWidth: 2,
        borderColor: "gray",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          paddingLeft: 10,
          paddingVertical: 5,
          fontSize: 18,
          color: "white",
        }}
      >
        {site.properties.siteID.toString().padStart(4, "0")}
      </Text>
    </TouchableHighlight>
  );

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
    }
  };

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

  const opacityStyle = {
    opacity: opacityAnimation,
  };

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

  const handleSitePress = (siteID, siteName, coords) => {
    setShowList(false);
    opacityAnimation._value = 0;
    const siteNum = sites.features.find((site) => site.id === siteID);
    camera.current?.setCamera({
      centerCoordinate: siteNum.geometry.coordinates,
      zoomLevel: 17,
      animationDuration: 500,
      animationMode: "flyTo",
    });
    sliderRef.current.show();
    setSliderTitle(siteName.toString().padStart(4, "0"));
    setCustomMark(coords);
    setSelectedSite(siteID);
    getTrees(siteID);
    RootNavigation.navigate("SelectedSite");
  };

  const fetchMoreSites = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/site/?page=${page}`
      );
      const data = res.data.data;
      setSites((prev) => ({
        ...prev,
        features: [...prev.features, ...data],
      }));
      //get the page from res.data.page
      setPage((prev) => prev + 1);
      console.log(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <View className="flex flex-col w-full h-full pb-36 items-center bg-gray-500">
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

        <View className="flex w-full p-2 mt-4 bg-slate-400 rounded-2xl">
          <Text className="font-bold text-white text-lg px-4">
            Sites: {sites && siteLength} Trees: {trees && treeLength}
          </Text>
          <FlatList
            data={sites?.features}
            maxToRenderPerBatch={100}
            onEndReachedThreshold={0.6}
            keyExtractor={(item) => item.properties.siteID.toString()}
            onEndReached={() => fetchMoreSites()}
            removeClippedSubviews={true}
            renderItem={renderItem}
          />
        </View>
      </View>

      {showList && (
        <>
          <Animated.View
            className="absolute top-28 mx-2 drop-shadow-2xl w-2/3 z-auto overflow-hidden rounded-b-xl"
            style={{ ...opacityStyle }}
          >
            <FlatList
              data={search !== "" ? siteList : sites.features}
              maxToRenderPerBatch={25}
              keyExtractor={(item, index) => item._id.toString()}
              removeClippedSubviews={true}
              showsVerticalScrollIndicator={false}
              renderItem={showlistItem}
              className="max-h-56 bg-slate-400"
            />
          </Animated.View>
        </>
      )}
    </>
  );
};

export default SiteList;
