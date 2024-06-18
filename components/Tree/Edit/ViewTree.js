import React, { useContext } from "react";
import { ScrollView, Text, TouchableHighlight, View } from "react-native";
import ScreenContext from "../../../context/screenContext";
import PhotosPanel from "./PhotosPanel";
import ButtonsRight from "../../UI/ButtonsRight";
import DisplayWork from "../../UI/DisplayWork";
import Icons from "@expo/vector-icons/MaterialIcons";
import * as RootNavigation from "../../../RootNavigation";

const ViewTree = () => {
  const { workingTree, sliderTitle, setShowCustomTree } =
    useContext(ScreenContext);

  return (
    <View className="flex grow items-center gap-4 bg-gray-500">
      {/* Title bar */}
      <View className="flex flex-row bg-slate-400 shadow-lg py-4 rounded-full items-center">
        <TouchableHighlight
          className="flex items-center justify-center absolute left-2 top-2 w-14 h-14 rounded-full"
          onPress={() => {
            RootNavigation.navigate("SelectedSite");
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
        <ButtonsRight
          handlePress={() => {
            RootNavigation.navigate("InspectMain");
          }}
          text="Inspect"
          width={"w-36"}
        />
        <ButtonsRight
          handlePress={() => {
            RootNavigation.navigate("WorkMain");
          }}
          text="Work"
          width={"w-36"}
        />
      </View>

      <View className="h-[67.5%] rounded-lg">
        <ScrollView className="gap-y-2">
          {/* Needs work items */}
          {workingTree.properties.needsWork && (
            <DisplayWork workingTree={workingTree} />
          )}
          {workingTree.properties.comment.length > 0 && (
            <View className="bg-slate-400 shadow-lg px-4 py-4 rounded-xl">
              <Text className="text-white font-bold text-lg py-2 px-4">
                Comments
              </Text>
              <View className="bg-gray-500 h-1 rounded-full w-full"></View>
              {workingTree.properties.comment.map((comment, index) => {
                return (
                  <View
                    key={index}
                    className="flex flex-row items-center justify-between bg-[#4e545f56] rounded-lg p-4 mt-2"
                  >
                    <Text className="text-white font-bold text-lg w-[80%]">
                      {comment.workComment}
                    </Text>
                    {!comment.completed ? (
                      <Icons
                        name="assignment-late"
                        size={28}
                        color="#FF0000"
                      ></Icons>
                    ) : (
                      <Icons
                        name="assignment-turned-in"
                        size={28}
                        color="#3bbf46"
                      ></Icons>
                    )}
                  </View>
                );
              })}
            </View>
          )}

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
