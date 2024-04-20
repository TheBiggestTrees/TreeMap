import React, { useContext } from "react";
import NeedsWorkItem from "../../../UI/NeedsWorkItem";
import ButtonsLeft from "../../../UI/ButtonsLeft";
import { View } from "react-native";
import ScreenContext from "../../../../context/screenContext";

const WorkMain = () => {
  const { setCurrentScreen } = useContext(ScreenContext);

  const handleGoBack = () => {
    setCurrentScreen("ViewTree");
  };

  return (
    <>
      <View className="flex items-center w-full mt-4 rounded-lg grow p-4">
        <ButtonsLeft
          handlePress={handleGoBack}
          icon={"undo"}
          text="Go Back"
          width={"w-40"}
        />
      </View>
    </>
  );
};

export default WorkMain;
