import React from 'react'
import { ScrollView, Text, TouchableHighlight, View } from 'react-native';
import Icons from "@expo/vector-icons/MaterialIcons";

const SelectedSite = (props) => {
    const { sliderRef, sliderTitle, selectedTrees, setShowAddTree, setSelectedSite, setShowCustomTree } = props;

  return (
    <><View className="flex flex-row w-full justify-between items-center">
                <Text className="text-white font-bold text-lg">Site {sliderTitle}</Text>
                {selectedTrees ? <Text className="text-white font-bold text-lg">Trees: {selectedTrees.length}</Text> : <Text className="text-white font-bold text-lg">Trees: 0</Text>}
                
                <View className="flex flex-row gap-4 items-center">
                 
                 <TouchableHighlight
                    className="flex flex-row items-center justify-center text-center bg-[#4e545f56]  rounded-lg"
                    onPress={() => {
                      setShowAddTree(true);
                      setShowCustomTree(false);
                      sliderRef.current.show(toValue= 265);
                    }}
                    underlayColor={"transparent"}
                  >
                    
                    <View className="flex flex-row justify-center items-center rounded-lg">
                      <Text className="text-white ml-3">Add Tree</Text>
                      <Icons name="add" size={40} color="#374151"></Icons>
                    </View>

                  </TouchableHighlight>

                  <TouchableHighlight
                    onPress={() => {
                      sliderRef.current?.hide();
                      setShowAddTree(false);
                      setSelectedSite(null);
                      setShowCustomTree(false);
                    }}
                    underlayColor={"transparent"}
                    className="bg-[#4e545f56] rounded-full"
                  >
                    <Icons name="close" size={40} color="#374151"></Icons>
                  </TouchableHighlight>
                </View>

              </View>

            
            <ScrollView className="w-full mb-24 mt-8">
              {selectedTrees &&
                selectedTrees.map((tree, index) => (
                  <View key={index} className="flex m-4">
                    <Text className="text-white">
                      Tree Number: {tree.properties.treeID}
                    </Text>
                    <Text className="text-white">
                      Date Created: {tree.properties.dateCreated}
                    </Text>
                    <Text className="text-white">
                      Species: {tree.properties.treeSpecies}
                    </Text>
                    <Text className="text-white">
                      Date Planted: {tree.properties.datePlanted}
                    </Text>
                    <Text className="text-white">
                      Last Work Date: {tree.properties.lastWorkDate}
                    </Text>
                    <Text className="text-white">
                      Coordinates: [{tree.geometry.coordinates[0].toFixed(5)}, {tree.geometry.coordinates[1].toFixed(5)}]
                    </Text>
                  </View>
                ))}
            </ScrollView></>
  )
}

export default SelectedSite
