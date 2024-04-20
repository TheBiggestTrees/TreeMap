import React from "react";
import { Text, View } from "react-native";

const AddPhotos = () => {
  return (
    <>
      <View className="bg-[#4e545f56] flex rounded-2xl mt-2 pb-4">
        <Text className="text-white text-lg font-bold mx-4 py-2 my-2 border-b-2 border-gray-500">
          Photos
        </Text>
      </View>
    </>
  );
};

export default AddPhotos;
