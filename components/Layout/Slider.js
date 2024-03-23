import React from "react";
import {
  Button,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import SelectedSite from "../SelectedSite";
import SiteCustPos from "../SiteCustPos";
import AddSite from "../AddSite";
import AddTree from "../AddTree";
import TreeCustPos from "../TreeCustPos";
import SiteList from "../SiteList";

const Slider = (props) => {
  const {
    sliderRef,
    sliderTitle,
    setTempTreeForm,
    setSelectedSite,
    showSelectedSite,
    setShowSelectedSite,
    selectedSite,
    camera,
    addNewTree,
    selectedTrees,
    setSelectedTrees,
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
    sites,
    trees
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
      >
        {(dragHandler) => (
          <View className="flex bg-gray-500 h-full rounded-tr-2xl rounded-tl-2xl px-4 items-center">
            <View style={styles.dragHandler} {...dragHandler}>
              <View className="border-t-2  border-gray-700 w-[40%] self-center mt-4"></View>
            </View>

            <SiteList sites={sites} trees={trees}/>

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
                setShowSelectedSite={setShowSelectedSite}
                sliderTitle={sliderTitle}
                setTempTreeForm={setTempTreeForm}
              />
            )}

            {showSelectedSite && (
              <SelectedSite
                sliderRef={sliderRef}
                sliderTitle={sliderTitle}
                addNewTree={addNewTree}
                camera={camera}
                selectedTrees={selectedTrees}
                setSelectedTrees={setSelectedTrees}
                setShowAddTree={setShowAddTree}
                setShowCustomMark={setShowCustomMark}
                setShowSelectedSite={setShowSelectedSite}
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
