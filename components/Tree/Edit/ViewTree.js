import React, { useContext } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import ScreenContext from "../../../context/screenContext";
import Icons from "@expo/vector-icons/MaterialIcons";

const ViewTree = () => {
  const { workingTree, sliderTitle } = useContext(ScreenContext);

  return (
    <View className="flex items-center gap-4">
      <View className="flex flex-row items-center bg-slate-400 shadow-lg py-4 rounded-full">
        <View className="h-10 w-full flex flex-row justify-evenly">
            <View className="flex items-center justify-center">
                <Text className="font-bold text-lg text-white">{workingTree.properties.treeID.toString().padStart(4, "0")}</Text>
                <Text className="text-white font-bold text-lg">Tree</Text>
            </View>
            <View className="flex items-center justify-center">
                <Text className="font-bold text-lg text-white">{sliderTitle.toString().padStart(4, "0")}</Text>
                <Text className="text-white font-bold text-lg">Site</Text>
            </View>
        </View>
      </View>

      <View className="flex items-center bg-slate-400 shadow-lg px-10 rounded-xl">
        <Text className="text-white font-bold text-lg">
          Species: {workingTree.properties.treeSpecies}
        </Text>
        <Text className="text-white font-bold text-lg">
          Family: {workingTree.properties.treeFamily}
        </Text>
        <Text className="text-white font-bold text-lg">
          Status: {workingTree.properties.status}
        </Text>
        <Text className="text-white font-bold text-lg">
          Condition: {workingTree.properties.condition}
        </Text>
        <Text className="text-white font-bold text-lg">
          Leaf Condition: {workingTree.properties.leafCondition}
        </Text>
        <Text className="text-white font-bold text-lg">
          Comment: {workingTree.properties.comment}
        </Text>
        <Text className="text-white font-bold text-lg">
          Last Modified Date: {workingTree.properties.lastModifiedDate}
        </Text>
        <Text className="text-white font-bold text-lg">
          Last Modified By: {workingTree.properties.lastModifiedBy}
        </Text>
        <Text className="text-white font-bold text-lg">
          Last Work Date: {workingTree.properties.lastWorkDate}
        </Text>
        <Text className="text-white font-bold text-lg">
          Last Worked By: {workingTree.properties.lastWorkedBy}
        </Text>
        <Text className="text-white font-bold text-lg">
          Needs Work: {workingTree.properties.needsWork.toString()}
        </Text>
        <Text className="text-white font-bold text-lg">
          Needs Work Comment: {workingTree.properties.needsWorkComment}
        </Text>
        <Text className="text-white font-bold text-lg">
          DBH: {workingTree.properties.dbh}
        </Text>
        <Text className="text-white font-bold text-lg">
          Date Created: {workingTree.properties.dateCreated}
        </Text>
        <Text className="text-white font-bold text-lg">
          Created By: {workingTree.properties.createdBy}
        </Text>
        <Text className="text-white font-bold text-lg">
          Planted By: {workingTree.properties.plantedBy}
        </Text>
        <Text className="text-white font-bold text-lg">
          Date Planted: {workingTree.properties.datePlanted}
        </Text>
        <Text className="text-white font-bold text-lg">
          Photos: {workingTree.properties.photos}
        </Text>
      </View>
    </View>
  );
};

export default ViewTree;
