import { useContext, useRef, useState } from "react";
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
import RollPickerNative from "roll-picker-native";

const SiteList = () => {
  const {
    sites,
    trees,
    showList,
    setShowList,
    setSelectedSite,
    setCurrentScreen,
    setSliderTitle,
    setCustomMark,
    setSelectedTrees
  } = useContext(ScreenContext);

  const holder = ["Search Site", "Search Tree"];
  const [search, setSearch] = useState("");
  const [siteList, setSiteList] = useState(null);
  const [roller, setRoller] = useState(0);

  const handleRoll = (index) => {
    console.log(index);
    setRoller(index);
    setSearch("");
    if (index === 0) setSiteList([...sites.features]);
    else if (index === 1) {
      setSiteList([...trees.features]);
      console.log([...trees.features]);
    }
  };

  const handleChange = (e, roller) => {
    setShowList(true);
    setSearch(e.nativeEvent.text);
    if (roller === 0) {
      const list = sites.features.find(
        (site) => +site.properties.siteID == e.nativeEvent.text
      );

      if (list === undefined) {
        setSiteList([{ properties: { siteID: "No Site Found" } }]);
        animateElement();
        return;
      }
      animateElement();
      setSiteList([list]);
      console.log(list);
    } else if (roller === 1) {
      const list = trees.features.find(
        (tree) => +tree.properties.treeID == e.nativeEvent.text
      );

      if (list === undefined) {
        setSiteList([{ properties: { treeID: "No Tree Found" } }]);
        animateElement();
        return;
      }
      animateElement();
      setSiteList([list]);
      console.log(list);
    }
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

  const handlePress = (siteID) => {

    const siteNum = sites.features.find(
      (site) => site.id === siteID
    );

    const treeList = trees.features.filter(
      (tree) => tree.properties.siteID === siteID
    );

    console.log(siteNum);
    setSelectedTrees(treeList);
    setSelectedSite(siteID);
    setCurrentScreen("SelectedSite");
    setCustomMark(siteNum.geometry.coordinates);
    setSliderTitle(siteNum.properties.siteID.toString().padStart(4, "0"));
    setShowList(false);
  }

  return (
    <>
      <View className="flex flex-col w-full items-center">
        <View className="flex flex-row items-center bg-slate-400 shadow-lg w-full p-4 rounded-full">
          <View className="flex grow">
            <RollPickerNative
              items={["Site", "Tree"]}
              index={roller}
              onIndexChange={(index) => handleRoll(index)}
              selectHeight={50}
              containerHeight={40}
              removeLine={true}
              selectStyle={{
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
              selectTextStyle={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
              }}
              containerStyle={{
                backgroundColor: "transparent",
              }}
              textStyle={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
              }}
            />
          </View>
          <View className="bg-[#4e545f56] w-1 rounded-full h-8 mx-2"></View>
          <View className="flex flex-row items-center">
            <TextInput
              className="text-white font-bold h-10 text-lg grow"
              onChange={(e) => {
                handleChange(e, roller);
              }}
              value={search}
              placeholderTextColor={"#ffffff"}
              placeholder={holder[roller]}
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

        <View className="flex flex-row w-full h-[80%] p-2">
          <ScrollView className="bg-slate-400 rounded-2xl">
            <View className="m-8">
              <Text className="font-bold text-white text-lg px-2">Trees</Text>
              <View className="w-full bg-gray-700 h-1 rounded-full"></View>
            </View>
            {/* map through trees and creates a touchable highlight that shows each tree and when touched displays the associated site in SelectedSite */}
            {trees.features.map((tree, index) => {
              const increment = index + 1;
              return (
                <TouchableHighlight
                  key={index}
                  className="flex flex-row px-4 py-0 mx-4 border-t-2 border-gray-500 justify-between items-center"
                  onPress={() => { handlePress(tree.properties.siteID) }}
                >
                  <Text className="font-bold pl-1 py-2 text-lg text-white">
                    {increment.toString().padStart(4, "0")}
                  </Text>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {showList && roller === 0 && (
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

      {showList && roller === 1 ? (
        <>
          <Animated.View
            className="absolute top-28 px-2 drop-shadow-2xl w-2/3 z-auto"
            style={opacityStyle}
          >
            <ScrollView className="w-full h-fit max-h-[400px] px-2 bg-slate-400 rounded-b-xl ">
              {search !== ""
                ? siteList.map((site, index) => {
                    return (
                      <View
                        key={index}
                        className="flex flex-row w-full border-t-2 border-gray-600 justify-between items-center"
                      >
                        <Text className="font-bold pl-1 py-2 text-lg text-white">
                          {site.properties.treeID.toString().padStart(4, "0")}
                        </Text>
                      </View>
                    );
                  })
                : trees.features.map((site, index) => {
                    const increment = index + 1;
                    return (
                      <View
                        key={index}
                        className="flex flex-row w-full border-t-2 border-gray-600 justify-between items-center"
                      >
                        <Text className="font-bold pl-1 py-2 text-lg text-white">
                          {increment.toString().padStart(4, "0")}
                        </Text>
                      </View>
                    );
                  })}
            </ScrollView>
          </Animated.View>
        </>
      ) : null}
    </>
  );
};

export default SiteList;
