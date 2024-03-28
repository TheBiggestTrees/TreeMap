import React, { useContext } from "react";
import { ScrollView, Text, TouchableHighlight, View } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";
import ScreenContext from "../../context/screenContext";

const SelectedSite = () => {
  const {
    sliderRef,
    sliderTitle,
    selectedTrees,
    setSelectedTrees,
    setShowCustomTree,
    setCurrentScreen,
  } = useContext(ScreenContext);

  return (
    <>
      <View>
        <ScrollView>
          {selectedTrees && selectedTrees.map((tree, index) => (
            <TouchableHighlight
              key={index}
              onPress={() => {
                setCurrentScreen("SelectedTree");
                setSelectedTrees(tree);
                setShowCustomTree(false);
                sliderRef.current.show({
                  toValue: 200,
                });
              }}
            >
              <View>
                <Text className="font-bold text-lg text-white">{tree.properties.treeID.toString().padStart(4, "0")}</Text>
                <Text className="font-bold text-lg text-white">{tree.properties.treeSpecies}</Text>
                <Text className="font-bold text-lg text-white">{tree.properties.treeFamily}</Text>
                <Text className="font-bold text-lg text-white">{tree.properties.dateCreated}</Text>
                {tree.properties.needsWork && <Text className="font-bold text-lg text-red">Needs Work</Text>}

              </View>
            </TouchableHighlight>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default SelectedSite;
