import React, { useState } from "react";
import {
  Button,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import SelectedSite from "../Site/SelectedSite";
import SiteCustPos from "../Site/SiteCustPos";
import AddSite from "../Add/AddSite";
import AddTree from "../Add/AddTree";
import TreeCustPos from "../Tree/TreeCustPos";
import SiteList from "../Site/SiteList";

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

  const [showList, setShowList] = useState(false);
  const [showSiteList, setShowSiteList] = useState(true);

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

            {!showCustomTree && !showAddSite && !showAddTree && !showSelectedSite && !showCustomMark ? <SiteList sites={sites} trees={trees} setShowList={setShowList} showList={showList} setShowSiteList={setShowSiteList} showSiteList={showSiteList} /> : null}

            {showCustomTree && (
              <TreeCustPos
                showList={showList}
                setShowList={setShowList}
                setShowAddSite={setShowAddTree}
                setShowCustomMark={setShowCustomTree}
                addNewSite={addNewTree}
                sliderRef={sliderRef}
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
