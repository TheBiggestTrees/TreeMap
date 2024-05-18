import React, { useContext, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import ScreenContext from "../../context/screenContext";
import NeedsWorkItem from "./NeedsWorkItem";

const WorkMenu = () => {
  const { workingTree, setWorkingTree } = useContext(ScreenContext);

  const [comment, setComment] = useState(
    workingTree.properties.needsWorkComment
  );

  const [nonEdit, setNonEdit] = useState(true);

  return (
    <View>
      <Text className="font-bold text-lg text-white self-center pb-4">
        Working Tree {workingTree.properties.treeID}
      </Text>
      <ScrollView className="rounded-xl bg-slate-400 flex p-4">
        <NeedsWorkItem
          workingTree={workingTree}
          setWorkingTree={setWorkingTree}
          comment={comment}
          setComment={setComment}
          nonEdit={nonEdit}
          setNonEdit={setNonEdit}
        />
      </ScrollView>
    </View>
  );
};

export default WorkMenu;
