import React, { useContext, useState } from "react";
import {
  Button,
  ScrollView,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import SelectedSite from "../Site/Selected";
import SiteCustPos from "../Site/CustPos";
import AddSite from "../Add/Site";
import AddTree from "../Add/Tree";
import TreeCustPos from "../Tree/CustPos";
import SiteList from "../Site/List";
import ScreenContext from "../../context/screenContext";

const Slider = (props) => {

  const { addNewSite, addNewTree } = props;
  const { sliderRef, currentScreen } = useContext(ScreenContext);

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

            {currentScreen === "siteList" && (<SiteList />)}
            {currentScreen === "SelectedSite" && (<SelectedSite />)}
            {currentScreen === "AddSite" && (<AddSite addNewSite={addNewSite} />)}
            {currentScreen === "SiteCustPos" && (<SiteCustPos addNewSite={addNewSite} />)}
            {currentScreen === "TreeCustPos" && (<TreeCustPos addNewTree={addNewTree} />)}
            {currentScreen === "AddTree" && (<AddTree addNewTree={addNewTree} />)}

          </View>
        )}
      </SlidingUpPanel>
    </View>
  );
};

export default Slider;
