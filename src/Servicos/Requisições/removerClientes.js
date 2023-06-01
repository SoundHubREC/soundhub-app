import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function removerClientes(key) {
  try {
    const resultado = await api.delete(`visitors/${key}`, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("barToken")}`,
      },
    });
    return resultado.data;
  } catch (error) {
    console.log(error);
    return {}
  }
}
