import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import ScreenContext from "../../../context/screenContext";
import AWSHelper from "../../../s3";

const PhotosPanel = () => {
  const { workingTree } = useContext(ScreenContext);
  ``;
  const [photos, setPhotos] = useState(workingTree.properties.photos);
  const [images, setImages] = useState(AWSHelper.images);

  useEffect(() => {
    AWSHelper.getImage(workingTree.properties.photos[0]);
    console.log(AWSHelper.images);
  }, []);

  return (
    <View className="flex bg-slate-400 shadow-lg px-5 py-4 mt-2 rounded-xl">
      <View className="flex w-full">
        <Text className="text-white font-bold text-lg px-5 py-2">Photos</Text>
        <View className="bg-gray-500 h-1 rounded-full"></View>
      </View>
      <View className="m-2 flex flex-row items-center justify-evenly">
        <TouchableHighlight
          className="rounded-lg"
          activeOpacity={0.8}
          underlayColor={"transparent"}
        >
          <Image source={images[0]} className="w-32 h-32 rounded-xl" />
        </TouchableHighlight>
        {/* <TouchableHighlight
          className="rounded-lg ml-2"
          onPress={() => console.log("image2")}
          activeOpacity={0.8}
          underlayColor={"transparent"}
        >
          <View className="flex flex-row">
            <View>
              <Image
                source={
                  photos.length >= 2
                    ? { uri: photos[1] }
                    : require("../../../assets/image-not-found.png")
                }
                className="w-16 h-16 rounded-tl-xl"
              />
              <Image
                source={
                  photos.length >= 3
                    ? { uri: photos[2] }
                    : require("../../../assets/image-not-found.png")
                }
                className="w-16 h-16 rounded-bl-xl"
              />
            </View>
            <View>
              <Image
                source={
                  photos.length >= 4
                    ? { uri: photos[3] }
                    : require("../../../assets/image-not-found.png")
                }
                className="w-16 h-16 rounded-tr-xl"
              />

              <Image
                source={
                  photos.length === 5
                    ? { uri: photos[4] }
                    : require("../../../assets/image-not-found.png")
                }
                className="w-16 h-16 rounded-br-xl"
              />
            </View>
          </View>
        </TouchableHighlight> */}
      </View>
    </View>
  );
};

export default PhotosPanel;
