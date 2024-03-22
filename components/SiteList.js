import React from 'react'
import { ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';

const SiteList = () => {
  return (
    <>
        <View className="flex flex-row w-full justify-between items-center">
            <View className="flex flex-row">
                <Text className="text-white font-bold text-lg">Site</Text>
                <TextInput className="text-white font-bold text-lg">0</TextInput>
            </View>
        </View>
    </>
  )
}

export default SiteList
