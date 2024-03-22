import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native';

const TreeMaker = () => {
  return (
    <>
        <View className="flex justify-center items-center text-center mb-4 border-b-2 border-gray-700 w-4/5 pb-2"><Text className="font-bold text-white text-xl">Tree Info</Text></View>
        <View className="flex flex-row w-full justify-between items-center mb-4">
          <TouchableHighlight
            className="rounded-lg bg-[#464a52] h-14 flex justify-center"
            activeOpacity={0.5}
            underlayColor="#6b7280"
            onPress={() => {
              setShowAddSite(true);
              setShowCustomMark(false);
              sliderRef.current.show(toValue= 265);
            }}
          >
            <View className="flex flex-row justify-evenly w-40 items-center">
              <Icons name="undo" size={40} color="#56ccdb"></Icons>
              <Text className="text-white font-bold text-lg">Go Back</Text>
            </View>
          </TouchableHighlight>

         </View>
    </>
  )
}

export default TreeMaker
