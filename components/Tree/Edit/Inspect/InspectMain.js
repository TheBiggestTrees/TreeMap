import React, { useContext } from "react";
import { Text, View } from "react-native";
import ScreenContext from "../../../../context/screenContext";
import ToggleSwitch from "../../../UI/ToggleSwitch";

const InspectMain = () => {
  const { workingTree, setWorkingTree } = useContext(ScreenContext);

  return (
    <>
      <View>
        <Text className="text-white font-bold text-lg">
          Inspecting Tree{" "}
          {workingTree.properties.treeID.toString().padStart(4, "0")}
        </Text>
      </View>
      <View className="bg-slate-400 flex w-full mt-4 rounded-lg grow p-4">
        <ToggleSwitch
          setter={setWorkingTree}
          tree={workingTree}
          label="Planted"
          propname="isPlanted"
        />
      </View>
    </>
  );
};

export default InspectMain;
