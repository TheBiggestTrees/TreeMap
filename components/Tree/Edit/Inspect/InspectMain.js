import React, { useContext } from "react";
import { Text, View } from "react-native";
import ScreenContext from "../../../../context/screenContext";
import ToggleSwitch from "../../../UI/ToggleSwitch";
import ButtonsLeft from "../../../UI/ButtonsLeft";

const InspectMain = () => {
  const { workingTree, setWorkingTree, setCurrentScreen } =
    useContext(ScreenContext);

  const handleGoBack = () => {
    setCurrentScreen("ViewTree");
  };

  return (
    <>
      <View className="flex items-center">
        <Text className="text-white font-bold text-lg">
          Inspecting Tree{" "}
          {workingTree.properties.treeID.toString().padStart(4, "0")}
        </Text>
        <Text className="text-[#ffffff7c] text-sm w-48 text-center">
          Changes made here will be saved automatically
        </Text>
      </View>
      <View className="bg-slate-400 flex w-full mt-4 rounded-lg grow p-4">
        <ToggleSwitch
          setter={setWorkingTree}
          tree={workingTree}
          label="Planted"
          propname="isPlanted"
          sendReq={true}
        />
      </View>
      <View className="flex w-full mt-4 rounded-lg grow p-4 items-center">
        <ButtonsLeft
          handlePress={handleGoBack}
          width={"w-40"}
          icon="undo"
          text="Go Back"
        />
      </View>
    </>
  );
};

export default InspectMain;
