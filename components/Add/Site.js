import React, { useContext } from "react";
import { Text, View } from "react-native";
import ScreenContext from "../../context/screenContext";
import ButtonsLeft from "../UI/ButtonsLeft";

const AddSite = (props) => {
  const { setCurrentScreen, setShowCustomMark, sliderRef } =
    useContext(ScreenContext);

  const { addNewSite } = props;

  const handleLocation = () => {
    addNewSite();
    setCurrentScreen("selectedSite");
    sliderRef.current.hide();
  };

  const handlePickPoint = () => {
    setShowCustomMark(true);
    setCurrentScreen("SiteCustPos");
    sliderRef.current.show((toValue = 265));
  };

  const handleGoBack = () => {
    setCurrentScreen("siteList");
    sliderRef.current.show({ toValue: 265 });
  };

  return (
    <>
      <View className="flex justify-center items-center text-center mb-4 border-b-2 border-gray-700 w-4/5 pb-2">
        <Text className="font-bold text-white text-xl">Add Site</Text>
      </View>
      <View className="flex flex-row w-full justify-between">
        <ButtonsLeft
          handlePress={handleLocation}
          icon="my-location"
          text="My Location"
          size={28}
        />
        <ButtonsLeft
          handlePress={handlePickPoint}
          icon="pin-drop"
          text="Pick Point"
          size={28}
        />
      </View>
      <View className="mt-4">
        <ButtonsLeft handlePress={handleGoBack} icon="undo" text="Go Back" />
      </View>
    </>
  );
};

export default AddSite;
