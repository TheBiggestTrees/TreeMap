import React, { useContext } from "react";
import { Text, View } from "react-native";
import ScreenContext from "../../../../context/screenContext";
import ToggleSwitch from "../../../UI/ToggleSwitch";
import ButtonsLeft from "../../../UI/ButtonsLeft";
import PopupMsg from "../../../UI/PopupMsg";
import axios from "axios";

const InspectMain = () => {
  const {
    setTrees,
    workingTree,
    setWorkingTree,
    errMsg,
    setCurrentScreen,
    trees,
    selectedTrees,
    setErrMsg,
    setSelectedTrees,
    user,
  } = useContext(ScreenContext);

  const handleGoBack = () => {
    setCurrentScreen("ViewTree");
  };

  const handleRequest = async (propname) => {
    const workingIndex = trees.features.findIndex(
      (treef) => treef._id === workingTree._id
    );
    const index = selectedTrees.findIndex(
      (treef) => treef._id === workingTree._id
    );

    const newDate = new Date();
    const date = newDate.toLocaleDateString();
    const time = newDate.toLocaleTimeString();

    let temp = { datePlanted: "N/A", plantedBy: "N/A" };
    if (workingTree.properties.plantedBy === "N/A") {
      temp.plantedBy = `${user.firstName} ${user.lastName}`;
      temp.datePlanted = `${date} ${time}`;
    }

    await axios
      .put(process.env.REACT_APP_API_URL + "/tree/edit/" + workingTree._id, {
        properties: {
          ...workingTree.properties,
          [propname]: !workingTree.properties[propname],
          ...temp,
        },
      })
      .then((res) => {
        setErrMsg(res.data.message);
        setSelectedTrees((prev) => {
          prev[index] = res.data.data;
          return prev;
        });
        setTrees((prev) => {
          prev.features[workingIndex] = res.data.data;
          return prev;
        });
        setWorkingTree(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
          runFunc={() => handleRequest("isPlanted")}
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
