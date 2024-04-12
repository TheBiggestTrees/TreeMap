import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated, Text, View } from "react-native";
import ScreenContext from "../../context/screenContext";

const PopupMsg = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const [shouldRender, setShouldRender] = useState(true);

  const { errMsg, setErrMsg } = useContext(ScreenContext);

  const { type } = props;

  useEffect(() => {
    // On mount, fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    // Start a timer to unmount the component after 5 seconds
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setErrMsg("");

        setShouldRender(false);
      });
    }, 5000);

    // Clear the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, [fadeAnim]);

  if (!shouldRender) {
    return null;
  }
  return (
    <Animated.View
      style={{
        opacity: fadeAnim, // Bind opacity to animated value
        position: "absolute",
        top: 8,
        zIndex: 100,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        className={
          type === "error"
            ? "bg-red-500 flex w-56 text-center h-12 rounded-3xl items-center justify-center my-4"
            : "bg-[#518f45f3] flex w-56 text-center h-12 rounded-3xl items-center justify-center my-4"
        }
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          {errMsg}
        </Text>
      </View>
    </Animated.View>
  );
};

export default PopupMsg;
