import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import ScreenContext from "../../../context/screenContext";
import AWSHelper from "../../../s3";

const getImages = async (key) => {
  const AWS = require("aws-sdk");

  const options = {
    keyPrefix: "treeimages/",
    bucket: "easytree",
    region: "us-central-1",
    successActionStatus: 201,
  };

  const credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  };

  AWS.config.credentials = credentials;
  AWS.config.region = options.region;
  const ep = new AWS.Endpoint("s3.us-central-1.wasabisys.com");

  const s3 = new AWS.S3({ endpoint: ep });
  console.log("Key: " + key);

  return new Promise((resolve, reject) => {
    const params = {
      Bucket: options.bucket,
      Key: options.keyPrefix + key,
    };

    s3.getObject(params, (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        const image = `data:image/png;base64,${data.Body.toString("base64")}`;
        resolve(image);
      }
    });
  });
};

const PhotosPanel = () => {
  const { workingTree } = useContext(ScreenContext);
  const [photos, setPhotos] = useState(workingTree.properties.photos);
  const [images, setImages] = useState([]);

  useEffect(() => {
    //check if there are 5 entries in images array
    //if there are not, get the next image from the photos array
    //if there are, do nothing

    if (images.length < 5) {
      workingTree.properties.photos.map((photo) => {
        getImages(photo)
          .then((res) => {
            if (!images) {
              setImages([res]);
            } else if (images.length < 5) {
              if (!images.includes(res)) {
                setImages((prev) => [...prev, res]);
              }
            }
          })
          .catch(console.error);
      });
    }

    // if (images.length <= 5) {
    //   workingTree.properties.photos.map((photo) => {
    //     getImages(photo)
    //       .then((res) => {
    //         //if images is not defined, set it to an array with the first image
    //         //if images is defined and has less than 5 images, add the new image to the array
    //         //check if image is already in the array
    //         //if it is, do not add it to the array
    //         //if it is not, add it to the array

    //         if (!images) {
    //           setImages([res]);
    //         } else if (images.length < 5) {
    //           if (!images.includes(res)) {
    //             setImages((prev) => [...prev, res]);
    //           }
    //         }

    //         // if (!images) {
    //         //   setImages([res]);
    //         // } else if (images.length < 5) {
    //         //   setImages((prev) => [...prev, res]);
    //         // }
    //       })
    //       .catch(console.error);
    //   });
    // }
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
          onPress={() => console.log("image1")}
        >
          <Image
            source={
              images.length >= 1
                ? { uri: images[0] }
                : require("../../../assets/image-not-found.png")
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
                  images.length >= 2
                    ? { uri: images[1] }
                    : require("../../../assets/image-not-found.png")
                }
                className="w-16 h-16 rounded-tl-xl"
              />
              <Image
                source={
                  images.length >= 3
                    ? { uri: images[2] }
                    : require("../../../assets/image-not-found.png")
                }
                className="w-16 h-16 rounded-bl-xl"
              />
            </View>
            <View>
              <Image
                source={
                  images.length >= 4
                    ? { uri: images[3] }
                    : require("../../../assets/image-not-found.png")
                }
                className="w-16 h-16 rounded-tr-xl"
              />

              <Image
                source={
                  images.length >= 5
                    ? { uri: images[4] }
                    : require("../../../assets/image-not-found.png")
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
