import React, { useContext } from "react";
import { Text, View } from "react-native";
import ScreenContext from "../../../../context/screenContext";

const InspectMain = () => {
  const { workingTree } = useContext(ScreenContext);

  return (
    <>
      <View>
        <Text className="text-white font-bold text-lg">
          Inspecting Tree{" "}
          {workingTree.properties.treeID.toString().padStart(4, "0")}
        </Text>
      </View>
      <View className="bg-slate-400 flex w-full mt-4 rounded-lg grow p-4">
        <View className="flex flex-row items-center justify-evenly">
          <Text className="font-bold text-white text-lg">Hello world</Text>
        </View>
      </View>
    </>
  );
};

export default InspectMain;
