import React, { useContext, useEffect, useState } from "react";
import { Text, Touchable, TouchableHighlight, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import ScreenContext from "../../context/screenContext";
import { REACT_APP_API_URL } from "@env";
import ButtonsLeft from "../UI/ButtonsLeft";

const Profile = () => {
  const { onLogout, userID } = useAuth();
  const { user, setUser } = useContext(ScreenContext);
  const API_URL = process.env.REACT_APP_API_URL || REACT_APP_API_URL;

  const fetchUser = async () => {
    const user = userID;
    try {
      const res = await axios.get(`${API_URL}/users/${user}`);

      setUser((prev) => ({
        ...res.data.data,
      }));
    } catch (err) {
      console.log({ err });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {user ? (
        <View className="flex w-full h-full bg-gray-500">
          <View>
            <Text className="text-white font-bold text-lg">Profile</Text>
            <Text className="text-white font-bold text-lg">
              {user.username}
            </Text>
            <Text className="text-white font-bold text-lg">
              {user.firstName} {user.lastName}
            </Text>
            <Text className="text-white font-bold text-lg">{user.email}</Text>
          </View>
          <View className="flex items-center p-4">
            <ButtonsLeft
              width="w-40"
              text="Log Out"
              handlePress={() => {
                onLogout();
              }}
              underlayColor="#c23235"
            />
          </View>
        </View>
      ) : (
        <Text className="text-lg text-white font-bold">Loading...</Text>
      )}
    </>
  );
};

export default Profile;
