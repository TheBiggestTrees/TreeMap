import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";

const CommentBox = (props) => {
  const { comments, setComments, label, bgColor, handlePress } = props;

  const [workComment, setWorkComment] = useState({
    workComment: "",
    completed: false,
  });

  return (
    <>
      <View className={`flex mt-2 rounded-2xl ${bgColor}`}>
        <View className="flex">
          <Text className="text-white font-bold text-lg pb-2 mt-2 mx-4 border-b-2 border-gray-500">
            {label}
          </Text>
          <View className="">
            {comments === undefined || comments.length < 1 ? (
              <View>
                <Text className="font-bold text-white text-lg mt-4 self-center">
                  No comments
                </Text>
              </View>
            ) : (
              comments.map((comment, index) => {
                return (
                  <View
                    key={index}
                    className="flex flex-row justify-between mx-4 my-2 items-center"
                  >
                    {/** component that adds a checkmark based on the value of comment.completed and a box to be able to change it back and forth */}
                    <TouchableOpacity
                      className="bg-gray-700 w-7 h-7 rounded-lg "
                      onPress={() => {
                        setComments((prev) => ({
                          ...prev,
                          properties: {
                            ...prev.properties,
                            comment: prev.properties.comment.map((item, i) => {
                              if (i === index) {
                                return {
                                  ...item,
                                  completed: !item.completed,
                                };
                              } else {
                                return item;
                              }
                            }),
                          },
                        }));
                      }}
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

                    {comment.completed ? (
                      <View className="flex items-center h-auto">
                        <Text className="text-gray-500 font-bold flex-wrap w-48 text-lg ">
                          {comment.workComment}
                        </Text>
                      </View>
                    ) : (
                      <Text className="text-white font-bold flex-wrap w-48 text-lg">
                        {comment.workComment}
                      </Text>
                    )}

                    <TouchableOpacity
                      onPress={() => {
                        handlePress(index);
                      }}
                    >
                      <Icons name="delete" size={30} color="#FF0000"></Icons>
                    </TouchableOpacity>
                  </View>
                );
              })
            )}
          </View>

          <View className="flex flex-row  rounded-lg p-2 ml-4">
            <TextInput
              multiline={true}
              className="w-56 h-auto text-white text-lg mb-4 border-b-2 border-gray-500 "
              value={workComment.workComment}
              onChangeText={(text) =>
                setWorkComment((prev) => ({
                  ...prev,
                  workComment: text,
                }))
              }
            ></TextInput>
            <TouchableHighlight
              className="m-2 rounded-full"
              activeOpacity={0.8}
              underlayColor={"#4e545f56"}
              onPress={() => {
                setComments((prev) => ({
                  ...prev,
                  properties: {
                    ...prev.properties,
                    comment: [...prev.properties.comment, workComment],
                  },
                }));
                setWorkComment((prev) => ({
                  ...prev,
                  workComment: "",
                }));
              }}
            >
              <Icons name="add" size={30} color="#464a52"></Icons>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </>
  );
};

export default CommentBox;
