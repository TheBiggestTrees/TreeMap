import React from "react";
import { Button, Text, TouchableHighlight, View } from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import Icons from "@expo/vector-icons/MaterialIcons";

const Slider = (props) => {
  const { sliderRef, sliderTitle, camera, selectedSite } = props;

  return (
    <>
      <SlidingUpPanel
        ref={sliderRef}
        showBackdrop={false}
        onBottomReached={() => {
          camera.current.zoomTo(15);
        }}
      >
        <View className="flex bg-gray-500 h-full rounded-xl p-4 items-center ">
          <View className="w-full">
            <View className="border-t-2 m-4 border-gray-700 w-[40%] self-center"></View>
            <View className="flex flex-row justify-between items-center">
              <Text className="text-white">Site {sliderTitle}</Text>

              <TouchableHighlight
                className=" w-10 h-10 flex justify-center items-center rounded-lg"
                onPress={() => sliderRef.current.hide()}
                underlayColor={"transparent"}
              >
                <Icons name="close" size={40} color="#374151"></Icons>
              </TouchableHighlight>
            </View>
            {selectedSite &&
              selectedSite.map((tree, index) => {
                return (
                  <View key={index} className="flex m-4">
                    <Text className="text-white">
                      Tree Number: {tree.properties.treeID}
                    </Text>
                    <Text className="text-white">
                      Date Planted: {tree.properties.datePlanted}
                    </Text>
                    <Text className="text-white">
                      Species: {tree.properties.treeSpecies}
                    </Text>
                    <Text className="text-white">
                      Last Work Date: {tree.properties.lastWorkDate}
                    </Text>
                    <Text className="text-white">
                      Coordinates: [
                      {Math.floor(tree.geometry.coordinates[0] * 100000) /
                        100000}
                      ,{" "}
                      {Math.floor(tree.geometry.coordinates[1] * 100000) /
                        100000}
                      ]
                    </Text>
                    {tree.properties.needsWork && (
                      <Text className="text-[#f57171]">Needs Work</Text>
                    )}
                  </View>
                );
              })}
          </View>
        </View>
      </SlidingUpPanel>
    </>
  );
};

export default Slider;
