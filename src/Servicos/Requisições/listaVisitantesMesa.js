import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function listaVisitantesMesa(numeroMesa) {
  try {
    const resultado = await api.get(`visitors/table/${numeroMesa}`, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("barToken")}`,
      },
    });

    return resultado.data;
  } catch (error) {
    console.log(error);
    return {};
  }
}
