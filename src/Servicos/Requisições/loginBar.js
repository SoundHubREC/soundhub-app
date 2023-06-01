import api from "../api";

export async function loginBar(usuario, segredo) {
  try {
    const resultado = await api.post(`auth/pub/login`, {
      userName: usuario,
      password: segredo,
    });
    return resultado.data;
  } catch (error) {
    throw error;
  }
}
