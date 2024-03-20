import { Text, TouchableHighlight, View } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";

const SiteCustPos = (props) => {
  const { setShowAddSite, setShowCustomMark, addNewSite } = props;

  return (
    <>
      <View className="flex flex-row w-full justify-between items-center">
        <View className="flex flex-row justify-center items-center bg-[#464a52] rounded-lg">
          <TouchableHighlight
            className="rounded-lg w-[60px] h-[60px] flex items-center justify-center"
            activeOpacity={0.5}
            underlayColor="#6b7280"
            onPress={() => {
              setShowAddSite(true);
              setShowCustomMark(false);
            }}
          >
            <Icons name="undo" size={40} color="#56ccdb"></Icons>
          </TouchableHighlight>
          <Text className="text-white font-bold text-lg mr-4">Go Back</Text>
        </View>
        <TouchableHighlight
          className="rounded-lg flex items-center justify-center"
          activeOpacity={0.5}
          underlayColor="#6b7280"
          onPress={() => {
            addNewSite();
          }}
        >
          <View className="flex flex-row justify-center items-center bg-[#464a52] rounded-lg">
            <Text className="text-white font-bold text-lg ml-4">
              Place Site
            </Text>
            <Icons name="task-alt" size={40} color="#56ccdb"></Icons>
          </View>
        </TouchableHighlight>
      </View>
    </>
  );
};

export default SiteCustPos;
