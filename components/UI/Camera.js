import React, { useState, useEffect, useRef } from "react";
import { Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { Camera, CameraType, FlashMode } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import ButtonsRight from "./ButtonsRight";

const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const CameraBox = () => {
  const cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [type, setType] = useState(CameraType.back);
  const [hasGalleryPermission, setHasGalleryPermission] = useState();
  const [flash, setFlash] = useState(FlashMode.off);
  const [flashColor, setFlashColor] = useState("#56ccdb");
  const [flashIcon, setFlashIcon] = useState("flash-off");
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const galleryStatus = await MediaLibrary.requestPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
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
        savePicture(source);
      }
    }
  };

  const savePicture = async (photo) => {
    const asset = await MediaLibrary.createAssetAsync(photo);
    const album = await MediaLibrary.getAlbumAsync("EasyTree");

    let success = false;
    if (album === null) {
      success = await MediaLibrary.createAlbumAsync("EasyTree", asset, false);
    } else {
      success = await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }

    if (!success) {
      await FileSystem.deleteAsync(asset.uri);
    }
  };

  const setTypeHandler = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  const setFlashState = () => {
    // setFlash(flash === FlashMode.off ? FlashMode.on : FlashMode.off);
    // setFlashColor(flashColor === "#56ccdb" ? "#FFD700" : "#56ccdb");
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
  );
};

export default CameraBox;
