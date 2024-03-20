import React from "react";
import {
  Button,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import Icons from "@expo/vector-icons/MaterialIcons";

const Slider = (props) => {
  const {
    sliderRef,
    sliderTitle,
    setSelectedSite,
    camera,
    addNewTree,
    selectedTrees,
  } = props;

  const styles = {
    container: {
      flex: 1,
      zIndex: 1,
      backgroundColor: "black",
      alignItems: "center",
      justifyContent: "center",
    },
    dragHandler: {
      alignSelf: "stretch",
      height: 80,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#6B7280",
      display: "flex",
    },
  };

  return (
    <View style={styles.page}>
      <SlidingUpPanel
        ref={sliderRef}
        onBottomReached={() => {
          setSelectedSite((prev) => {
            prev = null;
          });
          camera.current.zoomTo(12);
        }}
      >
        {(dragHandler) => (
          <View className="flex bg-gray-500 h-full rounded-xl p-4 items-center ">
            <View style={styles.dragHandler} {...dragHandler}>
            <View className="border-t-2 m-4 mb-8 border-gray-700 w-[40%] self-center"></View>
              
              <View className="flex flex-row w-full justify-between items-center">
                <Text className="text-white font-bold text-lg">Site {sliderTitle}</Text>
                {selectedTrees ? <Text className="text-white font-bold text-lg">Trees: {selectedTrees.length}</Text> : <Text className="text-white font-bold text-lg">Trees: 0</Text>}
                
                <View className="flex flex-row gap-4 items-center">
                 
                 <TouchableHighlight
                    className="flex flex-row items-center justify-center text-center bg-[#4e545f56]  rounded-lg"
                    onPress={() => {
                      addNewTree();
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
                      sliderRef.current?.hide();
                    }}
                    underlayColor={"transparent"}
                    className="bg-[#4e545f56] rounded-full"
                  >
                    <Icons name="close" size={40} color="#374151"></Icons>
                  </TouchableHighlight>
                </View>

              </View>

            </View>
            <ScrollView className="w-full my-8">
              {selectedTrees !== null &&
                selectedTrees.map((tree, index) => (
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
                      Coordinates: [{tree.geometry.coordinates[0].toFixed(5)}, {tree.geometry.coordinates[1].toFixed(5)}]
                    </Text>
                  </View>
                ))}
            </ScrollView>
          </View>
        )}
      </SlidingUpPanel>
    </View>
  );
};

export default Slider;
