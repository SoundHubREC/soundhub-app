import React from "react";
import { StyleSheet, View, Image } from "react-native";
import logo from "../../../assets/logo.png";

export default function BarraSuperior() {
  return (
    <View style={estilos.barra}>
      <Image source={logo} style={estilos.imagem} />
    </View>
  );
}

const estilos = StyleSheet.create({
  barra: {
    height: 60,
    flexDirection: "row",
    backgroundColor: "#131313",
    alignItems: "center",
    borderColor: "#272727",
    borderBottomWidth: 1
  },
  imagem: {
    flex: 1,
    resizeMode: "contain",
    width: null,
    height: "50%",
    tintColor: "#fff",
  },
});
