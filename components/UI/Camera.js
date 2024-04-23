import React, { useState, useEffect, useRef } from "react";
import { Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import ButtonsRight from "./ButtonsRight";

const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const CameraBox = () => {
  const cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [type, setType] = useState(CameraType.back);
  const [hasGalleryPermission, setHasGalleryPermission] = useState();

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

  return (
    <Camera
      type={type}
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        marginBottom: 50,
        paddingBottom: 50,
      }}
      ref={cameraRef}
    >
      <ButtonsRight
        icon={"photo-camera"}
        width="w-20 justify-center self-end"
        handlePress={() => {
          takePicture();
        }}
      />
      <ButtonsRight
        icon={"flip-camera-ios"}
        width="w-20 justify-center self-end"
        handlePress={() => {
          setTypeHandler();
        }}
      />
    </Camera>
  );
};

export default CameraBox;
