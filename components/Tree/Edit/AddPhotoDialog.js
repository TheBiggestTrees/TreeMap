import React, { useContext } from "react";
import { Text, View } from "react-native";
import ScreenContext from "../../../context/screenContext";
import ButtonsLeft from "../../UI/ButtonsLeft";
import CameraBox from "../../UI/Camera";

// const AddPhotoDialog = () => {
//   const { setCurrentScreen } = useContext(ScreenContext);

//   const handleGoBack = () => {
//     setCurrentScreen("ViewTree");
//   };

//   return (
//     <>
//       <View className="bg-[#4e545f56] flex rounded-2xl mt-2 pb-4">
//         <Text className="text-white text-lg font-bold mx-4 py-2 my-2 border-b-2 border-gray-500">
//           Photos
//         </Text>
//       </View>
//       <ButtonsLeft
//         handlePress={handleGoBack}
//         icon={"undo"}
//         text="Go Back"
//         width={"w-40"}
//       />
//     </>
//   );
// };

const AddPhotoDialog = () => {
  return (
    <>
      <CameraBox />
    </>
  );
};

export default AddPhotoDialog;
