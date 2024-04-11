import React, { useContext } from "react";
import { ScrollView, Text, TouchableHighlight, View } from "react-native";
import ScreenContext from "../../../context/screenContext";
import Icons from "@expo/vector-icons/MaterialIcons";
import PhotosPanel from "./PhotosPanel";
import NeedsWorkItem from "../../UI/NeedsWorkItem";
import ToggleSwitch from "../../UI/ToggleSwitch";

const ViewTree = () => {
  const { workingTree, sliderTitle, setCurrentScreen, setShowCustomTree } =
    useContext(ScreenContext);

  return (
    <View className="flex items-center gap-4">
      {/* Title bar */}
      <View className="flex flex-row bg-slate-400 shadow-lg py-4 rounded-full items-center">
        <TouchableHighlight
          className="flex items-center justify-center absolute left-2 top-2 w-14 h-14 rounded-full"
          onPress={() => {
            setCurrentScreen("SelectedSite");
            setShowCustomTree(false);
          }}
          activeOpacity={0.2}
          underlayColor="#4e545f22"
        >
          <Icons name="arrow-back-ios-new" size={40} color="#808080" />
        </TouchableHighlight>
        <View className="h-10 w-full flex flex-row justify-evenly">
          <View className="flex items-center justify-center">
            <Text className="font-bold text-lg text-white">
              {sliderTitle.toString().padStart(4, "0")}
            </Text>
            <Text className="text-white font-bold text-lg">Site</Text>
          </View>
          <View className="flex items-center justify-center">
            <Text className="font-bold text-lg text-white">
              {workingTree.properties.treeID.toString().padStart(4, "0")}
            </Text>
            <Text className="text-white font-bold text-lg">Tree</Text>
          </View>
        </View>
      </View>

      {/* Inspect / Work buttons */}
      <View className="flex flex-row w-80 justify-evenly">
        <TouchableHighlight
          className="flex items-center w-36 h-14 justify-center bg-slate-600 shadow-lg rounded-xl border-b-2 border-b-gray-500"
          onPress={() => {
            setCurrentScreen("InspectMain");
          }}
          activeOpacity={0.5}
          underlayColor="#6b7280"
        >
          <Text className="text-white font-bold text-lg">Inspect</Text>
        </TouchableHighlight>
        <TouchableHighlight
          className="flex items-center w-36 h-14 justify-center bg-slate-600 shadow-lg rounded-xl border-b-2 border-b-gray-500"
          onPress={() => {
            setCurrentScreen("WorkMain");
          }}
          activeOpacity={0.5}
          underlayColor="#6b7280"
        >
          <Text className="text-white font-bold text-lg">Work</Text>
        </TouchableHighlight>
      </View>

      <View className="h-[67.5%] rounded-lg">
        <ScrollView className="gap-y-2">
          {/* Needs work items */}
          {workingTree.properties.needsWork && <NeedsWorkItem nonEdit={true} />}

          {/* Photos */}
          <PhotosPanel />

          {/* Tree information */}
          <View className="flex items-center bg-slate-400 shadow-lg px-10 py-4 rounded-xl">
            <Text className="text-white font-bold text-lg">
              Species: {workingTree.properties.treeSpecies}
            </Text>
            <Text className="text-white font-bold text-lg">
              Status: {workingTree.properties.status}
            </Text>
            <Text className="text-white font-bold text-lg">
              DBH: {workingTree.properties.dbh}
            </Text>
            <Text className="text-white font-bold text-lg">
              Condition: {workingTree.properties.condition}
            </Text>
            <Text className="text-white font-bold text-lg">
              Comment: {workingTree.properties.comment}
            </Text>
            <Text className="text-white font-bold text-lg">
              Last Work Date: {workingTree.properties.lastWorkDate}
            </Text>
            <Text className="text-white font-bold text-lg">
              Last Worked By: {workingTree.properties.lastWorkedBy}
            </Text>
            <Text className="text-white font-bold text-lg">
              Last Modified By: {workingTree.properties.lastModifiedBy}
            </Text>
            <Text className="text-white font-bold text-lg">
              Date Modified: {workingTree.properties.lastModifiedDate}
            </Text>
            <Text className="text-white font-bold text-lg">
              Date Created: {workingTree.properties.dateCreated}
            </Text>
            <Text className="text-white font-bold text-lg">
              Created By: {workingTree.properties.createdBy}
            </Text>
            <Text className="text-white font-bold text-lg">
              Planted: {workingTree.properties.isPlanted ? "Yes" : "No"}
            </Text>
            <Text className="text-white font-bold text-lg">
              Planted By: {workingTree.properties.plantedBy}
            </Text>
            <Text className="text-white font-bold text-lg">
              Date Planted: {workingTree.properties.datePlanted}
            </Text>
            <Text className="text-white font-bold text-lg">
              Coordinates: [{workingTree.geometry.coordinates[0].toFixed(5)},{" "}
              {workingTree.geometry.coordinates[1].toFixed(5)}]
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ViewTree;
