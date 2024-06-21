import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import PhotoItem from "./Edit/PhotoItem";
import screenContext from "../../context/screenContext";
import axios from "axios";

const PhotoViewer = () => {
  const { workingTree } = useContext(screenContext);
  const [images, setImages] = useState([]);

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

  const fetchImages = async () => {
    for (let i = 0; i < workingTree.properties.photos.length; i++) {
      try {
        const res = await getImages(workingTree.properties.photos[i]);
        if (!images.includes(res)) {
          setImages((prev) => [...prev, res]);
        }
      } catch (err) {
        console.error("Error getting images: ", err);
      }
    }
  };

  useEffect(() => {
    setImages([]);
    fetchImages();
  }, [workingTree]);

  return (
    <View className="flex bg-slate-400 shadow-lg px-5 py-4 mt-2 rounded-xl grow">
      <View className="flex items-center w-full">
        <Text className="text-white font-bold text-lg">Photos</Text>
        <View className="bg-gray-500 h-1 rounded-full w-full mt-2"></View>
      </View>

      {images.map((image, index) => {
        return <PhotoItem key={index} image={image} size={24} />;
      })}
    </View>
  );
};

export default PhotoViewer;
