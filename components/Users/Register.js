import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";

const Register = (props) => {
  const { onRegister, err, setErr } = useAuth();
  const { setScreen } = props;

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [passMsg, setPassMsg] = useState("");

  const checkPassword = (a, b) => {
    if (a === b) {
      setPassMsg("");
      setErr("");
      return true;
    } else {
      setPassMsg("Passwords do not match");
      return false;
    }
  };

  const register = async () => {
    if (passMsg !== "Passwords do not match") {
      onRegister({
        username,
        firstName,
        lastName,
        email,
        password: confirmPassword,
        month,
        day,
        year,
      }).then((res) => {
        if (
          err ||
          (username.length > 0 &&
            firstName.length > 0 &&
            lastName.length > 0 &&
            email.length > 0 &&
            password.length > 0 &&
            confirmPassword.length > 0 &&
            month.length > 0 &&
            day.length > 0 &&
            year.length > 0)
        ) {
          setScreen("login");
          setErr("");
        }
      });
    } else {
      setErr("Passwords do not match");
    }
  };

  const handleChange = (e, name) => {
    switch (name) {
      case "Username":
        setUsername(e.nativeEvent.text);
        break;
      case "First Name":
        setFirstName(e.nativeEvent.text);
        break;
      case "Last Name":
        setLastName(e.nativeEvent.text);
        break;
      case "Email":
        setEmail(e.nativeEvent.text);
        break;
      case "Password":
        setPassword(e.nativeEvent.text);
        checkPassword(e.nativeEvent.text, confirmPassword);
        break;
      case "Confirm Password":
        setConfirmPassword(e.nativeEvent.text);
        checkPassword(password, e.nativeEvent.text);
        break;
      case "Month":
        setMonth(e.nativeEvent.text);
        break;
      case "Day":
        setDay(e.nativeEvent.text);
        break;
      case "Year":
        setYear(e.nativeEvent.text);
        break;
      default:
        break;
    }
  };
  return (
    <View className="flex w-full h-full bg-gray-500 items-center">
      <View className="flex items-center justify-center mt-8 mb-4">
        <Text className="text-white font-bold text-lg">Register</Text>
        <View className="h-1 w-32 rounded-full bg-gray-600"></View>
      </View>
      <ScrollView className="h-[75%] w-full rounded-lg">
        <View className="flex w-full justify-center items-center">
          <TextInput
            className="bg-white my-2 rounded-lg h-8 p-2 w-[70%]"
            onChange={(e) => {
              handleChange(e, "Username");
            }}
            placeholder="Username"
          />
          <TextInput
            className="bg-white mx-2 my-2 rounded-lg h-8 p-2 w-[70%]"
            onChange={(e) => {
              handleChange(e, "First Name");
            }}
            placeholder="First Name"
          />
          <TextInput
            className="bg-white my-2 rounded-lg h-8 p-2 w-[70%]"
            onChange={(e) => {
              handleChange(e, "Email");
            }}
            placeholder="Email"
          />
          <TextInput
            className="bg-white mx-2 my-2 rounded-lg h-8 p-2 w-[70%]"
            onChange={(e) => {
              handleChange(e, "Last Name");
            }}
            placeholder="Last Name"
          />
          <TextInput
            className="bg-white my-2 rounded-lg h-8 p-2 w-[70%]"
            onChange={(e) => {
              handleChange(e, "Password");
            }}
            secureTextEntry={true}
            placeholder="Password"
          />
          {passMsg && (
            <Text className="text-[#d15d5d] font-bold">{passMsg}</Text>
          )}
          <TextInput
            className="bg-white mx-2 my-2 rounded-lg h-8 p-2 w-[70%]"
            onChange={(e) => {
              handleChange(e, "Confirm Password");
            }}
            secureTextEntry={true}
            placeholder="Confirm Password"
          />
          <TextInput
            className="bg-white my-2 rounded-lg h-8 p-2 w-[70%]"
            onChange={(e) => {
              handleChange(e, "Month");
            }}
            placeholder="Month"
          />
          <TextInput
            className="bg-white mx-2 my-2 rounded-lg h-8 p-2 w-[70%]"
            onChange={(e) => {
              handleChange(e, "Day");
            }}
            placeholder="Day"
          />
          <TextInput
            className="bg-white my-2 rounded-lg h-8 p-2 w-[70%]"
            onChange={(e) => {
              handleChange(e, "Year");
            }}
            placeholder="Year"
          />
        </View>
      </ScrollView>
      {err && <Text className="text-[#d15d5d] font-bold">{err}</Text>}
      <View className="flex flex-row gap-2 py-3 items-center justify-center">
        <TouchableHighlight
          className="bg-[#4e545f56] rounded-lg self-center h-11 w-32 flex items-center justify-center mt-2"
          activeOpacity={0.8}
          underlayColor="transparent"
          onPress={() => {
            setScreen("login");
          }}
        >
          <Text className="font-bold text-lg text-white">Login</Text>
        </TouchableHighlight>

        <TouchableHighlight
          className="bg-[#4e545f56] rounded-lg self-center h-11 w-32 flex items-center justify-center mt-2"
          activeOpacity={0.8}
          underlayColor="transparent"
          onPress={() => {
            register();
            console.log("Register");
          }}
        >
          <Text className="font-bold text-lg text-white">Register</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Register;
