import { Image } from "react-native";

const PhotoItem = ({ image, small, size }) => {
  if (small) {
    return (
      <Image
        source={
          !image
            ? require("../../../assets/image-not-found.png")
            : { uri: image }
        }
        className="w-16 h-16"
      />
    );
  }
  return (
    <Image
      source={
        !image ? require("../../../assets/image-not-found.png") : { uri: image }
      }
      className={size ? `w-${size} h-${size}` : "w-32 h-32 rounded-lg"}
    />
  );
};

export default PhotoItem;
