import React, { useContext } from "react";
import { Text, View, Animated, TouchableOpacity } from "react-native";
import ScreenContext from "../../../../context/screenContext";

const ToggleSlide = () => {
  const { workingTree, setWorkingTree } = useContext(ScreenContext);

  // animation to slide a toggle switch to the right for true and left for false
  const slideAnim = new Animated.Value(
    workingTree.properties.isPlanted ? 1 : 0
  );

  const slide = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 32],
  });

  const slideToggle = () => {
    Animated.timing(slideAnim, {
      toValue: workingTree.properties.isPlanted ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setWorkingTree((prev) => {
      return {
        ...prev,
        properties: {
          ...prev.properties,
          isPlanted: !prev.properties.isPlanted,
        },
      };
    });
  };

  return (
    <View className="flex flex-row items-center p-4 justify-between">
      <Text className="text-white font-bold text-lg">Planted</Text>
      <TouchableOpacity
        className="bg-slate-300 w-16 h-8 rounded-full"
        style={
          workingTree.properties.isPlanted
            ? { backgroundColor: "#208039" }
            : { backgroundColor: "#333333" }
        }
        onPress={slideToggle}
      >
        <Animated.View
          style={{
            transform: [{ translateX: slide }],
            width: "50%",
            height: "100%",
            backgroundColor: "white",
            borderRadius: 100,
          }}
        ></Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const InspectMain = () => {
  const { workingTree } = useContext(ScreenContext);

  return (
    <>
      <View>
        <Text className="text-white font-bold text-lg">
          Inspecting Tree{" "}
          {workingTree.properties.treeID.toString().padStart(4, "0")}
        </Text>
      </View>
      <View className="bg-slate-400 flex w-full mt-4 rounded-lg grow p-4">
        <ToggleSlide />
      </View>
    </>
  );
};

export default InspectMain;
