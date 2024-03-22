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
import AddSite from "./AddSite";
import AddTree from "./AddTree";
import TreeCustPos from "./TreeCustPos";

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
    showCustomMark,
    customMark,
    showAddSite,
    setSites,
    API_URL,
    location,
    setShowAddTree,
    setShowCustomTree,
    showCustomTree,
    showAddTree,
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
          setShowAddSite(false);
          setShowCustomMark(false);
          setShowAddTree(false);
          setShowCustomTree(false);
          camera.current.zoomTo(16.5);
        }}
      >
        {(dragHandler) => (
          <View className="flex bg-gray-500 h-full rounded-tr-2xl rounded-tl-2xl px-4 items-center">
            <View style={styles.dragHandler} {...dragHandler}>
              <View className="border-t-2  border-gray-700 w-[40%] self-center mt-4"></View>
            </View>

            {showCustomTree && (
              <TreeCustPos
                sliderRef={sliderRef}
                setShowAddSite={setShowAddTree}
                setShowCustomMark={setShowCustomTree}
                addNewSite={addNewTree}
              />
            )}

            {showAddSite && (
              <AddSite
                addNewSite={addNewSite}
                customMark={customMark}
                showCustomMark={showCustomMark}
                setSites={setSites}
                setShowCustomMark={setShowCustomMark}
                API_URL={API_URL}
                setShowAddSite={setShowAddSite}
                location={location}
                sliderRef={sliderRef}
              />
            )}

            {showAddTree && (
              <AddTree
                addNewTree={addNewTree}
                setShowAddTree={setShowAddTree}
                setShowCustomTree={setShowCustomTree}
                sliderRef={sliderRef}
              />
            )}

            {selectedSite && (
              <SelectedSite
                sliderRef={sliderRef}
                sliderTitle={sliderTitle}
                addNewTree={addNewTree}
                camera={camera}
                selectedTrees={selectedTrees}
                setShowAddTree={setShowAddTree}
                setShowCustomMark={setShowCustomMark}
                setSelectedSite={setSelectedSite}
                setShowCustomTree={setShowCustomTree}
                showCustomTree={showCustomTree}
              />
            )}

            

            {showCustomMark && (
              <SiteCustPos
                sliderRef={sliderRef}
                setShowAddSite={setShowAddSite}
                setShowCustomMark={setShowCustomMark}
                addNewSite={addNewSite}
              />
            )}

           
          </View>
        )}
      </SlidingUpPanel>
    </View>
  );
};

export default Slider;
