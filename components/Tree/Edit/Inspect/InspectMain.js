import React, { useContext, useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import ScreenContext from "../../../../context/screenContext";
import ToggleSwitch from "../../../UI/ToggleSwitch";
import ButtonsLeft from "../../../UI/ButtonsLeft";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import ButtonsRight from "../../../UI/ButtonsRight";

const InspectMain = () => {
  const {
    setTrees,
    workingTree,
    setWorkingTree,
    setCurrentScreen,
    trees,
    selectedTrees,
    setErrMsg,
    setSelectedTrees,
  } = useContext(ScreenContext);

  const [inspectTree, treeInspector] = useState(workingTree);
  useEffect(() => {
    treeInspector(workingTree);
  }, []);

  const { user } = useAuth();

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
          ...inspectTree.properties,
          [propname]: inspectTree.properties[propname],
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
      </View>
      <View className="bg-slate-400 flex w-full mt-4 rounded-lg grow p-4">
        <Text className="text-white font-bold text-lg">Initial Inspection</Text>
        <ToggleSwitch
          setter={treeInspector}
          tree={inspectTree}
          label="Planted"
          propname="isPlanted"
        />
        <View>
          <Text className="text-white text-lg font-bold border-b-2 border-gray-500">
            Comment:{" "}
          </Text>

          <TextInput
            className="text-white h-full flex align-text-top border-gray-500"
            onChange={(e) =>
              treeInspector((prev) => ({
                ...prev,
                properties: { ...prev.properties, comment: e.nativeEvent.text },
              }))
            }
            multiline={true}
            value={inspectTree.comment}
          ></TextInput>
        </View>
      </View>
      <View className="flex flex-row rounded-lg mb-14 mt-4 justify-between w-full ">
        <ButtonsLeft
          handlePress={handleGoBack}
          width={"w-40"}
          icon="undo"
          text="Go Back"
        />
        <ButtonsRight
          handlePress={() => handleRequest("isPlanted")}
          width={"w-40"}
          icon="save"
          text="Save"
        />
      </View>
    </>
  );
};

export default InspectMain;
