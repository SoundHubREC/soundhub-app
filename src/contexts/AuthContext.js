import { createContext, useState } from "react";
import { loginBar } from "../Servicos/Requisições/loginBar";
import { login } from "../Servicos/Requisições/login";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState("");
  const [barToken, setBarToken] = useState("");
  const [usuarioInfo, setUsuarioInfo] = useState("");

  const acessar = async (usuario, mesa, segredo) => {
    try {
      const retorno = await login(usuario, mesa, segredo);
      setUserToken(retorno.access_token);
      setUsuarioInfo(usuario);
      await AsyncStorage.setItem("userToken", retorno.access_token);
      await AsyncStorage.setItem("userName", usuario);
    } catch (error) {
      throw error;
    }
  };

  const acessarBar = async (usuario, segredo) => {
    try {
      const retorno = await loginBar(usuario, segredo);
      setBarToken(retorno.access_token);
      await AsyncStorage.setItem("barToken", retorno.access_token);
    } catch (error) {
      throw error;
    }
  };

  const verificaToken = async () => {
    try {
      if ((await AsyncStorage.getItem("userToken")) !== null) {
        setUsuarioInfo(await AsyncStorage.getItem("userName"))
        return true;
      }
    } catch (error) {}

    return false;
  };

  const verificaTokenBar = async () => {
    try {
      if ((await AsyncStorage.getItem("barToken")) !== null) {
        return true;
      }
    } catch (error) {}

    return false;
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
    } catch (error) {
      console.log("errou");
    }
  };

  const logoutBar = async () => {
    try {
      await AsyncStorage.removeItem("barToken");
    } catch (error) {
      console.log("errou");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        usuarioInfo,
        acessar,
        verificaToken,
        logout,
        acessarBar,
        verificaTokenBar,
        logoutBar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
