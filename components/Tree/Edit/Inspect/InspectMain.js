import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import ScreenContext from "../../../../context/screenContext";
import ToggleSwitch from "../../../UI/ToggleSwitch";
import ButtonsLeft from "../../../UI/ButtonsLeft";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import ButtonsRight from "../../../UI/ButtonsRight";
import DropdownSelect from "../../../UI/DropdownSelect";
import CommentBox from "../../../UI/CommentBox";
import AddPhotos from "../AddPhotos";
import NeedsWorkItem from "../../../UI/NeedsWorkItem";
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

  const [comment, setComment] = useState(
    workingTree.properties.needsWorkComment
  );

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

  const handleRequest = async () => {
    const workingIndex = trees.features.findIndex(
      (treef) => treef._id === workingTree._id
    );
    const index = selectedTrees.findIndex(
      (treef) => treef._id === workingTree._id
    );

    const newDate = new Date();
    const date = newDate.toLocaleDateString();
    const time = newDate.toLocaleTimeString();

    let tempRecordName = { datePlanted: "N/A", plantedBy: "N/A" };
    if (inspectTree.properties.plantedBy === "N/A") {
      tempRecordName.plantedBy = `${user.firstName} ${user.lastName}`;
      tempRecordName.datePlanted = `${date} ${time}`;
    } else {
      tempRecordName.plantedBy = workingTree.properties.plantedBy;
      tempRecordName.datePlanted = workingTree.properties.datePlanted;
    }

    await axios
      .put(`${process.env.REACT_APP_API_URL}/tree/edit/${workingTree._id}`, {
        properties: {
          ...inspectTree.properties,
          ...tempRecordName,
          needsWorkComment: comment,
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
        console.log(err.response.data);
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
      <ScrollView className="bg-slate-400 w-full mt-4 rounded-lg grow p-4">
        <View className="mb-8">
          <ToggleSwitch
            setter={treeInspector}
            tree={inspectTree}
            label="Planted"
            propname="isPlanted"
          />
          <ToggleSwitch
            setter={treeInspector}
            tree={inspectTree}
            label="Needs Work"
            propname="needsWork"
          />

          {inspectTree.properties.needsWork && (
            <>
              <NeedsWorkItem
                workingTree={inspectTree}
                setWorkingTree={treeInspector}
                comment={comment}
                setComment={setComment}
              />
            </>
          )}

          <DropdownSelect
            working={inspectTree.properties.status}
            setWorking={treeInspector}
            options={[
              "Healthy",
              "Stressed",
              "Diseased",
              "Infested",
              "Damaged",
              "Dying",
              "Dead",
            ]}
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

          <AddPhotos
            handleRequest={handleRequest}
            photos={inspectTree.properties.photos}
          />
        </View>
      </ScrollView>
      <View className="flex flex-row rounded py-8-lg mb-14 mt-4 justify-between w-full ">
        <ButtonsLeft
          handlePress={handleGoBack}
          width={"w-40"}
          icon="undo"
          text="Go Back"
        />
        <ButtonsRight
          handlePress={() => handleRequest()}
          width={"w-40"}
          icon="save"
          text="Save"
        />
      </View>
    </>
  );
};

export default InspectMain;
