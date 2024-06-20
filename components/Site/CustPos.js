import { Text, View } from "react-native";
import ScreenContext from "../../context/screenContext";
import { useContext } from "react";
import ButtonsLeft from "../UI/ButtonsLeft";
import ButtonsRight from "../UI/ButtonsRight";
import * as RootNavigation from "../../RootNavigation";

const SiteCustPos = (props) => {
  const { addNewSite } = props;

  const { setShowCustomMark, sliderRef } = useContext(ScreenContext);

  const handleGoBack = () => {
    RootNavigation.navigate("AddSite");
    setShowCustomMark(false);
    sliderRef.current.show((toValue = 265));
  };

  const handlePlace = () => {
    addNewSite();
    sliderRef.current.hide();
  };

  return (
    <View className="bg-gray-500 items-center grow">
      <View className="flex justify-center items-center text-center mb-4 border-b-2 border-gray-700 w-4/5 pb-2">
        <Text className="font-bold text-white text-xl">Add Site</Text>
      </View>
      <View className="flex flex-row w-full justify-between items-center">
        <ButtonsLeft handlePress={handleGoBack} icon="undo" text="Go Back" />
        <ButtonsRight
          handlePress={handlePlace}
          icon="task-alt"
          text="Place Site"
        />
      </View>
    </View>
  );
};

export default SiteCustPos;
