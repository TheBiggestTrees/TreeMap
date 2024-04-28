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

  return new Promise((resolve, reject) => {
    const params = {
      Bucket: options.bucket,
      Key: options.keyPrefix + key,
    };

    // Get the image from S3 using presigned URL
    s3.getSignedUrl("getObject", params, (err, url) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(url);
      }
    });
  });
};

const PhotosPanel = () => {
  const { workingTree } = useContext(ScreenContext);
  const [photos, setPhotos] = useState(workingTree.properties.photos);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      for (const photo of workingTree.properties.photos) {
        if (images.length >= 5) {
          break;
        }

        try {
          const res = await getImages(photo);
          console.log(res);
          if (!images.includes(res)) {
            setImages((prev) => [...prev, res]);
          } else {
            console.log("Image already exists in the list", images);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchImages();
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
