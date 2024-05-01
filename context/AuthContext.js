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

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        setAuthState({ xauthtoken: token, authenticated: true });
        axios.defaults.headers.common["x-auth-token"] = token;
      }
      const id = await SecureStore.getItemAsync("userID");
      if (id) {
        setUserID(id);
      }
      const userData = await SecureStore.getItemAsync("userData");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };

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

  const login = async (email, password) => {
    try {
      if (email.includes("@")) {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/login`,
          { email, password }
        );

        if (!response) {
          throw new Error("503 Service Unavailable");
        }

        setAuthState({
          xauthtoken: response.data.data,
          authenticated: true,
        });
        setUserID(response.data.userID);
        setUser(response.data.userData);
        axios.defaults.headers.common["x-auth-token"] = response.data.data;
        await SecureStore.setItemAsync(TOKEN_KEY, response.data.data);
        await SecureStore.setItemAsync("userID", response.data.userID);
        await SecureStore.setItemAsync(
          "userData",
          JSON.stringify(response.data.userData)
        );
        return response;
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/login`,
          { username: email, password }
        );

        setAuthState({
          xauthtoken: response.data.data,
          authenticated: true,
        });
        setUser(response.data.userData);
        setUserID(response.data.userID);
        axios.defaults.headers.common["x-auth-token"] = response.data.data;
        await SecureStore.setItemAsync(TOKEN_KEY, response.data.data);
        await SecureStore.setItemAsync("userID", response.data.userID);
        await SecureStore.setItemAsync(
          "userData",
          JSON.stringify(response.data.userData)
        );
        return response;
      }
    } catch (error) {
      console.log(error);
      setErr(error.response.data.message);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync("userID");
      await SecureStore.deleteItemAsync("userData");
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
