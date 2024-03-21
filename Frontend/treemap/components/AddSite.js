import axios from "axios";
import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";

const AddSite = (props) => {
  const { setShowAddSite, setShowCustomMark, addNewSite, sliderRef } = props;

  return (
    <>
      <View className="flex justify-center items-center text-center mb-4 border-b-2 border-gray-700 w-4/5 pb-2"><Text className="font-bold text-white text-xl">Add Site</Text></View>
      <View className="flex flex-row w-full justify-between">
        <TouchableHighlight
          className="rounded-lg bg-[#464a52] h-14 flex justify-center "
          activeOpacity={0.5}
          underlayColor="#6b7280"
          onPress={() => {
            addNewSite();
            setShowAddSite(false);
            sliderRef.current.hide();
          }}
        >
          <View className="flex flex-row justify-evenly w-40 items-center">
            <Text className="text-white font-bold text-lg">
              My Location
            </Text>
            <Icons name="my-location" size={28} color="#56ccdb"></Icons>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          className="rounded-lg bg-[#464a52] h-14 flex justify-center"
          activeOpacity={0.5}
          underlayColor="#6b7280"
          onPress={() => {
            setShowCustomMark(true);
            setShowAddSite(false);
            sliderRef.current.show((toValue = 265));
          }}
        >
          <View className="flex flex-row justify-evenly w-40 items-center">
            <Text className="text-white font-bold text-lg">
              Pick Point
            </Text>
            <Icons name="pin-drop" size={28} color="#56ccdb"></Icons>
          </View>
        </TouchableHighlight>
      </View>
      <View className="mt-4">
        <TouchableHighlight
          className="rounded-lg bg-[#464a52] h-14 flex justify-center"
          activeOpacity={0.5}
          underlayColor="#6b7280"
          onPress={() => {
            setShowAddSite(false);
            sliderRef.current.hide();
          }}
        >
          <View className="flex flex-row justify-evenly w-40 items-center">
            <Icons name="undo" size={28} color="#56ccdb"></Icons>
            <Text className="text-white font-bold text-lg">Go Back</Text>
          </View>
        </TouchableHighlight>
      </View>
    </>
  );
};

export default AddSite;
