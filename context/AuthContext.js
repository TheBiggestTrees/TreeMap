import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "x-auth-token";
const AuthContext = createContext({});
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    xauthtoken: "",
    authenticated: false,
  });
  const [userID, setUserID] = useState("");

  const [user, setUser] = useState({});

  const loadToken = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    const userID = await AsyncStorage.getItem("userID");
    const userData = await AsyncStorage.getItem("userData");
    const tokenExpiration = await AsyncStorage.getItem("tokenExpiration");

    if (token) {
      const expirationDate = new Date(parseInt(tokenExpiration));
      const now = new Date();
      if (now > expirationDate) {
        console.log("Token expired");
        logout();
      } else {
        console.log("Token still valid");
        setAuthState({
          xauthtoken: token,
          authenticated: true,
        });
        setUser(JSON.parse(userData));
        setUserID(userID);
        axios.defaults.headers.common["x-auth-token"] = token;
      }
    }
  };

  useEffect(() => {
    loadToken();
  }, []);

  const [err, setErr] = useState("");

  const register = async (regData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users`,
        regData
      );
      console.log(response.data);
    } catch (error) {
      setErr(error.response.data.message);
    }
  };

  const login = async (emailOrUsername, password) => {
    setErr("Logging in...");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        emailOrUsername.includes("@")
          ? { email: emailOrUsername, password }
          : { username: emailOrUsername, password }
      );

      const { data, expiresAt, userData, userID } = response.data;
      if (data && userID && userData) {
        setAuthState({ xauthtoken: data, authenticated: true });
        setUserID(userID);
        setUser(userData);
        console.log("Log Out Date: ", new Date(expiresAt));

        axios.defaults.headers.common["x-auth-token"] = data;

        await AsyncStorage.setItem(
          "tokenExpiration",
          JSON.stringify(expiresAt)
        );
        await AsyncStorage.setItem(TOKEN_KEY, data);
        await AsyncStorage.setItem("userID", userID);
        await AsyncStorage.setItem("userData", JSON.stringify(userData));

        return response;
      } else {
        throw new Error(
          "login() received invalid response from server. Response data is invalid."
        );
      }
    } catch (error) {
      if (error) {
        setErr(error.response?.data?.message);
      } else {
        setErr(
          "An error occurred while attempting to log in. Please try again later. "
        );
        console.error(error);
      }
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem("userID");
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("tokenExpiration");
      setUserID(null);
      setAuthState({ xauthtoken: null, authenticated: false });
      setUser({});
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    userID: userID,
    xauthtoken: authState.xauthtoken,
    authenticated: authState.authenticated,
    err,
    setErr,
    user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
