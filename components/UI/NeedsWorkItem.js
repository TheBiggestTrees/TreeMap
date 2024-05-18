import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";
import ScreenContext from "../../context/screenContext";

const NeedsWorkItem = (props) => {
  const { nonEdit, setNonEdit, workingTree, comment, setComment } = props;

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

  const handleAddComment = (suggestion) => {
    if (!suggestion) {
      let temp = [...comment];
      temp.push({ comment: addComment, completed: checked });
      setComment(temp);
    } else {
      let temp = [...comment];
      temp.push({ comment: suggestion, completed: checked });
      setComment(temp);
      setAddComment("");
    }
  };

  return (
    <View className="flex bg-[#4e545f56] shadow-lg px-5 py-4 mb-2 w-full rounded-xl">
      <View className="flex flex-row justify-between border-b-2 border-b-gray-500">
        <Text className=" py-2 text-white font-bold text-lg">Work Needed</Text>
        <TouchableOpacity
          className="flex justify-center items-center rounded-lg"
          activeOpacity={0.6}
          onPress={() => {
            setNonEdit(!nonEdit);
          }}
        >
          <Icons color={"#4e543488"} size={36} name={"edit"} />
        </TouchableOpacity>
      </View>
      <View className="py-2">
        {comment.length < 1 ? (
          <View>
            <Text className="font-bold text-white text-lg my-4 self-center">
              No work needed
            </Text>
            <View>
              <ScrollView
                className="h-20 gap-4"
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                <TouchableOpacity
                  onPress={() => handleAddComment("Infested")}
                  className="bg-[#464a52] flex justify-center items-center h-12 w-24 rounded-lg"
                >
                  <Text className="text-white font-bold text-lg">Infested</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleAddComment("Diseased")}
                  className="bg-[#464a52] flex justify-center items-center h-12 w-24 rounded-lg"
                >
                  <Text className="text-white font-bold text-lg">Diseased</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleAddComment("Damaged")}
                  className="bg-[#464a52] flex justify-center items-center h-12 w-24 rounded-lg"
                >
                  <Text className="text-white font-bold text-lg">Damaged</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleAddComment("Dead")}
                  className="bg-[#464a52] flex justify-center items-center h-12 w-24 rounded-lg"
                >
                  <Text className="text-white font-bold text-lg">Dead</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
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
                  <View className="flex items-center p-4">
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
              <Icons name="add" size={40} color="#464a52"></Icons>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default NeedsWorkItem;
