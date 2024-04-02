import React, { useContext, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenContext from "../../../context/screenContext";
import Icons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";

const ViewTree = () => {
  const {
    workingTree,
    sliderTitle,
    setErrMsg,
    setCurrentScreen,
    setShowCustomTree,
    setSelectedTrees,
    setTrees,
    trees,
    selectedTrees,
    setWorkingTree,
  } = useContext(ScreenContext);

  const [comment, setComment] = useState(
    workingTree.properties.needsWorkComment
  );
  const [addComment, setAddComment] = useState("");

  const handleDelete = (index) => {
    let temp = [...comment];
    temp.splice(index, 1);
    setComment(temp);
    try {
      const workingIndex = trees.features.findIndex(
        (tree) => tree._id === workingTree._id
      );
      const index = selectedTrees.findIndex(
        (tree) => tree._id === workingTree._id
      );
      workingTree.properties.needsWorkComment = temp;

      axios
        .put(process.env.REACT_APP_API_URL + "/tree/edit/" + workingTree._id, {
          properties: { ...workingTree.properties },
        })
        .then((res) => {
          setSelectedTrees((prev) => {
            prev[index] = res.data.data;
            return prev;
          });
          setTrees((prev) => {
            prev.features[workingIndex] = res.data.data;
            return prev;
          });
          setWorkingTree(res.data.data);
        });
    } catch (err) {
      console.log(err);
      setErrMsg("Error adding!");
    }
  };

  const handleAddComment = () => {
    let temp = [...comment];
    temp.push(addComment);
    setComment(temp);
    setAddComment("");
    try {
      const workingIndex = trees.features.findIndex(
        (tree) => tree._id === workingTree._id
      );
      const index = selectedTrees.findIndex(
        (tree) => tree._id === workingTree._id
      );
      workingTree.properties.needsWorkComment = temp;

      axios
        .put(process.env.REACT_APP_API_URL + "/tree/edit/" + workingTree._id, {
          properties: { ...workingTree.properties },
        })
        .then((res) => {
          setSelectedTrees((prev) => {
            prev[index] = res.data.data;
            return prev;
          });
          setTrees((prev) => {
            prev.features[workingIndex] = res.data.data;
            return prev;
          });
          setWorkingTree(res.data.data);
        });
    } catch (err) {
      console.log(err);
      setErrMsg("Error adding!");
    }
  };

  return (
    <View className="flex items-center gap-4">
      {/* Title bar */}
      <View className="flex flex-row bg-slate-400 shadow-lg py-4 rounded-full items-center">
        <TouchableHighlight
          className="flex items-center justify-center absolute left-2 top-2 w-14 h-14 rounded-full"
          onPress={() => {
            setCurrentScreen("SelectedSite");
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
        <TouchableHighlight
          className="flex items-center w-36 h-14 justify-center bg-slate-600 shadow-lg rounded-xl border-b-2 border-b-gray-500"
          onPress={() => {
            setCurrentScreen("InspectMain");
          }}
          activeOpacity={0.5}
          underlayColor="#6b7280"
        >
          <Text className="text-white font-bold text-lg">Inspect</Text>
        </TouchableHighlight>
        <TouchableHighlight
          className="flex items-center w-36 h-14 justify-center bg-slate-600 shadow-lg rounded-xl border-b-2 border-b-gray-500"
          onPress={() => {
            setCurrentScreen("WorkMain");
          }}
          activeOpacity={0.5}
          underlayColor="#6b7280"
        >
          <Text className="text-white font-bold text-lg">Work</Text>
        </TouchableHighlight>
      </View>

      <View className="h-[67.5%] w-80 rounded-lg">
        <ScrollView className="gap-y-2">
          <View className="flex bg-slate-400 shadow-lg px-5 py-4 w-full rounded-xl">
            <View className="">
              <Text className="px-5 py-2 text-white font-bold text-lg">
                Work Needed
              </Text>
              <View className="bg-gray-500 h-1 rounded-full"></View>
            </View>
            <View className="py-2">
              {comment.length < 1 ? (
                <>
                  <Text className="font-bold text-white text-lg mt-4 self-center">
                    No work needed
                  </Text>
                  <Text className="font-bold text-white text-lg mb-4 self-center">
                    Add a task...
                  </Text>
                </>
              ) : (
                comment.map((comment, index) => {
                  return (
                    <View
                      key={index}
                      className="flex flex-row items-center justify-between bg-slate-400 shadow-lg px-5 py-4 w-full rounded-xl"
                    >
                      <Text className="text-white font-bold text-lg">
                        {comment}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          handleDelete(index);
                        }}
                      >
                        <Icons name="delete" size={30} color="#FF0000"></Icons>
                      </TouchableOpacity>
                    </View>
                  );
                })
              )}
              <View className="flex flex-row">
                <TextInput
                  onChange={(e) => {
                    setAddComment(e.nativeEvent.text);
                  }}
                  value={addComment}
                  placeholder="Add Comment"
                  placeholderTextColor={"#ffffff78"}
                  className="bg-[#ffffff31] text-white text-lg font-bold p-2 rounded-xl grow"
                />
                <TouchableOpacity
                  onPress={() => {
                    if (addComment !== "") {
                      handleAddComment();
                      setErrMsg("");
                    } else {
                      setErrMsg("Please enter a comment.");
                    }
                  }}
                >
                  <Icons name="add" size={40} color="#808080"></Icons>
                </TouchableOpacity>
              </View>
            </View>
          </View>

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
              Comment: {workingTree.properties.comment}
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
