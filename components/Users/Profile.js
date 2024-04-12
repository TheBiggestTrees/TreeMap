import React from "react";
import { Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import ButtonsLeft from "../UI/ButtonsLeft";

const Profile = () => {
  const { onLogout, user } = useAuth();

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
