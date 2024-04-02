import React, { useContext, useState } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import ScreenContext from "../../../context/screenContext";

const PhotosPanel = () => {
  const { workingTree } = useContext(ScreenContext);
  const [photos, setPhotos] = useState(workingTree.properties.photos);

  return (
    <View className="flex bg-slate-400 shadow-lg px-10 py-4 mt-2 rounded-xl">
      <View className="flex w-full">
        <Text className="text-white font-bold text-lg p-2">Photos</Text>
        <View className="bg-gray-500 h-1 rounded-full"></View>
      </View>
      <View className="m-2 flex flex-row justify-evenly">
        <TouchableHighlight
          className="rounded-lg"
          onPress={() => console.log("image")}
        >
          <Image
            source={{ uri: "https://reactjs.org/logo-og.png" }}
            style={{ width: 110, height: 110, borderRadius: 12 }}
          />
        </TouchableHighlight>
        <TouchableHighlight
          className="rounded-lg ml-2"
          onPress={() => console.log("image2")}
        >
          <View className="flex flex-row">
            <View>
              <Image
                source={{ uri: "https://reactjs.org/logo-og.png" }}
                style={{ width: 55, height: 55, borderTopLeftRadius: 12 }}
              />
              <Image
                source={{ uri: "https://reactjs.org/logo-og.png" }}
                style={{ width: 55, height: 55, borderBottomLeftRadius: 12 }}
              />
            </View>
            <View>
              <Image
                source={{ uri: "https://reactjs.org/logo-og.png" }}
                style={{ width: 55, height: 55, borderTopRightRadius: 12 }}
              />
              <Image
                source={{ uri: "https://reactjs.org/logo-og.png" }}
                style={{ width: 55, height: 55, borderBottomRightRadius: 12 }}
              />
            </View>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default PhotosPanel;
