import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

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
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    const userID = await SecureStore.getItemAsync("userID");
    const userData = await SecureStore.getItemAsync("userData");
    const tokenExpiration = await SecureStore.getItemAsync("tokenExpiration");

    if (token && userID && userData && tokenExpiration) {
      const expirationDate = new Date(parseInt(tokenExpiration));
      const now = new Date();
      if (now > expirationDate) {
        logout();
      } else {
        setAuthState({
          xauthtoken: token,
          authenticated: true,
        });
        axios.defaults.headers.common["x-auth-token"] = token;
        setUser(JSON.parse(userData));
        setUserID(userID);
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
    try {
      setErr("Logging in...");
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
        console.log(new Date(expiresAt));

        axios.defaults.headers.common["x-auth-token"] = data;

        await SecureStore.setItemAsync("tokenExpiration", expiresAt);
        await SecureStore.setItemAsync(TOKEN_KEY, data);
        await SecureStore.setItemAsync("userID", userID);
        await SecureStore.setItemAsync("userData", JSON.stringify(userData));
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
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync("userID");
      await SecureStore.deleteItemAsync("userData");
      await SecureStore.deleteItemAsync("tokenExpiration");
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
