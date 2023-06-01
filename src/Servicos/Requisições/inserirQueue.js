import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api";

export async function inserirQueue(musicaId, artistaId) {
  try {
    const resultado = await api.post(
      `tracks/queue/add`,
      {
        trackId: musicaId,
        artistId: artistaId,
      },
      {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem("userToken")}`,
        },
      }
    );

    return resultado.data;
  } catch (error) {
    console.log(error);
    throw error
  }
}
