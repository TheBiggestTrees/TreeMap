import React, { useContext, useEffect } from "react";
import { ScrollView, Text, TouchableHighlight, View } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";
import ScreenContext from "../../context/screenContext";
import * as RootNavigation from "../../RootNavigation";

const SelectedSite = () => {
  const {
    sliderRef,
    sliderTitle,
    selectedTrees,
    setShowCustomTree,
    setWorkingTree,
    camera,
  } = useContext(ScreenContext);

  function goBack() {
    RootNavigation.navigate("siteList");
    sliderRef.current.show();
  }

  return (
    <>
      <View className="w-full flex bg-[#6b7280] mb-24">
        <View className="w-full flex flex-row items-center justify-between pb-4">
          <Text className="font-bold text-lg text-white">
            Site: {sliderTitle}
          </Text>
          <View className="flex flex-row gap-2">
            <TouchableHighlight
              className="flex flex-row items-center justify-center text-center bg-[#4e545f56]  rounded-lg"
              onPress={() => {
                RootNavigation.navigate("AddTree");
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
              onPress={goBack}
              underlayColor={"transparent"}
              className="bg-[#4e545f56] rounded-full"
            >
              <Icons name="close" size={40} color="#374151"></Icons>
            </TouchableHighlight>
          </View>
        </View>

        <ScrollView className="h-full rounded-lg">
          {selectedTrees &&
            selectedTrees.map((tree, index) => (
              <TouchableHighlight
                key={index}
                onPress={() => {
                  RootNavigation.navigate("ViewTree");
                  setShowCustomTree(false);
                  setWorkingTree(tree);
                  camera.current?.setCamera({
                    centerCoordinate: tree.geometry.coordinates,
                    zoomLevel: 17,
                    animationDuration: 500,
                    animationMode: "flyTo",
                  });
                  sliderRef.current.show();
                }}
                activeOpacity={0.6}
                underlayColor="#d4dbe044"
                className="flex flex-row justify-between p-4 mb-3 w-full bg-[#d4dbe044] border-b border-gray-700 rounded-xl"
              >
                <View className="flex flex-row w-full items-center justify-between">
                  <Text className="font-bold text-lg text-white">
                    Tree: {tree.properties.treeID.toString().padStart(4, "0")}
                  </Text>
                  <View className="flex flex-row w-3/5 items-center justify-between gap-1">
                    <Text className="font-bold text-lg text-white">
                      {tree.properties.status}
                    </Text>
                    {tree.properties.needsWork && (
                      <Icons name="assignment-late" size={32} color="#e38732" />
                    )}
                  </View>
                </View>
              </TouchableHighlight>
            ))}
        </ScrollView>
      </View>
    </>
  );
};

export default SelectedSite;
