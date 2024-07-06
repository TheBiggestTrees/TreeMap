import React, { useContext } from "react";
import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
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
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "../../RootNavigation";
import PhotoViewer from "../Tree/PhotoViewer";
import ImageView from "react-native-image-viewing";
import Icons from "@expo/vector-icons/MaterialIcons";

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
              <View className="w-full grow bg-gray-500">
                <NavigationContainer ref={navigationRef}>
                  <Stack.Navigator
                    screenOptions={{
                      headerShown: false,
                      contentStyle: {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <Stack.Group>
                      <Stack.Screen name="siteList" component={SiteList} />
                      <Stack.Screen
                        name="SelectedSite"
                        component={SelectedSite}
                      />
                      <Stack.Screen name="AddSite">
                        {(props) => (
                          <AddSite {...props} addNewSite={addNewSite} />
                        )}
                      </Stack.Screen>

                      <Stack.Screen name="SiteCustPos">
                        {(props) => (
                          <SiteCustPos
                            {...props}
                            addNewSite={addNewSite}
                          ></SiteCustPos>
                        )}
                      </Stack.Screen>
                      <Stack.Screen name="TreeCustPos">
                        {(props) => (
                          <TreeCustPos
                            {...props}
                            addNewTree={addNewTree}
                          ></TreeCustPos>
                        )}
                      </Stack.Screen>

                      <Stack.Screen name="AddTree">
                        {(props) => (
                          <AddTree {...props} addNewTree={addNewTree} />
                        )}
                      </Stack.Screen>
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
                      <Stack.Screen
                        name="PhotoViewer"
                        component={PhotoViewer}
                      />
                      <Stack.Screen
                        name="ImageViewer"
                        options={({ route }) => ({
                          images: route.params.images,
                          imageIndex: route.params.index,
                        })}
                      >
                        {() => {
                          const navigation = useNavigation();
                          const route = useRoute();

                          return (
                            <ImageView
                              images={route.params.images}
                              imageIndex={route.params.index}
                              visible={true}
                              onRequestClose={() => {
                                navigation.goBack();
                              }}
                              FooterComponent={({ imageIndex }) => (
                                <View className="flex items-center w-full">
                                  <View className="flex flex-row items-center justify-between px-6 w-full">
                                    <TouchableHighlight
                                      className="rounded-full bg-gray-500 p-2"
                                      onPress={() => {
                                        //save image to device
                                      }}
                                      activeOpacity={0.8}
                                      underlayColor={"transparent"}
                                    >
                                      <Icons
                                        name="download"
                                        size={32}
                                        color="#56ccdb"
                                      />
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                      className="rounded-full bg-gray-500 p-2"
                                      onPress={() => {
                                        //share image
                                      }}
                                      activeOpacity={0.8}
                                      underlayColor={"transparent"}
                                    >
                                      <Icons
                                        name="share"
                                        size={32}
                                        color="#56ccdb"
                                      />
                                    </TouchableHighlight>
                                  </View>
                                  <Text className="text-white font-bold text-lg m-4">
                                    {imageIndex + 1} /{" "}
                                    {route.params.images.length}
                                  </Text>
                                </View>
                              )}
                            />
                          );
                        }}
                      </Stack.Screen>
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
