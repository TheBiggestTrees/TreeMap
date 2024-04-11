import React, { useContext } from "react";
import { Text, View, Animated, TouchableOpacity } from "react-native";
import ScreenContext from "../../../../context/screenContext";

const ToggleSwitch = (props) => {
  const { property, setter, label } = props;

  const slideAnim = new Animated.Value(property ? 1 : 0);

  const slide = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 32],
  });

  const slideToggle = () => {
    Animated.timing(slideAnim, {
      toValue: property ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setter((prev) => {
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
      <Text className="text-white font-bold text-lg">{label}</Text>
      <TouchableOpacity
        className="bg-slate-300 w-16 h-8 rounded-full"
        style={
          property
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
  const { workingTree, setWorkingTree } = useContext(ScreenContext);

  return (
    <>
      <View>
        <Text className="text-white font-bold text-lg">
          Inspecting Tree{" "}
          {workingTree.properties.treeID.toString().padStart(4, "0")}
        </Text>
      </View>
      <View className="bg-slate-400 flex w-full mt-4 rounded-lg grow p-4">
        <ToggleSwitch
          property={workingTree.properties.isPlanted}
          setter={setWorkingTree}
          label="Planted"
        />
        <ToggleSwitch
          property={workingTree.properties.needsWork}
          setter={setWorkingTree}
          label="Needs Work"
        />
      </View>
    </>
  );
};

export default InspectMain;
