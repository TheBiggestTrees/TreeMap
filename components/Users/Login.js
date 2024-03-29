import React, { useContext, useEffect, useState } from "react";
import {
  StatusBar,
  Text,
  TextInput,
  Touchable,
  TouchableHighlight,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import ScreenContext from "../../context/screenContext";
import RegisterPage from "./Register";

const Login = () => {
  const [screen, setScreen] = useState("login");

  return (
    <View className="flex w-full h-full bg-gray-500 ">
      <StatusBar backgroundColor={"#6b7280"} />
      {screen === "login" && <LoginPage setScreen={setScreen} />}
      {screen === "register" && <RegisterPage setScreen={setScreen} />}
    </View>
  );
};

const LoginPage = (props) => {
  const { setScreen } = props;
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { onLogin } = useAuth();
  const { setCurrentScreen } = useContext(ScreenContext);

  const login = () => {
    onLogin(email, password);
    setCurrentScreen("siteList");
  };

  return (
    <View className="flex items-center h-full justify-start mt-32">
      <Text className="text-white font-bold text-lg self-start pl-9">
        Login
      </Text>
      <View className="flex w-[80%] mt-3">
        <TextInput
          className="bg-white my-2 rounded-lg h-10 p-2"
          placeholder="Email or Username"
          onChange={(e) => {
            setEmail(e.nativeEvent.text);
          }}
        />
        <TextInput
          className="bg-white my-2 rounded-lg h-10 p-2"
          placeholder="Password"
          secureTextEntry={true}
          onChange={(e) => {
            setPassword(e.nativeEvent.text);
          }}
        />
        <View className="flex flex-row items-center justify-center gap-4 mt-0">
          <TouchableHighlight
            className="w-32 bg-[#4e545f56] rounded-lg self-center h-10 flex items-center justify-center mt-2"
            onPress={() => {
              setScreen("register");
            }}
            activeOpacity={0.3}
            underlayColor="#6b7280"
          >
            <Text className="font-bold text-lg text-white">Register</Text>
          </TouchableHighlight>

          <TouchableHighlight
            className="w-32 bg-[#4e545f56] rounded-lg self-center h-10 flex items-center justify-center mt-2"
            onPress={() => {
              login();
            }}
            activeOpacity={0.3}
            underlayColor="#6b7280"
          >
            <Text className="font-bold text-lg text-white">Login</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default Login;
