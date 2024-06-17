import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import axios from "axios";

const AWS = require("aws-sdk");

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const options = {
  keyPrefix: "treeimages/",
  bucket: "treemap",
  region: "us-east-005",
  s3ForcePathStyle: true,
  credentials,
  successActionStatus: 201,
};

AWS.config.credentials = credentials;
AWS.config.region = options.region;
const ep = new AWS.Endpoint("https://s3.us-east-005.backblazeb2.com");

const s3 = new AWS.S3({ endpoint: ep });

const uploadImage = async (imageUri) => {
  const response = await fetch(imageUri);
  const blob = await response.blob();

  const name = imageUri.split("/").pop();

  const params = {
    Bucket: options.bucket,
    Key: options.keyPrefix + name,
    Body: blob,
    ContentType: "image/jpeg",
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.log("s3:43, Error: ", err);
    } else {
      console.log(data);
    }
  });
};

const AWSHelper = {
  saveToPhone: async (uri) => {
    //use the FileSystem.downloadAsync method to save the image to the device
    //use the MediaLibrary.saveToLibraryAsync method to save the image to the device
    //use the uri of the image to save the image to the device

    try {
      const asset = await MediaLibrary.createAssetAsync(uri);
      console.log(asset);
      uploadImage(asset.uri);
    } catch (error) {
      console.log("s3:60, Error: ", error);
    }
  },

  uploadFile: async (path) => {
    try {
      const asset = await MediaLibrary.getAssetInfoAsync(path);
      console.log(asset);

      const blob = await FileSystem.readAsStringAsync(asset.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log("s3:72, blob:" + " ", blob);

      const params = {
        Bucket: options.bucket,
        Key: options.keyPrefix + asset.filename,
        Body: blob, // The blob of the asset data
        ContentType: asset.mediaType, // Use the mediaType property of the asset
      };

      s3.upload(params, (err, data) => {
        if (err) {
          console.log("s3:83, Error: ", err);
        } else {
          console.log(data);
        }
      });
    } catch (error) {
      console.log("s3:89, Error: ", error.data);
    }
  },
};

export default AWSHelper;
