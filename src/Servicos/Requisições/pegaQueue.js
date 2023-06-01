import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function pegaQueue() {
  try {
    const result = await api.get(`tracks/queue`, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("userToken")}`,
      },
    });
    const resultado = [];
    for (var item in result.data) {
      if (result.data[item].visitorName !== null) {
        resultado.push(result.data[item]);
      }
    }
    return resultado;
  } catch (error) {
    console.log(error);
    return {};
  }
}
