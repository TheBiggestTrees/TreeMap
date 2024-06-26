import React, { useState, useEffect, useRef, useContext } from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import ButtonsRight from "./ButtonsRight";
import AWSHelper from "../../s3";
import axios from "axios";
import ScreenContext from "../../context/screenContext";
import { useAuth } from "../../context/AuthContext";
import * as RootNavigation from "../../RootNavigation";

const CameraBox = () => {
  const cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.auto);
  const [flashColor, setFlashColor] = useState("#56ccdb");
  const [flashIcon, setFlashIcon] = useState("flash-auto");
  const [image, setImage] = useState(null);

  const {
    setErrMsg,
    workingTree,
    setSelectedTrees,
    setTrees,
    setWorkingTree,
    trees,
    selectedTrees,
  } = useContext(ScreenContext);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-500">
        <Text className="text-white font-bold text-lg">
          Requesting Permissions...
        </Text>
      </View>
    );
  } else if (!hasCameraPermission) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-500">
        <Text className="text-white font-bold text-lg">
          No camera access...
        </Text>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true, path: "/EasyTree/" };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        setImage(source);
      }
    }
  };

  const savePicture = async (photo) => {
    AWSHelper.saveToPhone(photo);

    //update the tree with the image key in the workingTree.properties.photos array
    //use the axios.put method to update the tree
    //use the process.env.REACT_APP_API_URL to get the API URL
    //use the workingTree._id to get the tree id
    const shortPhoto = photo.split("/").pop();

    const workingIndex = trees.features.findIndex(
      (treef) => treef._id === workingTree._id
    );
    const index = selectedTrees.findIndex(
      (treef) => treef._id === workingTree._id
    );

    await axios
      .put(`${process.env.REACT_APP_API_URL}/tree/edit/${workingTree._id}`, {
        properties: {
          ...workingTree.properties,
          photos: [...workingTree.properties.photos, shortPhoto],
        },
      })
      .then((res) => {
        console.log(workingTree._id);
        setSelectedTrees((prev) => {
          prev[index] = res.data.data;
          return prev;
        });
        setTrees((prev) => {
          prev.features[workingIndex] = res.data.data;
          return prev;
        });
        setWorkingTree(res.data.data);
        RootNavigation.navigate("ViewTree");
        setErrMsg("Uploaded image");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setTypeHandler = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  const setFlashState = () => {
    //set the flash state between on, off, and auto, where on is Torch, off is off, and auto is auto
    //then set the color of the icon to yellow if the flash is on, and light grey if the flash is off
    //if the flash is set to auto, the icon will be blue
    //then change the flash icon to match the state

    if (flash === FlashMode.off) {
      setFlash(FlashMode.torch);
      setFlashColor("#FFD700");
      setFlashIcon("flash-on");
    } else if (flash === FlashMode.torch) {
      setFlash(FlashMode.auto);
      setFlashColor("#56ccdb");
      setFlashIcon("flash-auto");
    } else {
      setFlash(FlashMode.off);
      setFlashColor("#b3b3b3");
      setFlashIcon("flash-off");
    }
  };

  return (
    <>
      {image ? (
        <>
          <Image source={{ uri: image }} style={{ flex: 1 }} />
          <View className="flex absolute bottom-8 flex-row mb-8 px-4 w-full justify-between">
            <ButtonsRight
              icon={"undo"}
              width="w-20 justify-center rounded-full"
              handlePress={() => {
                setImage(null);
              }}
            />
            <ButtonsRight
              icon={"save"}
              width="w-20 justify-center rounded-full "
              handlePress={() => {
                savePicture(image);
              }}
            />
          </View>
        </>
      ) : (
        <Camera
          type={type}
          flashMode={flash}
          ratio="16:9"
          style={{
            flex: 1,
            width: "auto",
            height: "100%",
          }}
          ref={cameraRef}
        >
          <View className="flex justify-between grow mb-16 items-center mt-8 mx-4">
            <View style={{}} className="flex flex-row w-full justify-between">
              <ButtonsRight
                icon={flashIcon}
                iconColor={flashColor}
                width="w-20 justify-center rounded-full"
                handlePress={() => {
                  setFlashState();
                }}
              />
              <ButtonsRight
                icon={"flip-camera-ios"}
                width="w-20 justify-center rounded-full"
                handlePress={() => {
                  setTypeHandler();
                }}
              />
            </View>
            <ButtonsRight
              icon={"photo-camera"}
              width="w-20 justify-center rounded-full"
              handlePress={() => {
                takePicture();
              }}
            />
          </View>
        </Camera>
      )}
    </>
  );
};

export default CameraBox;
