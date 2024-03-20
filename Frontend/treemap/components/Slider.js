import React from "react";
import {
  Button,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import SelectedSite from "./SelectedSite";
import SiteCustPos from "./SiteCustPos";

const Slider = (props) => {
  const {
    sliderRef,
    sliderTitle,
    setSelectedSite,
    selectedSite,
    camera,
    addNewTree,
    selectedTrees,
    setShowAddSite,
    setShowCustomMark,
    addNewSite,
    showCustomMark
  } = props;

  const styles = {
    container: {
      flex: 1,
      backgroundColor: "black",
      alignItems: "center",
      justifyContent: "center",
    },
    dragHandler: {
      alignSelf: "stretch",
      height: 50,
      alignItems: "center",

      backgroundColor: "#6B7280",
      display: "flex",
    },
  };

  return (
    <View style={styles.page}>
      <SlidingUpPanel
        ref={sliderRef}
        draggableRange={{ top: 800, bottom: 120 }}
        onBottomReached={() => {
          setSelectedSite((prev) => {
            prev = null;
          });
          camera.current.zoomTo(12);
        }}
      >
        {(dragHandler) => (
          <View className="flex bg-gray-500 h-full rounded-tr-2xl rounded-tl-2xl px-4 items-center">
            <View style={styles.dragHandler} {...dragHandler}>
              <View className="border-t-2  border-gray-700 w-[40%] self-center mt-4"></View>
            </View>

            {selectedSite && (
              <SelectedSite
                sliderRef={sliderRef}
                sliderTitle={sliderTitle}
                addNewTree={addNewTree}
                camera={camera}
                selectedTrees={selectedTrees}
              />
            )}

          {showCustomMark && <SiteCustPos
            setShowAddSite={setShowAddSite}
            setShowCustomMark={setShowCustomMark}
            addNewSite={addNewSite}
            
          />}
          </View>
        )}
      </SlidingUpPanel>
    </View>
  );
};

export default Slider;
