import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import PhotoItem from "./Edit/PhotoItem";
import * as RootNavigation from "../../RootNavigation";
import screenContext from "../../context/screenContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const PhotoViewer = () => {
  // const images = [
  //   "https://steamuserimages-a.akamaihd.net/ugc/924802058717094712/ACC7BE614DDB7472BB466F8E53FF75368C3C6E7F/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
  //   "https://picsum.photos/100",
  //   "https://picsum.photos/200",
  //   "https://picsum.photos/300",
  //   "https://picsum.photos/400",
  //   "https://picsum.photos/500",
  //   "https://picsum.photos/600",
  //   "https://picsum.photos/700",
  //   "https://picsum.photos/800",
  //   "https://picsum.photos/900",
  //   "https://picsum.photos/1000",
  //   "https://picsum.photos/1100",
  //   "https://picsum.photos/1200",
  //   "https://picsum.photos/1300",
  //   "https://picsum.photos/1400",
  //   "https://picsum.photos/1500",
  //   "https://picsum.photos/1600",
  //   "https://picsum.photos/1700",
  //   "https://picsum.photos/1800",
  //   "https://picsum.photos/1900",
  //   "https://picsum.photos/2000",
  // ];

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

  const navigation = useNavigation();

  const handleImagePress = (index) => {
    const imagesSend = images.map((image) => ({ uri: image }));

    navigation.navigate("ImageViewer", {
      images: imagesSend,
      index,
    });
  };

  return (
    <View className="flex bg-slate-400 shadow-lg px-5 py-4 mt-2 rounded-xl grow">
      <View className="flex items-center w-full">
        <Text className="text-white font-bold text-lg">Photos</Text>
        <View className="bg-gray-500 h-1 rounded-full w-full mt-2 mb-4"></View>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginBottom: 86,
          }}
        >
          {images.map((image, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  handleImagePress(index);
                }}
                activeOpacity={0.2}
                underlayColor={"#000000"}
                key={index}
              >
                <PhotoItem image={image} size={24} />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default PhotoViewer;
