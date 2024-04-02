import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";
import ScreenContext from "../../context/screenContext";
import axios from "axios";

const NeedsWorkItem = () => {
  const {
    setErrMsg,
    setSelectedTrees,
    setTrees,
    trees,
    selectedTrees,
    setWorkingTree,
    workingTree,
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
                <Icons
                  style={{
                    position: "absolute",
                    left: 15,
                    zIndex: 1,
                  }}
                  name="check"
                  size={40}
                  color="#3bbf46"
                ></Icons>
                <TouchableOpacity
                  onPress={() => {
                    console.log("cross out");
                  }}
                  className="bg-gray-700 w-7 h-7 rounded-lg "
                ></TouchableOpacity>
                <Text className="text-white font-bold text-lg">{comment}</Text>
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
  );
};

export default NeedsWorkItem;
