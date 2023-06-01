import api from "../api";

export async function login(usuario, mesa, segredo) {
  try {
    const resultado = await api.post(`/auth/visitor/create`, {
      name: usuario,
      tableNum: mesa,
      code: segredo
    });
    return resultado.data;
  } catch (error) {
    throw error;
  }
}
