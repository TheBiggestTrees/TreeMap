import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";  

const TOKEN_KEY = "x-auth-token";
const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({ "x-auth-token": null, "authenticated": null  });

    useEffect(() => {
      const loadToken = async () => {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        if (token) {
          setAuthState({ "x-auth-token": token, "authenticated": true });
          axios.defaults.headers.common["x-auth-token"] = token;
        }
      };
      loadToken();
    }, []);

    const register = async (regData) => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/users`, regData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const login = async (regData) => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, regData);

        setAuthState({ "x-auth-token": response.data.token, "authenticated": true });
        axios.defaults.headers.common["x-auth-token"] = response.data.token;
        await SecureStore.setItemAsync(TOKEN_KEY, response.data.token);
        console.log(response.data);
        return response;
      } catch (error) {
        console.error(error);
      }
    };

    const logout = async () => {
      try {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        setAuthState({ "x-auth-token": null, "authenticated": false });
      } catch (error) {
        console.error(error);
      }
    };

    const value = {
      onRegister: register,
      onLogin: login,
      onLogout: logout,
      authState,

    };

    return (
      <AuthContext.Provider value={value}>
          {children}
      </AuthContext.Provider>
    )
};