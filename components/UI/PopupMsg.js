import React from "react";

const PopupMsg = () => {
  return (
    <View className="flex w-full absolute right-1 m-auto top-16 items-center justify-center text-center">
      <View className="bg-red-400 p-4 rounded-3xl">
        <Text className="text-white font-bold text-md">{errMsg}</Text>
      </View>
    </View>
  );
};

export default PopupMsg;
