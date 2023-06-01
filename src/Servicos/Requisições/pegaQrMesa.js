import api from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function pegaQrMesa(numeroMesa) {
  try {
    const resultado = await api.get(`pub/qrcode/${numeroMesa}`, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem("barToken")}`,
      },
    });
    return resultado.data.qrCode;
  } catch (error) {
    console.log(error);
    return {};
  }
}
