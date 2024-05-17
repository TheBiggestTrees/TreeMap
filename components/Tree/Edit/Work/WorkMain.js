import React, { useContext } from "react";
import WorkMenu from "../../../UI/WorkMenu";
import ButtonsLeft from "../../../UI/ButtonsLeft";
import { View } from "react-native";
import ScreenContext from "../../../../context/screenContext";
import ButtonsRight from "../../../UI/ButtonsRight";

const WorkMain = () => {
  const { setCurrentScreen, setWorkingTree } = useContext(ScreenContext);

  const handleGoBack = () => {
    setCurrentScreen("ViewTree");
  };

  const saveWorkDone = () => {
    //save updated list of work items on the tree to the database
    // setWorkingTree();
    setCurrentScreen("ViewTree");
  };

  return (
    <>
      <View className="flex justify-between mb-14 rounded-lg max-h-[75%]">
        <WorkMenu />
        <View className="flex flex-row items-center mt-4 justify-between w-full self-end">
          <ButtonsLeft
            handlePress={handleGoBack}
            icon={"undo"}
            text="Go Back"
            width={"w-40"}
          />
          <ButtonsRight
            handlePress={saveWorkDone}
            icon={"save"}
            text="Save"
            width={"w-40"}
          />
        </View>
      </View>
    </>
  );
};

export default WorkMain;
