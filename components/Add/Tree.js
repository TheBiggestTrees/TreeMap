import React, { useContext } from "react";
import { Text, TextInput, View } from "react-native";
import ScreenContext from "../../context/screenContext";
import ButtonsRight from "../UI/ButtonsRight";
import ButtonsLeft from "../UI/ButtonsLeft";

const AddTree = (props) => {
  const {
    setTempTreeForm,
    tempTreeForm,
    setShowCustomTree,
    sliderTitle,
    sliderRef,
    setCurrentScreen,
  } = useContext(ScreenContext);

  const { addNewTree } = props;

  const changeData = (e, name) => {
    setTempTreeForm((prev) => ({ ...prev, [name]: e.nativeEvent.text }));
    console.log({ ...tempTreeForm, [name]: e.nativeEvent.text });
  };

  const handleNewTree = () => {
    addNewTree();
    setCurrentScreen("selectedSite");
    sliderRef.current.hide();
  };

  const handlePickPoint = () => {
    setShowCustomTree(true);
    setCurrentScreen("TreeCustPos");
    sliderRef.current.show((toValue = 265));
  };

  const handleGoBack = () => {
    setCurrentScreen("SelectedSite");
    setTempTreeForm({
      treeID: 0,
      treeSpecies: "Oak",
      treeFamily: "Fagaceae",
      status: "Alive",
      condition: "Good",
      leafCondition: "Good",
      comment: "N/A",
      lastModifiedDate: "N/A",
      lastModifiedBy: "N/A",
      lastWorkDate: "N/A",
      lastWorkedBy: "N/A",
      needsWork: false,
      needsWorkComment: "N/A",
      dbh: 0,
      dateCreated: "N/A",
      createdBy: "N/A",
      plantedBy: "N/A",
      datePlanted: "N/A",
      photos: ["N/A"],
      siteID: "0",
    });
  };

  return (
    <>
      <View className="flex justify-center items-center text-center mb-4 border-b-2 border-gray-700 w-4/5 pb-2">
        <Text className="font-bold text-white text-xl">
          Add Tree to Site: {sliderTitle}
        </Text>
      </View>
      <View className="flex flex-row w-full justify-between">
        <ButtonsRight
          handlePress={handleNewTree}
          icon="my-location"
          text="My Location"
          size={28}
        />

        <ButtonsRight
          handlePress={handlePickPoint}
          icon="pin-drop"
          text="Pick Point"
          size={28}
        />
      </View>

      <View className="flex w-full m-4 justify-center">
        <View className="bg-slate-400 rounded-2xl flex mb-2 p-4">
          <Text className="text-white text-lg font-bold border-b-2 border-gray-500">
            Species:{" "}
          </Text>

          <TextInput
            className="text-white border-gray-500"
            onChange={(e) => {
              changeData(e, "treeSpecies");
            }}
            multiline={true}
            value={tempTreeForm.treeSpecies}
          ></TextInput>
        </View>

        <View className="bg-slate-400 rounded-2xl flex p-4">
          <Text className="text-white text-lg font-bold border-b-2 border-gray-500">
            Comment:{" "}
          </Text>

          <TextInput
            className="text-white border-gray-500"
            onChange={(e) => {
              changeData(e, "comment");
            }}
            multiline={true}
            value={tempTreeForm.comment}
          ></TextInput>
        </View>
      </View>

      <ButtonsLeft handlePress={handleGoBack} icon="undo" text="Go Back" />
    </>
  );
};

export default AddTree;
