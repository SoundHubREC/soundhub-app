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
import DropDownPicker from "react-native-dropdown-picker";

export default function TelaInicial({ navigation }) {
  const [usuario, onChangeUsuario] = useState("");
  const [segredo, onChangeSegredo] = useState("");
  const [erro, setErro] = useState("");
  const [mesa, onChangeMesa] = useState("1");

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Mesa 01", value: "1", selected: true },
  ]);

  const { acessar, verificaToken } = useContext(AuthContext);

  async function verifica() {
    const result = await verificaToken();

    if (result) {
      navigation.navigate("Usuarios");
    }
  }

  useEffect(() => {
    verifica();
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
              <Text style={estilos.textoPrincipal}>Qual o seu nome?</Text>
              <TextInput
                onChangeText={onChangeUsuario}
                value={usuario}
                placeholder="Insira seu nome"
                placeholderTextColor="#fff"
                style={estilos.input}
              />
              <Text style={estilos.textoPrincipal}>Qual o codigo do bar?</Text>
              <TextInput
                onChangeText={onChangeSegredo}
                value={segredo}
                placeholder="Insira o codigo do bar"
                placeholderTextColor="#fff"
                style={estilos.input}
              />
              <Text style={estilos.textoPrincipal}>Selecione sua mesa:</Text>
              <DropDownPicker
                open={open}
                value={mesa}
                items={items}
                setOpen={setOpen}
                setValue={onChangeMesa}
                setItems={setItems}
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  borderRadius: 15,
                  borderColor: "#fff",
                  borderWidth: 0.5,
                }}
                textStyle={{ color: "#fff" }}
                dropDownContainerStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  borderColor: "#fff",
                  borderWidth: 0.5,
                }}
              />
              <Text style={{ color: "#fff" }}>{erro}</Text>
            </View>
            <View style={{ width: "100%", alignItems: "center" }}>
              <TouchableOpacity
                style={estilos.botaoPrincipal}
                onPress={async () => {
                  try {
                    await acessar(usuario, mesa, segredo);
                    if (verifica()) {
                      navigation.navigate("Usuarios");
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
