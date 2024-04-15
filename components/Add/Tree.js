import React, { useContext, useState } from "react";
import { Text, TextInput, View } from "react-native";
import ScreenContext from "../../context/screenContext";
import ButtonsRight from "../UI/ButtonsRight";
import ButtonsLeft from "../UI/ButtonsLeft";
import ToggleSwitch from "../UI/ToggleSwitch";
import ToggleAny from "../UI/ToggleAny";

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

  const [useLocationOr, setUseLocationOr] = useState(true);

  const changeData = (e, name) => {
    if (name === "dbh") {
      setTempTreeForm((prev) => ({ ...prev, dbh: Number(e.nativeEvent.text) }));
      console.log({ ...tempTreeForm, dbh: Number(e.nativeEvent.text) });
    } else {
      setTempTreeForm((prev) => ({ ...prev, [name]: e.nativeEvent.text }));
      console.log({ ...tempTreeForm, [name]: e.nativeEvent.text });
    }
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

  const handleNextScreen = () => {
    if (useLocationOr) {
      handleNewTree();
    } else {
      handlePickPoint();
    }
  };

  return (
    <>
      <View className="flex justify-center items-center text-center mb-4 border-b-2 border-gray-700 w-4/5 pb-2">
        <Text className="font-bold text-white text-xl">
          Add Tree to Site: {sliderTitle}
        </Text>
      </View>
      <View className="flex w-full justify-between">
        <ToggleAny
          start={useLocationOr}
          onChange={setUseLocationOr}
          label="Use My Location"
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

          <Text className="text-white text-lg font-bold border-b-2 border-gray-500">
            DBH:{" "}
          </Text>
          <TextInput
            className="text-white border-gray-500"
            onChange={(e) => {
              changeData(e, "dbh");
            }}
            value={tempTreeForm.dbh.toString()}
          ></TextInput>
        </View>
      </View>

      <View className="flex flex-row justify-between w-full">
        <ButtonsLeft handlePress={handleGoBack} icon="undo" text="Go Back" />
        <ButtonsRight
          handlePress={handleNextScreen}
          icon="arrow-forward"
          text="Next"
        />
      </View>
    </>
  );
};

export default AddTree;
