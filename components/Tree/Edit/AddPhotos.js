import React, { useContext } from "react";
import { Text, View } from "react-native";
import ButtonsRight from "../../UI/ButtonsRight";
import ScreenContext from "../../../context/screenContext";

const AddPhotos = (props) => {
  const { photos } = props;
  const { setCurrentScreen } = useContext(ScreenContext);

  const handleAddPhotoSwitch = () => {
    setCurrentScreen("AddPhotoDialog");
  };

  return (
    <>
      <View className="bg-[#4e545f56] flex rounded-2xl mt-2 pb-4 mb-2">
        <Text className="text-white text-lg font-bold mx-4 py-2 my-2 border-b-2 border-gray-500">
          Photos
        </Text>
        <View className="flex items-center justify-center">
          {photos.length === 0 ||
            (photos[0] === "N/A" && (
              <View className="flex flex-row justify-between mx-4 my-2 items-center">
                <Text className="text-white text-lg">No photos</Text>
              </View>
            ))}

          <ButtonsRight
            text="Add Photos"
            icon="add-a-photo"
            size={30}
            handlePress={() => handleAddPhotoSwitch()}
            width="w-40"
          />
        </View>
      </View>
    </>
  );
};

export default AddPhotos;
