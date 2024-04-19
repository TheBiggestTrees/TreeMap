import React, { useContext, useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import ScreenContext from "../../../../context/screenContext";
import ToggleSwitch from "../../../UI/ToggleSwitch";
import ButtonsLeft from "../../../UI/ButtonsLeft";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import ButtonsRight from "../../../UI/ButtonsRight";
import DropdownSelect from "../../../UI/DropdownSelect";
import CommentBox from "../../../UI/CommentBox";

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

  const handleRemoveComment = (index) => {
    if (inspectTree.properties.comment.length === 1) {
      treeInspector((prev) => ({
        ...prev,
        properties: {
          ...prev.properties,
          comment: [],
        },
      }));
    } else {
      treeInspector((prev) => ({
        ...prev,
        properties: {
          ...prev.properties,
          comment: [
            ...prev.properties.comment.slice(0, index),
            ...prev.properties.comment.slice(index + 1),
          ],
        },
      }));
    }
    console.log(inspectTree.properties.comment);
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
        <View>
          <Text className="text-white font-bold text-lg">
            Initial Inspection
          </Text>
          <ToggleSwitch
            setter={treeInspector}
            tree={inspectTree}
            label="Planted"
            propname="isPlanted"
          />

          <DropdownSelect
            working={inspectTree.properties.status}
            setWorking={treeInspector}
            options={["Alive", "Deceased", "Planted", "Removed"]}
            label="Status"
            border={"border-b-2"}
            bgcolor={"bg-[#4e545f56]"}
            borderColor={"border-gray-500"}
          />
          <CommentBox
            comments={inspectTree.properties.comment}
            setComments={treeInspector}
            handlePress={handleRemoveComment}
            label="Comment"
            bgColor={"bg-[#4e545f56]"}
          />
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
