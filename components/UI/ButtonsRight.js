import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";

const ButtonsRight = (props) => {
  const { handlePress, icon, text, size, width, underlayColor } = props;

  return (
    <TouchableHighlight
      className={
        width !== undefined
          ? `rounded-lg bg-[#464a52] h-14 flex justify-center ${width}`
          : "rounded-lg bg-[#464a52] h-14 flex justify-center"
      }
      activeOpacity={0.5}
      underlayColor={underlayColor !== undefined ? underlayColor : "#6b728022"}
      onPress={() => {
        handlePress();
      }}
    >
      <View
        className={
          width !== undefined
            ? `flex flex-row justify-evenly w-40 items-center ${width}`
            : "flex flex-row justify-evenly w-40 items-center"
        }
      >
        <Text className="text-white font-bold text-lg">{text}</Text>
        {!icon ? null : (
          <Icons name={icon} size={size || 40} color="#56ccdb"></Icons>
        )}
      </View>
    </TouchableHighlight>
  );
};

export default ButtonsRight;
