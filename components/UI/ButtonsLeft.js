import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";

const ButtonsLeft = (props) => {
  const { handlePress, icon, text, size } = props;

  return (
    <TouchableHighlight
      className="rounded-lg bg-[#464a52] h-14 flex justify-center"
      activeOpacity={0.5}
      underlayColor="#6b7280"
      onPress={() => {
        handlePress();
      }}
    >
      <View className="flex flex-row justify-evenly w-40 items-center">
        {!icon ? null : (
          <Icons name={icon} size={size || 40} color="#56ccdb"></Icons>
        )}
        <Text className="text-white font-bold text-lg">{text}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default ButtonsLeft;
