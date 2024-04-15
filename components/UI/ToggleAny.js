import React from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

export default ToggleAny = (props) => {
  const { start, onChange, label } = props;

  const slideAnim = new Animated.Value(start ? 1 : 0);

  const slide = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 32],
  });

  const slideToggle = () => {
    Animated.timing(slideAnim, {
      toValue: start ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    onChange(!start);

    console.log(start);
  };

  return (
    <View className="flex flex-row items-center p-4 justify-between">
      <Text className="text-white font-bold text-lg">{label}</Text>
      <TouchableOpacity
        className="bg-slate-300 w-16 h-8 rounded-full"
        style={
          start
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
