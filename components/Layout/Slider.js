import React, { useContext } from "react";
import { View } from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import SelectedSite from "../Site/Selected";
import SiteCustPos from "../Site/CustPos";
import AddSite from "../Add/Site";
import AddTree from "../Add/Tree";
import TreeCustPos from "../Tree/CustPos";
import SiteList from "../Site/List";
import ScreenContext from "../../context/screenContext";
import Profile from "../Users/Profile";
import ViewTree from "../Tree/Edit/ViewTree";
import InspectMain from "../Tree/Edit/Inspect/InspectMain";
import WorkMain from "../Tree/Edit/Work/WorkMain";
import PopupMsg from "../UI/PopupMsg";

const Slider = (props) => {
  const { addNewSite, addNewTree } = props;
  const { sliderRef, currentScreen, height, errMsg } =
    useContext(ScreenContext);

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
    <View>
      <SlidingUpPanel
        ref={sliderRef}
        draggableRange={{
          top: height - height / 14,
          bottom: 120,
        }}
      >
        {(dragHandler) => (
          <View className="flex bg-gray-500 h-[90%] rounded-tr-2xl rounded-tl-2xl px-4 items-center">
            {errMsg && <PopupMsg />}
            <View style={styles.dragHandler} {...dragHandler}>
              <View className="border-t-2  border-gray-700 w-[40%] self-center mt-4"></View>
            </View>
            {currentScreen === "siteList" && (
              <>
                <SiteList />
              </>
            )}
            {currentScreen === "SelectedSite" && <SelectedSite />}
            {currentScreen === "AddSite" && <AddSite addNewSite={addNewSite} />}
            {currentScreen === "SiteCustPos" && (
              <SiteCustPos addNewSite={addNewSite} />
            )}
            {currentScreen === "TreeCustPos" && (
              <TreeCustPos addNewTree={addNewTree} />
            )}
            {currentScreen === "AddTree" && <AddTree addNewTree={addNewTree} />}
            {currentScreen === "Profile" && <Profile />}
            {/* View Tree is parent of Inspect and Work */}
            {currentScreen === "ViewTree" && <ViewTree />}

            {/* Inspect Parent */}
            {currentScreen === "InspectMain" && <InspectMain />}

            {/* Work Parent */}
            {currentScreen === "WorkMain" && <WorkMain />}
          </View>
        )}
      </SlidingUpPanel>
    </View>
  );
};

export default Slider;
