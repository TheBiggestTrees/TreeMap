import React, { Component } from "react";
import { StatusBar, Text, TextInput, View } from "react-native";

export class Login extends Component {
  render() {
    return (
      <View className="flex w-full h-full bg-gray-500 ">
        <StatusBar backgroundColor={"#6b7280"} />
        <View className="flex items-center h-full justify-center">
          <Text className="text-white font-bold text-lg self-start pl-9">Login</Text>
          <View className="flex w-[80%] mt-3">
              <TextInput className="bg-white my-2 rounded-lg h-10 p-2" placeholder="Email or Username" />
              <TextInput className="bg-white my-2 rounded-lg h-10 p-2" placeholder="Password"  />
          </View>
        </View>
      </View>
    );
  }
}

export default Login;
