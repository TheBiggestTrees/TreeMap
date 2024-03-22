import React from "react";
import { Text, TextInput, TouchableHighlight, View } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";

const AddTree = (props) => {
  const { setShowAddTree, setShowCustomTree, addNewTree, setShowSelectedSite, sliderRef } = props;

  const [temp, setTemp] = React.useState({
      treeID: 0,
      treeSpecies: "Oak",
      needsWork: false,
      dateCreated: 'N/A',
      datePlanted: "N/A",
      lastWorkDate: "N/A",
      siteID: '0',
  });

  return (
    <>
      <View className="flex justify-center items-center text-center mb-4 border-b-2 border-gray-700 w-4/5 pb-2">
        <Text className="font-bold text-white text-xl">Add Tree</Text>
      </View>
      <View className="flex flex-row w-full justify-between">
        <TouchableHighlight
          className="rounded-lg bg-[#464a52] h-14 flex justify-center "
          activeOpacity={0.5}
          underlayColor="#6b7280"
          onPress={() => {
            addNewTree();
            setShowAddTree(false);
            sliderRef.current.hide();
          }}
        >
          <View className="flex flex-row justify-evenly w-40 items-center">
            <Text className="text-white font-bold text-lg">My Location</Text>
            <Icons name="my-location" size={28} color="#56ccdb"></Icons>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          className="rounded-lg bg-[#464a52] h-14 flex justify-center"
          activeOpacity={0.5}
          underlayColor="#6b7280"
          onPress={() => {
            setShowCustomTree(true);
            setShowAddTree(false);
            sliderRef.current.show((toValue = 265));
          }}
        >
          <View className="flex flex-row justify-evenly w-40 items-center">
            <Text className="text-white font-bold text-lg">Pick Point</Text>
            <Icons name="pin-drop" size={28} color="#56ccdb"></Icons>
          </View>
        </TouchableHighlight>
      </View>

      <View className="flex w-full m-4 justify-center">
        <View className="flex flex-row items-center">
          <Text className="text-white text-lg font-bold">Species: </Text>
          <TextInput className="bg-white w-3/5" onChange={e => {
            setTemp(prev => ({...prev, treeSpecies: 
              e.nativeEvent.text}) );
            }} value={temp.treeSpecies} ></TextInput>
        </View>
      </View>

      
        <TouchableHighlight
          className="rounded-lg bg-[#464a52] h-14 flex justify-center"
          activeOpacity={0.5}
          underlayColor="#6b7280"
          onPress={() => {
            setShowAddTree(false);
            setShowSelectedSite(true);
          }}
        >
          <View className="flex flex-row justify-evenly w-40 items-center">
            <Icons name="undo" size={28} color="#56ccdb"></Icons>
            <Text className="text-white font-bold text-lg">Go Back</Text>
          </View>
        </TouchableHighlight>
    </>
  );
};

export default AddTree;
