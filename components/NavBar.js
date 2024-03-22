import React from 'react'
import { TouchableHighlight, View } from 'react-native';
import Icons from "@expo/vector-icons/MaterialIcons";

const NavBar = (props) => {
    const { setSelectedSite, setShowAddSite, setShowCustomMark, sliderRef, setShowCustomTree, setShowAddTree} = props;

  return (
    <View className="flex flex-row items-center justify-evenly w-full h-24 rounded-tr-2xl rounded-tl-2xl absolute bottom-[-3px] bg-[#464a52] ">
          
            <TouchableHighlight
              className="rounded-lg w-[60px] h-[60px] flex items-center justify-center bg-[#6b7280]"
              activeOpacity={0.5}
              underlayColor="#6b7280"
              onPress={() => {
                setShowAddSite(true);
              }}
            >
              <Icons name="home" size={40} color="#56ccdb"></Icons>
            </TouchableHighlight>
         

          
            <TouchableHighlight
              className="rounded-lg w-[60px] h-[60px] flex items-center justify-center bg-[#6b7280]"
              activeOpacity={0.5}
              underlayColor="#6b7280"
              onPress={() => {
                setShowAddSite(true);
                setShowAddTree(false);
                setSelectedSite(null);
                setShowCustomMark(false);
                setShowCustomTree(false);
                sliderRef.current.show(toValue= 265);
              }}
            >
              <Icons name="add-circle" size={40} color="#56ccdb"></Icons>
            </TouchableHighlight>
          

          
            <TouchableHighlight
              className="rounded-lg w-[60px] h-[60px] flex items-center justify-center bg-[#6b7280]"
              activeOpacity={0.5}
              underlayColor="#6b7280"
              onPress={() => {
                setShowAddSite(true);
              }}
            >
              <Icons name="settings" size={40} color="#56ccdb"></Icons>
            </TouchableHighlight>
          

          
            <TouchableHighlight
              className="rounded-lg w-[60px] h-[60px] flex items-center justify-center bg-[#6b7280]"
              activeOpacity={0.5}
              underlayColor="#6b7280"
              onPress={() => {
                setShowAddSite(true);
              }}
            >
              <Icons name="person" size={40} color="#56ccdb"></Icons>
            </TouchableHighlight>
        
        </View>
  )
}

export default NavBar
