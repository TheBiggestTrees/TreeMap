import React from "react";
import { Text, View } from "react-native";
import ButtonsRight from "../../UI/ButtonsRight";
import * as RootNavigation from "../../../RootNavigation";

const AddPhotos = (props) => {
  const { photos } = props;

  const handleAddPhotoSwitch = () => {
    RootNavigation.navigate("AddPhotoDialog");
  };

  return (
    <>
      <View className="bg-[#4e545f56] flex rounded-2xl mt-2 pb-4 mb-2">
        <Text className="text-white text-lg font-bold mx-4 py-2 my-2 border-b-2 border-gray-500">
          Photos
        </Text>
        <View className="flex items-center justify-center">
          <View className="m-4">
            {!photos ? (
              <Text className="text-white font-bold text-lg">No Photos</Text>
            ) : (
              <Text className="text-white font-bold text-lg">
                {photos.length} Photo
                {photos.length === 1 ? "" : "s"} Found
              </Text>
            )}
          </View>

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
