import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

import logo from "../../../../assets/logo.png";
import moedas from "../../../assets/Moedas.png";

export default function BarraSuperior() {
  return (
    <View style={estilos.barra}>
      <Image source={logo} style={estilos.imagem} />
      <View style={estilos.moeda}>
        <Image
          source={moedas}
          style={{
            width: 25,
            height: 25,
            tintColor: "#fff",
          }}
        />
        <Text
          style={{
            position: "absolute",
            paddingRight: 4.5,
            paddingTop: 7.5,
            fontFamily: "InterRegular",
            fontSize: 10,
            color: "#fff",
          }}
        >
          -
        </Text>
        <Text
          style={{
            fontFamily: "InterRegular",
            fontSize: 10,
            color: "#fff",
          }}
        >
          Moedas
        </Text>
      </View>
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
  moeda: {
    position: "absolute",
    marginTop: 5,
    right: 20,
    alignItems: "center",
  },
  imagem: {
    flex: 1,
    resizeMode: "contain",
    width: null,
    height: "50%",
    tintColor: "#fff",
  },
});
