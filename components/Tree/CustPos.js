import { Text, TouchableHighlight, View } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";
import { useContext } from "react";
import ScreenContext from "../../context/screenContext";
import ButtonsLeft from "../UI/ButtonsLeft";
import ButtonsRight from "../UI/ButtonsRight";

const SiteCustPos = (props) => {
  const { setCurrentScreen, setShowCustomMark, sliderRef } =
    useContext(ScreenContext);

  const { addNewTree } = props;

  const handleGoBack = () => {
    setCurrentScreen("AddTree");
    setShowCustomMark(false);
    sliderRef.current.show((toValue = 265));
  };

  const handlePlace = () => {
    addNewTree();
    sliderRef.current.hide();
  };

  return (
    <>
      <View className="flex justify-center items-center text-center mb-4 border-b-2 border-gray-700 w-4/5 pb-2">
        <Text className="font-bold text-white text-xl">Add Tree</Text>
      </View>
      <View className="flex flex-row w-full justify-between items-center mb-4">
        <ButtonsLeft handlePress={handleGoBack} icon="undo" text="Go Back" />
        <ButtonsRight
          handlePress={handlePlace}
          icon="task-alt"
          text="Add Tree"
        />
      </View>

      <View className="flex flex-row w-full">
        <Text>Hello World</Text>
      </View>
    </>
  );
};

export default SiteCustPos;
