import React from "react";
import { Button, Text, View } from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";

const Slider = (props) => {
  const { sliderRef, sliderTitle, setShowTreeLayer } = props;

  return (
    <>
      <SlidingUpPanel
        ref={sliderRef}
        onBottomReached={() => setShowTreeLayer(false)}
        onBackButtonPress={() => setShowTreeLayer(false)}
        showBackdrop={false}
      >
        <View className="flex bg-gray-500 h-full rounded-xl p-4 items-center ">
          <View className="w-full">
            <View className="border-t-2 m-4 border-gray-700 w-[40%] self-center"></View>
            <View className="flex flex-row justify-between">
              <Text className="text-white">Site {sliderTitle}</Text>
              <View>
                <Button
                  title="Close"
                  onPress={() => sliderRef.current.hide()}
                ></Button>
              </View>
            </View>
          </View>
        </View>
      </SlidingUpPanel>
    </>
  );
};

export default Slider;
