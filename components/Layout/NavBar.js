import React, { useContext, useEffect, useState } from "react";
import { TouchableHighlight, View } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";
import ScreenContext from "../../context/screenContext";

const NavBar = () => {
  const { setCurrentScreen, setShowCustomMark, setShowCustomTree, sliderRef } =
    useContext(ScreenContext);

  const [notifictaions, setNotifications] = useState(0);

  return (
    <View className="flex flex-row items-center justify-evenly w-full h-24 rounded-tr-2xl rounded-tl-2xl absolute bottom-[-3px] bg-[#464a52] ">
      <TouchableHighlight
        className="rounded-lg w-[60px] h-[60px] flex items-center justify-center bg-[#6b7280]"
        activeOpacity={0.5}
        underlayColor="#6b7280"
        onPress={() => {
          setCurrentScreen("siteList");
          setShowCustomMark(false);
          setShowCustomTree(false);
          sliderRef.current.show();
        }}
      >
        <Icons name="home" size={40} color="#56ccdb"></Icons>
      </TouchableHighlight>

      <TouchableHighlight
        className="rounded-lg w-[60px] h-[60px] flex items-center justify-center bg-[#6b7280]"
        activeOpacity={0.5}
        underlayColor="#6b7280"
        onPress={() => {
          setCurrentScreen("AddSite");
          setShowCustomMark(false);
          setShowCustomTree(false);
          sliderRef.current.show((toValue = 265));
        }}
      >
        <Icons name="add-circle" size={40} color="#56ccdb"></Icons>
      </TouchableHighlight>

      <TouchableHighlight
        className="rounded-lg w-[60px] h-[60px] flex items-center justify-center bg-[#6b7280]"
        activeOpacity={0.5}
        underlayColor="#6b7280"
        onPress={() => {
          sliderRef.current.show();
          setCurrentScreen("Settings");
          setShowCustomMark(false);
          setShowCustomTree(false);
        }}
      >
        <Icons name="settings" size={40} color="#56ccdb"></Icons>
      </TouchableHighlight>

      <TouchableHighlight
        className="rounded-lg w-[60px] h-[60px] flex items-center justify-center bg-[#6b7280]"
        activeOpacity={0.5}
        underlayColor="#6b7280"
        onPress={() => {
          sliderRef.current.show();
          setCurrentScreen("Chat");
          setShowCustomMark(false);
          setShowCustomTree(false);
        }}
      >
        {notifictaions ? (
          <Icons name="mark-unread-chat-alt" size={40} color="#56ccdb" />
        ) : (
          <Icons name="chat" size={40} color="#56ccdb" />
        )}
      </TouchableHighlight>
    </View>
  );
};

export default NavBar;
