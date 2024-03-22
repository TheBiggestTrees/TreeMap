import React from "react";
import { ActivityIndicator, StatusBar, Text, View } from "react-native";

const Splash = () => {
  return (
    <View className={"flex h-full justify-center items-center"}>
      <StatusBar hidden />
      <Text className={"font-bold text-4xl"}>EasyTree</Text>
      <ActivityIndicator color={"black"} size={"large"} />
    </View>
  );
};

export default Splash;
