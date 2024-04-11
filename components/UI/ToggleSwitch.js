import axios from "axios";
import React, { useContext } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import ScreenContext from "../../context/screenContext";

export default ToggleSwitch = (props) => {
  const { setter, tree, label, propname } = props;

  const { setTrees, trees, selectedTrees, setSelectedTrees } =
    useContext(ScreenContext);

  const slideAnim = new Animated.Value(tree.properties[propname] ? 1 : 0);

  const slide = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 32],
  });

  const slideToggle = () => {
    Animated.timing(slideAnim, {
      toValue: tree.properties[propname] ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setter((prev) => {
      return {
        ...prev,
        properties: {
          ...prev.properties,
          [propname]: !prev.properties[propname],
        },
      };
    });

    const workingIndex = trees.features.findIndex(
      (treef) => treef._id === tree._id
    );
    const index = selectedTrees.findIndex((treef) => treef._id === tree._id);

    axios
      .put(process.env.REACT_APP_API_URL + "/tree/edit/" + tree._id, {
        properties: {
          ...tree.properties,
          [propname]: !tree.properties[propname],
        },
      })
      .then((res) => {
        setSelectedTrees((prev) => {
          prev[index] = res.data.data;
          return prev;
        });
        setTrees((prev) => {
          prev.features[workingIndex] = res.data.data;
          return prev;
        });
        setter(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View className="flex flex-row items-center p-4 justify-between">
      <Text className="text-white font-bold text-lg">{label}</Text>
      <TouchableOpacity
        className="bg-slate-300 w-16 h-8 rounded-full"
        style={
          tree.properties[propname]
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
