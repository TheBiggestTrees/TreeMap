import React from "react";
import { Text, View } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";

const DisplayWork = (props) => {
  const { workingTree } = props;

  return (
    <View className="bg-slate-400 shadow-lg px-4 py-4 rounded-xl">
      <Text className="text-white font-bold text-lg py-2 px-4">Needs Work</Text>
      <View className="bg-gray-500 h-1 rounded-full w-full"></View>
      {workingTree.properties.needsWorkComment.map((comment, index) => {
        return (
          <View
            key={index}
            className="flex flex-row items-center justify-between bg-[#4e545f56] rounded-lg p-4 mt-2"
          >
            <Text className="text-white font-bold text-lg">
              {comment.comment}
            </Text>
            {!comment.completed ? (
              <Icons name="close" size={28} color="#FF0000"></Icons>
            ) : (
              <Icons name="check" size={28} color="#3bbf46"></Icons>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default DisplayWork;
