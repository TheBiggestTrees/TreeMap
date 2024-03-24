import React, { useContext, useState } from "react";
import { Text, TextInput, TouchableHighlight, View } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";
import ScreenContext from "../../context/screenContext";

const AddTree = (props) => {
  const {
    setTempTreeForm,
    tempTreeForm,
    setShowCustomTree,
    sliderTitle,
    sliderRef,
    setCurrentScreen,
  } = useContext(ScreenContext);

  const { addNewTree } = props;

  const changeData = (e, name) => {
    setTempTreeForm((prev) => ({ ...prev, [name]: e.nativeEvent.text }));
    console.log({ ...tempTreeForm, [name]: e.nativeEvent.text });
  };

  return (
    <>
      <View className="flex justify-center items-center text-center mb-4 border-b-2 border-gray-700 w-4/5 pb-2">
        <Text className="font-bold text-white text-xl">
          Add Tree to Site: {sliderTitle}
        </Text>
      </View>
      <View className="flex flex-row w-full justify-between">
        <TouchableHighlight
          className="rounded-lg bg-[#464a52] h-14 flex justify-center "
          activeOpacity={0.5}
          underlayColor="#6b7280"
          onPress={() => {
            addNewTree();
            setCurrentScreen("selectedSite");
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
            setCurrentScreen("TreeCustPos");
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
          <TextInput
            className="text-white w-3/5"
            onChange={(e) => {
              changeData(e, "treeSpecies");
            }}
            value={tempTreeForm.treeSpecies}
          ></TextInput>
        </View>

        <View className="flex flex-row items-center">
          <Text className="text-white text-lg font-bold">Last Worked On: </Text>
          <TextInput
            className="text-white w-3/5"
            onChange={(e) => {
              changeData(e, "lastWorkDate");
            }}
            value={tempTreeForm.lastWorkDate}
          ></TextInput>
        </View>
      </View>

      <TouchableHighlight
        className="rounded-lg bg-[#464a52] h-14 flex justify-center"
        activeOpacity={0.5}
        underlayColor="#6b7280"
        onPress={() => {
          setCurrentScreen("SelectedSite");
          setTempTreeForm({
            treeID: 0,
            treeSpecies: "Oak",
            treeFamily: "Fagaceae",
            status: "Alive",
            condition: "Good",
            leafCondition: "Good",
            comment: "N/A",
            lastModifiedDate: "N/A",
            lastModifiedBy: "N/A",
            lastWorkDate: "N/A",
            lastWorkedBy: "N/A",
            needsWork: false,
            needsWorkComment: "N/A",
            dbh: 0,
            dateCreated: 'N/A',
            createdBy: 'N/A',
            plantedBy: "N/A",
            datePlanted: "N/A",
            photos: ["N/A"],
            siteID: '0',
          });
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
