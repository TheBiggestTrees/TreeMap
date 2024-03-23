import { useState } from 'react'
import { ScrollView, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Icons from "@expo/vector-icons/MaterialIcons";

const SiteList = (props) => {
    const { sites, trees } = props;

    const [search, setSearch] = useState('');
    const [showList, setShowList] = useState(false);

    const handleChange = () => {
        setShowList(!showList);
    }

  return (
    <>
        <View className="flex flex-row w-full justify-between items-center">
            <View className="flex flex-row items-center bg-slate-400 shadow-lg w-full p-4 rounded-full">
                <Text className="text-white font-bold text-lg">Site</Text>
                <View className="bg-[#4e545f56] w-1 rounded-full h-8 mx-2"></View>
                <View className="flex flex-row items-center">
                    <TextInput className="text-white font-bold h-10 text-lg grow" onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    value={search}
                    placeholderTextColor={"#ffffff"}
                    placeholder='Search Site'
                    />
                    <TouchableOpacity onPress={() => {handleChange()}} className="flex flex-row items-center justify-center grow text-center rounded-lg">
                        <Icons name="expand-more" size={40} color="#4e545f56"></Icons>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>

        {showList && (
                        <>
                            <View className="absolute top-28 px-2 drop-shadow-2xl w-2/3">
                                <ScrollView className="w-full h-fit max-h-[400px] px-2 bg-slate-400 rounded-b-xl ">
                                    {sites.features.map((site, index) => (
                                    <View key={index} className="flex flex-row w-full border-t-2 border-gray-600 justify-between items-center">
                                        <Text className="font-bold pl-1 py-2 text-lg text-white">{site.properties.siteID}</Text>
                                    </View>
                                    )
                                    )}
                                </ScrollView>
                            </View>
                        </>
                    )}
    </>
  )
}

export default SiteList
