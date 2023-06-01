import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function pegaArtistas() {
  try {
    const resultado = await api.get(`tracks/artists`, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("userToken")}`,
      },
    });
    return resultado.data;
  } catch (error) {
    console.log(error);
    return {};
  }
}
