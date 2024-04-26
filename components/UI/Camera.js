import React, { useState, useEffect, useRef } from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { Camera, CameraType, FlashMode } from "expo-camera";
import ButtonsRight from "./ButtonsRight";
import AWSHelper from "../../s3";

const CameraBox = () => {
  const cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const [flashColor, setFlashColor] = useState("#b3b3b3");
  const [flashIcon, setFlashIcon] = useState("flash-off");
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting Permissions...</Text>;
  } else if (!hasCameraPermission) {
    return <Text>No access to camera</Text>;
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
    AWSHelper.uploadFile(photo);
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
          <Image
            source={{ uri: image }}
            style={{ flex: 1, width: "100%", height: "100%", marginBottom: 50 }}
          />
          <View className="w-full flex flex-row justify-between px-8 m-8 absolute bottom-8">
            <ButtonsRight
              icon={"undo"}
              width="w-20 justify-center rounded-full"
              handlePress={() => {
                setImage(null);
              }}
            />
            <ButtonsRight
              icon={"save"}
              width="w-20 justify-center rounded-full"
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
          style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            marginBottom: 50,
            padding: 25,
          }}
          ref={cameraRef}
        >
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
        </Camera>
      )}
    </>
  );
};

export default CameraBox;
