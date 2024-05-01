import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import ScreenContext from "../../../context/screenContext";
import axios from "axios";

const getImages = async (key) => {
  //use api url to get the image from the api using key as the id param
  //use axios.get method to get the image from the api
  //use the key as the id param
  //return the image
  const url = process.env.REACT_APP_API_URL + "/images/" + key;
  const response = await axios.get(url);
  return response.data;
};

const PhotosPanel = () => {
  const { workingTree } = useContext(ScreenContext);
  const [photos, setPhotos] = useState(workingTree.properties.photos);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      if (images.length < 5) {
        workingTree.properties.photos.map((photo) => {
          if (photo !== "N/A") {
            getImages(photo)
              .then((res) => {
                console.log(res);
                if (!images) {
                  setImages([res]);
                } else if (images.length < 5) {
                  if (!images.includes(res)) {
                    setImages((prev) => [...prev, res]);
                  }
                }
              })
              .catch((err) => {
                console.error(err);
                console.log("Error getting images, ", err.body.message);
              });
          }
        });
      }

      fetchImages();
    };
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
          onPress={() => console.log(images[images.length])}
        >
          <Image
            source={
              images.length < 1
                ? require("../../../assets/image-not-found.png")
                : { uri: images[images.length - 1] }
            }
            className="w-32 h-32 rounded-lg"
          />
        </TouchableHighlight>
        <TouchableHighlight
          className="rounded-lg ml-2"
          onPress={() => console.log("image2")}
          activeOpacity={0.8}
          underlayColor={"transparent"}
        >
          <View className="flex flex-row">
            <View>
              <Image
                source={
                  images.length < 2
                    ? require("../../../assets/image-not-found.png")
                    : { uri: images[images.length - 2] }
                }
                className="w-16 h-16 rounded-tl-xl"
              />
              <Image
                source={
                  images.length < 3
                    ? require("../../../assets/image-not-found.png")
                    : { uri: images[images.length - 3] }
                }
                className="w-16 h-16 rounded-bl-xl"
              />
            </View>
            <View>
              <Image
                source={
                  images.length < 4
                    ? require("../../../assets/image-not-found.png")
                    : { uri: images[images.length - 4] }
                }
                className="w-16 h-16 rounded-tr-xl"
              />

              <Image
                source={
                  images.length < 5
                    ? require("../../../assets/image-not-found.png")
                    : { uri: images[images.length - 5] }
                }
                className="w-16 h-16 rounded-br-xl"
              />
            </View>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default PhotosPanel;
