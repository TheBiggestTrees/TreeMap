import React, { useContext } from "react";
import { ScrollView, Text, TouchableHighlight, View } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";
import ScreenContext from "../../context/screenContext";

const SelectedSite = () => {
  const {
    sliderRef,
    sliderTitle,
    selectedTrees,
    setSelectedTrees,
    setShowCustomTree,
    setCurrentScreen,
  } = useContext(ScreenContext);

  return (
    <>
      <View className="w-full flex">
        
        <View className="w-full flex flex-row items-center justify-between pb-4">
          <Text className="font-bold text-lg text-white">Site: {sliderTitle}</Text>
          <View className="flex flex-row gap-2">
            <TouchableHighlight
              className="flex flex-row items-center justify-center text-center bg-[#4e545f56]  rounded-lg"
              onPress={() => {
                setCurrentScreen("AddTree");
                setShowCustomTree(false);
                sliderRef.current.show();
              }}
              underlayColor={"transparent"}
            >
              <View className="flex flex-row justify-center items-center rounded-lg">
                <Text className="text-white ml-3">Add Tree</Text>
                <Icons name="add" size={40} color="#374151"></Icons>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => {
                setCurrentScreen("siteList");
                setShowCustomTree(false);
                setSelectedTrees(null);
                sliderRef.current.show();
              }}
              underlayColor={"transparent"}
              className="bg-[#4e545f56] rounded-full"
            >
              <Icons name="close" size={40} color="#374151"></Icons>
            </TouchableHighlight>
          </View>
        </View>            

        <ScrollView className="h-[75%] rounded-lg">
          {selectedTrees && selectedTrees.map((tree, index) => (
            <TouchableHighlight
              key={index}
              onPress={() => {
                setCurrentScreen("SelectedTree");
                setSelectedTrees(tree);
                setShowCustomTree(false);
                sliderRef.current.show({
                  toValue: 200,
                });
              }}
              activeOpacity={0.6}
              underlayColor="#d4dbe044"
              className="flex flex-row justify-between p-4 mb-3 w-full bg-[#d4dbe044] border-b border-gray-700 rounded-xl"
            >
              <View className="flex flex-row w-full justify-between">
                <Text className="font-bold text-lg text-white">Tree: {tree.properties.treeID.toString().padStart(4, "0")}</Text>
                <Text className="font-bold text-lg text-white">{tree.properties.treeSpecies}</Text>
                {tree.properties.needsWork && <Text className="font-bold text-lg text-red">Needs Work</Text>}
              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default SelectedSite;
