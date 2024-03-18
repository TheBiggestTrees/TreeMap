import { TouchableHighlight } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";

const SiteCustPos = (props) => {
  const { setShowAddSite, setShowCustomMark, addNewSite } = props;

  return (
    <>
      <TouchableHighlight
        className="rounded-lg w-[60px] h-[60px] flex items-center justify-center bg-[#6b7280] absolute bottom-[5%] left-[5%]"
        activeOpacity={0.5}
        underlayColor="#6b7280"
        onPress={() => {
          setShowAddSite(true);
          setShowCustomMark(false);
        }}
      >
        <Icons name="undo" size={40} color="#56ccdb"></Icons>
      </TouchableHighlight>

      <TouchableHighlight
        className="rounded-lg w-[60px] h-[60px] flex items-center justify-center bg-[#6b7280] absolute bottom-[5%] right-[5%]"
        activeOpacity={0.5}
        underlayColor="#6b7280"
        onPress={() => {
          addNewSite();
        }}
      >
        <Icons name="task-alt" size={40} color="#56ccdb"></Icons>
      </TouchableHighlight>
    </>
  );
};

export default SiteCustPos;
