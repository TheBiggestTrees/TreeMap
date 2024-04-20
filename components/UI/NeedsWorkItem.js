import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";
import ScreenContext from "../../context/screenContext";

const NeedsWorkItem = (props) => {
  const { nonEdit, workingTree, comment, setComment } = props;

  const { setErrMsg } = useContext(ScreenContext);

  const [addComment, setAddComment] = useState("");
  const [checked, setChecked] = useState(
    workingTree.properties.needsWorkComment.completed
  );

  const workNeedednonEdit = () => {
    if (nonEdit) {
      return "flex flex-row items-center justify-center bg-[#636b79c9]  shadow-lg px-2 py-2 my-4 w-full rounded-xl";
    } else {
      return "flex flex-row items-center justify-between bg-[#636b79c9]  shadow-lg px-2 py-2 my-4 w-full rounded-xl";
    }
  };

  const updateChecked = (index) => {
    let temp = [...comment];
    temp[index].completed = !temp[index].completed;
    setComment(temp);
  };

  const handleDelete = (index) => {
    let temp = [...comment];
    temp.splice(index, 1);
    setComment(temp);
  };

  const handleAddComment = () => {
    let temp = [...comment];
    temp.push({ comment: addComment, completed: checked });
    setComment(temp);
    setAddComment("");
  };

  return (
    <View className="flex bg-[#4e545f56] shadow-lg px-5 py-4 mb-2 w-full rounded-xl">
      <View className="">
        <Text className=" py-2 text-white font-bold text-lg border-b-2 border-b-gray-500">
          Work Needed
        </Text>
      </View>
      <View className="py-2">
        {comment.length < 1 ? (
          <View>
            <Text className="font-bold text-white text-lg mt-4 self-center">
              No work needed
            </Text>
            <Text className="font-bold text-white text-lg mb-4 self-center">
              Add something...
            </Text>
          </View>
        ) : (
          comment.map((comment, index) => {
            return (
              <View key={index} className={workNeedednonEdit()}>
                {nonEdit ? null : (
                  <TouchableOpacity
                    onPress={() => {
                      updateChecked(index);
                    }}
                    className="bg-gray-700 w-7 h-7 rounded-lg "
                  >
                    {comment.completed && (
                      <Icons
                        style={{
                          position: "absolute",
                          top: -7,
                          right: 3,
                        }}
                        name="check"
                        size={40}
                        color="#3bbf46"
                      ></Icons>
                    )}
                  </TouchableOpacity>
                )}
                {comment.completed ? (
                  <View className="flex items-center">
                    <Text className="text-gray-300 font-bold text-lg my-[-14]">
                      {comment.comment}
                    </Text>
                    <View className="bg-red-600 h-1 rounded-full w-24"></View>
                  </View>
                ) : (
                  <Text className="text-white font-bold text-lg">
                    {comment.comment}
                  </Text>
                )}

                {nonEdit ? null : (
                  <TouchableOpacity
                    onPress={() => {
                      handleDelete(index);
                    }}
                  >
                    <Icons name="delete" size={30} color="#FF0000"></Icons>
                  </TouchableOpacity>
                )}
              </View>
            );
          })
        )}
        {nonEdit ? null : (
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
        )}
      </View>
    </View>
  );
};

export default NeedsWorkItem;
