import axios from "axios";
import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";

const AddTree = (props) => {
  const { setShowAddSite, setShowCustomMark, addNewSite } = props;

  return (
    <View className={"flex h-full w-full bg-[#6b7280] items-center"}>
      <TouchableHighlight
        className="rounded-lg self-end m-4 w-[60px] h-[60px] flex items-center justify-center bg-[#6b7280]"
        activeOpacity={0.5}
        underlayColor="#6b7280"
        onPress={() => {
          setShowAddSite(false);
        }}
      >
        <Icons name="close" size={40} color="#374151"></Icons>
      </TouchableHighlight>

      <View className="flex flex-row gap-8">
        <TouchableHighlight
          className="bg-[#56ccdb] w-24 h-16 rounded-lg flex justify-center items-center"
          activeOpacity={0.5}
          underlayColor="#6b7280"
          onPress={() => {
            addNewSite();
            setShowAddSite(false);
          }}
        >
          <Text className="text-white text-center font-bold text-lg">
            Use My Location
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          className="bg-[#56ccdb] w-24 h-16 rounded-lg flex justify-center items-center"
          activeOpacity={0.5}
          underlayColor="#6b7280"
          onPress={() => {
            setShowCustomMark(true);
            setShowAddSite(false);
          }}
        >
          <Text className="text-white text-center font-bold text-lg">
            Pick Point on Map
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default AddTree;
