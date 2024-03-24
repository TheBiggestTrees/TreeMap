import { useContext, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";
import ScreenContext from "../../context/screenContext";
import RollPickerNative from "roll-picker-native";

const SiteList = () => {
  const { sites, trees, showList, setShowList } = useContext(ScreenContext);

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
        console.log([...trees.features])
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
        return;
      }

      setSiteList([list]);
      console.log(list);
    } else if (roller === 1) {
      const list = trees.features.find(
        (tree) => +tree.properties.treeID == e.nativeEvent.text
      );

      if (list === undefined) {
        setSiteList([{ properties: { treeID: "No Tree Found" } }]);
        return;
      }

      setSiteList([list]);
      console.log(list);
    }
  };

  const handleDrop = () => {
    setShowList(!showList);
  };

  return (
    <>
      <View className="flex flex-row w-full justify-between items-center">
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
      </View>

      {showList && roller === 0 && (
        <>
          <View className="absolute top-28 px-2 drop-shadow-2xl w-2/3">
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
          </View>
        </>
      )}

{showList && roller === 1 ? (
        <>
          <View className="absolute top-28 px-2 drop-shadow-2xl w-2/3">
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
                  )})
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
                  )})}
            </ScrollView>
          </View>
        </>
      ): null}

    </>
  );
};

export default SiteList;
