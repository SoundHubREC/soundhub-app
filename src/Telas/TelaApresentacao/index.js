import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import logo from "../../../assets/logo.png";
import backgroundImage from "../../../assets/backgroundImage.jpg";

export default function TelaApresentacao({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={estilos.imagemBackground}
      >
        <View style={estilos.background}>
          <View style={estilos.barra}>
            <Image source={logo} style={estilos.imagem} />
          </View>
          <View style={{ justifyContent: "space-around", flex: 1, width: "100%" }}>
            <View style={{ width: "100%", paddingHorizontal: "10%" }}>
              <Text style={estilos.textoPrincipal}>Personalize</Text>
              <Text style={estilos.textoSecundario}>
                a atmosfera do seu rolê
              </Text>
              <Text style={estilos.textoPrincipal}>Escutando</Text>
              <Text style={estilos.textoSecundario}>o que você gosta</Text>
            </View>
            <View style={{ width: "100%", alignItems: "center" }}>
              <TouchableOpacity
                style={estilos.botaoPrincipal}
                onPress={() => {
                  navigation.navigate("TelaInicial");
                }}
              >
                <Text>Entrar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={estilos.botaoSecundario} onPress={() => {
                  navigation.navigate("TelaInicialEstabelecimento");
                }}>
                <Text style={{ color: "#fff" }}>
                  Entrar como estabelecimento
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const estilos = StyleSheet.create({
  imagem: {
    flex: 1,
    resizeMode: "contain",
    width: null,
    height: "35%",
    tintColor: "#fff",
  },
  barra: {
    height: "20%",
    flexDirection: "row",
    alignItems: "center",
  },
  background: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  imagemBackground: { flex: 1, justifyContent: "center" },
  botaoPrincipal: {
    height: 50,
    width: "80%",
    backgroundColor: "#FFD800",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoSecundario: {
    height: 50,
    width: "80%",
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginBottom: 100,
  },
  textoPrincipal: {
    color: "#fff",
    fontFamily: "InterSemiBold",
    fontSize: 30,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  textoSecundario: {
    color: "#fff",
    fontFamily: "InterRegular",
    fontSize: 25,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
