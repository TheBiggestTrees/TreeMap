import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

const options = {
  keyPrefix: "treeimages/",
  bucket: "easytree",
  region: "us-central-1",
  successActionStatus: 201,
};

let credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};
const client = new S3Client({
  region: options.region,
  credentials: credentials,
});

const AWSHelper = {
  uploadFile: async function (path) {
    console.log(path);
    try {
      const shortPath = path.split("/").pop().toString();

      const file = {
        uri: path,
        name: shortPath,
        type: "image/jpeg",
      };

      await client
        .send(
          new PutObjectCommand({
            Bucket: "easytree",
            Key: "treeimages/" + file.name,
            Body: file,
          })
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log("Help", error);
        });
      return true;
    } catch (error) {
      console.log(error);
    }
  },
};

export default AWSHelper;
