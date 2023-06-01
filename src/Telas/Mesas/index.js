import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import BarraSuperior from "../../Componentes/Estabelecimento/barraSuperior";
import { listaMesas } from "../../Servicos/Requisições/listaMesas";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Mesas({ navigation }) {
  const logoutBar = async () => {
    try {
      await AsyncStorage.removeItem("barToken");
      navigation.navigate("TelaInicialEstabelecimento");
    } catch (error) {
      console.log("errou");
    }
  };

  const [mesas, setMesas] = useState();

  async function busca() {
    const resultado = await listaMesas();

    if (resultado) {
      setMesas(resultado);
    }
  }

  useEffect(() => {
    busca();
  }, []);

  const Item = ({ mesa }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ClientesMesa", {
            key: mesa.item,
          })
        }
      >
        <View style={estilos.viewMesa}>
          <Text style={estilos.textoMesa}>Mesa {mesa.item}</Text>
          <Text style={{ color: "#fff" }}>Opções</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#131313" }}>
      <BarraSuperior />
      <View style={estilos.viewPrincipal}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            width: "100%",
            paddingHorizontal: 30,
          }}
        >
          <Text style={estilos.titulo}>Mesas</Text>
          <TouchableOpacity
            style={{ position: "absolute", right: 30 }}
            onPress={async () => await logoutBar()}
          >
            <Text style={{ color: "#fff" }}>Logout</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={mesas}
          renderItem={(item) => <Item mesa={item} />}
          keyExtractor={(item, index) => `${item.item}${index}`}
        />
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  viewPrincipal: {
    alignItems: "center",
    marginVertical: 16,
  },
  titulo: {
    fontFamily: "InterSemiBold",
    fontSize: 20,
    color: "#fff",
  },
  textoMesa: {
    fontFamily: "InterSemiBold",
    fontSize: 14,
    color: "#fff",
  },
  viewMesa: {
    flexDirection: "row",
    backgroundColor: "#272727",
    width: windowWidth * 0.85,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 16,
    justifyContent: "space-between",
    borderColor: "#FFD800",
    borderWidth: 0.5
  },
});
