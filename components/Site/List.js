import { useContext, useState } from 'react'
import { ScrollView, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Icons from "@expo/vector-icons/MaterialIcons";
import ScreenContext from '../../context/screenContext';

const SiteList = () => {

    const { sites, showList, setShowList } = useContext(ScreenContext);

    const [search, setSearch] = useState('');
    const [siteList, setSiteList] = useState(null);

    const handleChange = (e) => {
        setShowList(true);
        setSearch(e.nativeEvent.text);
        const list = sites.features.find(site => +site.properties.siteID == e.nativeEvent.text);
        if (list === undefined) { 
            setSiteList([{properties: {siteID: "No Site Found"}}])
            return;
        }
        setSiteList([list]);
        console.log(list);
    }


    const handleDrop = () => {
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
                        handleChange(e);
                    }}
                    value={search}
                    placeholderTextColor={"#ffffff"}
                    placeholder='Search Site'
                    />
                    <TouchableOpacity onPress={() => {handleDrop()}} className="flex flex-row items-center justify-center grow text-center rounded-lg">
                        <Icons name="expand-more" size={40} color="#4e545f56"></Icons>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>

        {showList && (
                        <>
                            <View className="absolute top-28 px-2 drop-shadow-2xl w-2/3">
                                <ScrollView className="w-full h-fit max-h-[400px] px-2 bg-slate-400 rounded-b-xl ">
                                    {search !== "" ? siteList.map((site, index) => (
                                    <View key={index} className="flex flex-row w-full border-t-2 border-gray-600 justify-between items-center">
                                        <Text className="font-bold pl-1 py-2 text-lg text-white">{site.properties.siteID}</Text>
                                    </View>
                                    )
                                    ) : sites.features.map((site, index) => (
                                    <View key={index} className="flex flex-row w-full border-t-2 border-gray-600 justify-between items-center">
                                        <Text className="font-bold pl-1 py-2 text-lg text-white">{site.properties.siteID}</Text>
                                    </View>
                                    )
                                    )}
                                </ScrollView>
                            </View>
                        </>
                    )}

        {search !== "" ? (
                        <>
                            <View className="absolute top-28 px-2 drop-shadow-2xl w-2/3">
                                <ScrollView className="w-full h-fit max-h-[400px] px-2 bg-slate-400 rounded-b-xl ">
                                    {}
                                </ScrollView>
                            </View>
                        </>
                    ) : null }
    </>
  )
}

export default SiteList
