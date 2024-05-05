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

  const checkPhotoCount = () => {
    if (!photos) {
      return 0;
    } else if (photos.includes("N/A")) {
      return photos.length - 1;
    } else {
      return photos.length;
    }
  };

  return (
    <>
      <View className="bg-[#4e545f56] flex rounded-2xl mt-2 pb-4 mb-2">
        <Text className="text-white text-lg font-bold mx-4 py-2 my-2 border-b-2 border-gray-500">
          Photos
        </Text>
        <View className="flex items-center justify-center">
          {checkPhotoCount() > 0 ? (
            <View className="flex flex-row justify-between mx-4 my-2 items-center">
              <Text className="text-white text-lg">
                {checkPhotoCount()} photo{checkPhotoCount() > 1 ? "s" : ""}
              </Text>
            </View>
          ) : (
            <View className="flex flex-row justify-between mx-4 my-2 items-center">
              <Text className="text-white text-lg">No photos</Text>
            </View>
          )}

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
