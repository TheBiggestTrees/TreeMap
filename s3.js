import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import axios from "axios";

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
      console.log(err);
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
      console.log(error);
    }
  },

  uploadFile: async (path) => {
    try {
      const asset = await MediaLibrary.getAssetInfoAsync(path);

      const blob = await FileSystem.readAsStringAsync(asset.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log(asset);

      const params = {
        Bucket: options.bucket,
        Key: options.keyPrefix + asset.filename,
        Body: blob, // The blob of the asset data
        ContentType: asset.mediaType, // Use the mediaType property of the asset
      };

      s3.upload(params, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  getImage: async (key) => {
    //get the image from the s3 bucket
    //use the s3.getObject method to get the image from the bucket
    //use the key to get the image from the bucket where key is the name of the image e.g. image.jpg
    //the key does not include the bucket name or the keyPrefix
    console.log("Key: " + key);

    let image;

    const params = {
      Bucket: options.bucket,
      Key: options.keyPrefix + key,
    };

    s3.getObject(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("ContentType:", data.ContentType);
        console.log("ContentLength:", data.ContentLength);
        //convert response to an image that we can display
        image = `data:image/jpeg;base64,${data.Body.toString("base64")}`;
      }
    });
  },
};

export default AWSHelper;
