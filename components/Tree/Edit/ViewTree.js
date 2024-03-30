import React, { useContext } from "react";
import { Text, View } from "react-native";
import ScreenContext from "../../../context/screenContext";

const ViewTree = () => {
  const { workingTree, sliderTitle } = useContext(ScreenContext);

  return (
    <View>
      <View className="flex flex-row justify-between items-center bg-[#]">
        <Text className="text-white font-bold text-lg" >Site: {sliderTitle.toString().padStart(4, "0")}</Text>
        <Text className="text-white font-bold text-lg" >
          Tree: {workingTree.properties.treeID.toString().padStart(4, "0")}
        </Text>
      </View>
      <View>
        <Text className="text-white font-bold text-lg" >Species: {workingTree.properties.treeSpecies}</Text>
        <Text className="text-white font-bold text-lg" >Family: {workingTree.properties.treeFamily}</Text>
        <Text className="text-white font-bold text-lg" >Status: {workingTree.properties.status}</Text>
        <Text className="text-white font-bold text-lg" >Condition: {workingTree.properties.condition}</Text>
        <Text className="text-white font-bold text-lg" >Leaf Condition: {workingTree.properties.leafCondition}</Text>
        <Text className="text-white font-bold text-lg" >Comment: {workingTree.properties.comment}</Text>
        <Text className="text-white font-bold text-lg" >Last Modified Date: {workingTree.properties.lastModifiedDate}</Text>
        <Text className="text-white font-bold text-lg" >Last Modified By: {workingTree.properties.lastModifiedBy}</Text>
        <Text className="text-white font-bold text-lg" >Last Work Date: {workingTree.properties.lastWorkDate}</Text>
        <Text className="text-white font-bold text-lg" >Last Worked By: {workingTree.properties.lastWorkedBy}</Text>
        <Text className="text-white font-bold text-lg" >Needs Work: {workingTree.properties.needsWork.toString()}</Text>
        <Text className="text-white font-bold text-lg" >Needs Work Comment: {workingTree.properties.needsWorkComment}</Text>
        <Text className="text-white font-bold text-lg" >DBH: {workingTree.properties.dbh}</Text>
        <Text className="text-white font-bold text-lg" >Date Created: {workingTree.properties.dateCreated}</Text>
        <Text className="text-white font-bold text-lg" >Created By: {workingTree.properties.createdBy}</Text>
        <Text className="text-white font-bold text-lg" >Planted By: {workingTree.properties.plantedBy}</Text>
        <Text className="text-white font-bold text-lg" >Date Planted: {workingTree.properties.datePlanted}</Text>
        <Text className="text-white font-bold text-lg" >Photos: {workingTree.properties.photos}</Text>
      </View>
    </View>
  );
};

export default ViewTree;
