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
import AddPhotoDialog from "../Tree/Edit/AddPhotoDialog";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "../../RootNavigation";

const Slider = (props) => {
  const { addNewSite, addNewTree } = props;
  const { sliderRef, height, errMsg } = useContext(ScreenContext);

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

  const Stack = createNativeStackNavigator();

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
          <>
            <View className="flex bg-gray-500 h-[90%] rounded-tr-2xl rounded-tl-2xl px-4 items-center">
              {errMsg && <PopupMsg />}
              <View style={styles.dragHandler} {...dragHandler}>
                <View className="border-t-2  border-gray-700 w-[40%] self-center mt-4"></View>
              </View>
              <View className="w-full grow">
                <NavigationContainer ref={navigationRef}>
                  <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Group>
                      <Stack.Screen name="siteList" component={SiteList} />
                      <Stack.Screen
                        name="SelectedSite"
                        component={SelectedSite}
                      />
                      <Stack.Screen
                        name="AddSite"
                        component={AddSite}
                        initialParams={{ addNewSite: addNewSite }}
                      />
                      <Stack.Screen
                        name="SiteCustPos"
                        component={SiteCustPos}
                        initialParams={{ addNewSite: addNewSite }}
                      />
                      <Stack.Screen
                        name="TreeCustPos"
                        component={TreeCustPos}
                        initialParams={{ addNewTree: addNewTree }}
                      />
                      <Stack.Screen
                        name="AddTree"
                        component={AddTree}
                        initialParams={{ addNewTree: addNewTree }}
                      />
                      <Stack.Screen name="Settings" component={Profile} />
                      <Stack.Screen name="ViewTree" component={ViewTree} />
                      <Stack.Screen
                        name="InspectMain"
                        component={InspectMain}
                      />
                      <Stack.Screen name="WorkMain" component={WorkMain} />
                      <Stack.Screen
                        name="AddPhotoDialog"
                        component={AddPhotoDialog}
                      />
                    </Stack.Group>
                  </Stack.Navigator>
                </NavigationContainer>
              </View>
            </View>
          </>
        )}
      </SlidingUpPanel>
    </View>
  );
};

export default Slider;
