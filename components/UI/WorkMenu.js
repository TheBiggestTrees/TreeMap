import React, { useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import ScreenContext from "../../context/screenContext";

const WorkMenu = () => {
  const { workingTree } = useContext(ScreenContext);

  return (
    <View>
      <Text className="font-bold text-lg text-white self-center pb-4">
        Working Tree {workingTree.properties.treeID}
      </Text>
      <ScrollView className="rounded-xl bg-slate-400">
        {workingTree.properties.needsWorkComment &&
          workingTree.properties.needsWorkComment.map((comment, index) => {
            return (
              <Text
                key={index}
                className="font-bold mt-4 ml-4 text-lg text-white"
              >
                {comment.comment}
              </Text>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default WorkMenu;
