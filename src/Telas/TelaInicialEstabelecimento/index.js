import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import backgroundImage from "../../../assets/backgroundImage.jpg";
import logo from "../../../assets/logo.png";

export default function TelaInicialEstabelecimento({ navigation }) {
  const [usuario, onChangeUsuario] = useState("");
  const [segredo, onChangeSegredo] = useState("");
  const [erro, setErro] = useState("");

  const { acessarBar, verificaTokenBar } = useContext(AuthContext);

  async function verificaBar() {
    const result = await verificaTokenBar();

    if (result) {
      navigation.navigate("Estabelecimentos");
    }
  }

  useEffect(() => {
    verificaBar();
  }, []);

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
          <View
            style={{ justifyContent: "space-around", flex: 1, width: "100%" }}
          >
            <View style={{ width: "100%", paddingHorizontal: "10%" }}>
              <Text style={estilos.textoPrincipal}>Nome do bar</Text>
              <TextInput
                onChangeText={onChangeUsuario}
                value={usuario}
                placeholder="Insira o nome do bar"
                placeholderTextColor="#fff"
                style={estilos.input}
              />
              <Text style={estilos.textoPrincipal}>Senha</Text>
              <TextInput
                secureTextEntry={true}
                onChangeText={onChangeSegredo}
                value={segredo}
                placeholder="Insira a senha do bar"
                placeholderTextColor="#fff"
                style={estilos.input}
              />
              <Text style={{color:"#fff"}}>{erro}</Text>
            </View>
            <View style={{ width: "100%", alignItems: "center" }}>
              <TouchableOpacity
                style={estilos.botaoPrincipal}
                onPress={async () => {
                  try {
                    await acessarBar(usuario, segredo);
                    if (verificaBar()) {
                      navigation.navigate("Estabelecimentos");
                    } else {
                      setErro("Erro ao acessar: Token expirado ou inválido.");
                    }
                  } catch (error) {
                    console.log(error);
                    setErro("Erro ao acessar: Nome e/ou senha inválidos.");
                  }
                }}
              >
                <Text>Entrar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={estilos.botaoSecundario}
                onPress={() => {
                  navigation.navigate("TelaApresentacao");
                }}
              >
                <Text style={{ color: "#fff" }}>Voltar</Text>
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
    justifyContent: "flex-start",
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
  },
  textoPrincipal: {
    color: "#fff",
    fontFamily: "InterSemiBold",
    fontSize: 20,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    marginTop: 20,
  },
  textoSecundario: {
    color: "#fff",
    fontFamily: "InterRegular",
    fontSize: 25,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  input: {
    height: 50,
    width: "100%",
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
  },
});
