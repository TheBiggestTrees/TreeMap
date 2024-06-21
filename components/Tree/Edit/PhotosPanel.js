import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import PhotoItem from "./PhotoItem";
import ScreenContext from "../../../context/screenContext";
import * as RootNavigation from "../../../RootNavigation";
import axios from "axios";

const getImages = async (key) => {
  //use api url to get the image from the api using key as the id param
  //use axios.get method to get the image from the api
  //use the key as the id param
  //return the image
  const url = `${process.env.REACT_APP_API_URL}/images/${key}`;
  const response = await axios.get(url);
  console.log("Fetched image");
  return response.data;
};

const PhotosPanel = () => {
  const { workingTree } = useContext(ScreenContext);
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    for (let i = 0; i < workingTree.properties.photos.length; i++) {
      try {
        const res = await getImages(workingTree.properties.photos[i]);
        if (!images.includes(res)) {
          setImages((prev) => [...prev, res]);
        }
      } catch (err) {
        console.error("Error getting images: ", err.body.message);
      }
    }
  };

  const handlePress = () => {
    RootNavigation.navigate("PhotoViewer");
  };

  useEffect(() => {
    setImages([]);
    fetchImages();
  }, [workingTree]);

  return (
    <View className="flex bg-slate-400 shadow-lg px-5 py-4 mt-2 rounded-xl">
      <View className="flex w-full">
        <Text className="text-white font-bold text-lg px-5 py-2">Photos</Text>
        <View className="bg-gray-500 h-1 rounded-full"></View>
      </View>
      <View className="m-2 flex flex-row items-center justify-evenly">
        <TouchableHighlight
          className="rounded-lg"
          onPress={() => handlePress()}
          activeOpacity={0.8}
          underlayColor={"transparent"}
        >
          <PhotoItem image={images[0]} />
        </TouchableHighlight>
        <TouchableHighlight
          className="rounded-lg ml-2"
          onPress={() => handlePress()}
          activeOpacity={0.8}
          underlayColor={"transparent"}
        >
          <View className="flex flex-col rounded-lg overflow-hidden">
            <View className="flex flex-row">
              <PhotoItem image={images[1]} small={true} />
              <PhotoItem image={images[2]} small={true} />
            </View>
            <View className="flex flex-row">
              <PhotoItem image={images[3]} small={true} />

              <PhotoItem image={images[4]} small={true} />
            </View>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default PhotosPanel;
