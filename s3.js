import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import RNFetchBlob from "react-native-fetch-blob";
import * as MediaLibrary from "expo-media-library";
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

const AWSHelper = {
  uploadFile: async function (path) {
    //use medialibrary to select the image from the path and then upload it to the s3 bucket

    const asset = await MediaLibrary.getAssetsAsync(path);

    const fileData = await RNFetchBlob.fs.readFile(file.uri, "base64");
    const blob = RNFetchBlob.polyfill.Blob.build(fileData, {
      type: `${file.type};BASE64`,
    });

    const params = {
      Bucket: options.bucket,
      Key: options.keyPrefix + asset.filename,
      Body: blob,
      ContentType: file.type,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });

    // console.log(path);

    // const shortPath = path.split("/").pop().toString();

    // const file = {
    //   uri: path,
    //   name: shortPath,
    //   type: "image/jpeg",
    // };

    // const params = {
    //   Bucket: options.bucket,
    //   Key: options.keyPrefix + shortPath,
    //   Body: path,
    //   ContentType: file.type,
    // };

    // s3.upload(params, (err, data) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(data);
    //   }
    // });
  },
};

export default AWSHelper;
