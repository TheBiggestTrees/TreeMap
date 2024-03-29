import React, { useState } from "react";
import { StatusBar, Text, TextInput, Touchable, TouchableHighlight, View } from "react-native";
import { useAuth } from "../../context/AuthContext";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const { onLogin } = useAuth(); 

    return (
      <View className="flex w-full h-full bg-gray-500 ">
        <StatusBar backgroundColor={"#6b7280"} />
        <View className="flex items-center h-full justify-center">
          <Text className="text-white font-bold text-lg self-start pl-9">Login</Text>
          <View className="flex w-[80%] mt-3">
              <TextInput className="bg-white my-2 rounded-lg h-10 p-2" placeholder="Email or Username" />
              <TextInput className="bg-white my-2 rounded-lg h-10 p-2" placeholder="Password"  />
              <TouchableHighlight className="w-32"
              onPress={() => {
                console.log("Login")
              }}
              activeOpacity={0.3}
            underlayColor="#6b7280"
               >

                <Text>Login</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }


export default Login;
