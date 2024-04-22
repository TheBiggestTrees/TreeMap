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
  const [hasGalleryPermission, setHasGalleryPermission] = useState();
  const [type, setType] = useState(Camera.Constants.Type.back);

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
      const options = { quality: 1, base64: true };
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

    if (album === null) {
      await MediaLibrary.createAlbumAsync("EasyTree", asset, true);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, true);
    }
  };

  return (
    <Camera
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
      ref={cameraRef}
    >
      <View>
        <ButtonsRight
          icon={"photo-camera"}
          width="w-40"
          text="Take Picture"
          handlePress={() => {
            takePicture();
          }}
        />
      </View>
    </Camera>
  );
};

export default CameraBox;
