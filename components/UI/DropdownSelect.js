import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icons from "@expo/vector-icons/MaterialIcons";

const DropdownSelect = (props) => {
  const { working, setWorking, options, bgcolor, border, borderColor, label } =
    props;

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <Text className="text-white font-bold text-lg pb-2">{label}</Text>
      <View
        className={`flex rounded-xl pl-4 pr-2 ${bgcolor} ${borderColor} ${border}`}
      >
        <TouchableOpacity
          className="flex flex-row items-center justify-between"
          onPress={() => {
            setShowDropdown(!showDropdown);
          }}
        >
          <Text className="text-white text-lg font-bold">{working}</Text>
          <Icons name="expand-more" size={40} color="#4e545f56"></Icons>
        </TouchableOpacity>
      </View>

      {showDropdown && (
        <View
          className="flex flex-col items-center rounded-2xl w-5/6 absolute top-[130]"
          style={{ zIndex: 1 }}
        >
          {options.map((option, index) => {
            //check if option is first in array
            if (index === 0) {
              return (
                <TouchableOpacity
                  key={index}
                  className={`flex w-full rounded-t-2xl flex-row items-center justify-between p-1 px-4 ${borderColor} ${border} ${bgcolor}`}
                  onPress={() => {
                    setWorking((prev) => ({
                      ...prev,
                      properties: {
                        ...prev.properties,
                        status: option,
                      },
                    }));
                    setShowDropdown(false);
                  }}
                >
                  <Text className="text-white text-lg font-bold">{option}</Text>
                </TouchableOpacity>
              );
            } else if (index === options.length - 1) {
              return (
                <TouchableOpacity
                  key={index}
                  className={`flex w-full flex-row items-center justify-between p-1 px-4  rounded-b-2xl ${bgcolor} `}
                  onPress={() => {
                    setWorking((prev) => ({
                      ...prev,
                      properties: {
                        ...prev.properties,
                        status: option,
                      },
                    }));
                    setShowDropdown(false);
                  }}
                >
                  <Text className="text-white text-lg font-bold">{option}</Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  key={index}
                  className={`flex w-full flex-row items-center justify-between p-1 px-4 ${borderColor} ${border} ${bgcolor}`}
                  onPress={() => {
                    setWorking((prev) => ({
                      ...prev,
                      properties: {
                        ...prev.properties,
                        status: option,
                      },
                    }));
                    setShowDropdown(false);
                  }}
                >
                  <Text className="text-white text-lg font-bold">{option}</Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>
      )}
    </>
  );
};

export default DropdownSelect;
