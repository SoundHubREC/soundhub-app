import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { QueueContext } from "../../../contexts/QueueContext";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Playlist() {
  const { musicas } = useContext(QueueContext);
  const navigation = useNavigation();

  const Item = ({ nomeMusica, nomeCantor, imagemMusica, index }) => {
    if (index === 0) {
      return (
        <>
          <View style={estilos.estiloMusica}>
            <Image
              source={{ uri: imagemMusica }}
              style={estilos.imagemMusicaPrincipal}
            />
            <View>
              <Text style={estilos.tituloMusicaPrincipal}>{nomeMusica}</Text>
              <Text style={estilos.artistaMusicaPrincipal}>{nomeCantor}</Text>
              <Text style={estilos.escolhaMusicaPrincipal}>Escolhida por:</Text>
              <Text style={estilos.nomeEscolhaMusicaPrincipal}>
                Gilvan Ferreira - Mesa 03
              </Text>
            </View>
          </View>
          <Text style={estilos.estiloFilaEscolha}>
            Fila ({musicas.length - 1})
          </Text>
        </>
      );
    } else {
      return (
        <View style={[estilos.estiloMusica, estilos.estiloMusicaSecundaria]}>
          <View>
            <Image
              source={{ uri: imagemMusica }}
              style={estilos.imagemMusicaSecundaria}
            />
            <View style={estilos.contadorMusica}>
              <Text style={estilos.numeroContadorMusica}>{index}</Text>
            </View>
          </View>
          <View>
            <Text style={estilos.nomeMusicaSecundaria}>{nomeMusica}</Text>
            <Text style={estilos.artistaMusicaSecundaria}>{nomeCantor}</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={estilos.estiloViewInterna}>
      <FlatList
        data={musicas}
        renderItem={({ item, index }) => (
          <View style={{}}>
            <Item
              nomeMusica={item.name}
              nomeCantor={item.artist}
              imagemMusica={item.images.url}
              index={index}
            />
          </View>
        )}
        keyExtractor={({ id }) => id}
      />
      <View style={{ width: "100%", alignItems: "center", paddingBottom: 20 }}>
        <View
          style={{
            width: "80%",
            height: 50,
            borderRadius: 15,
            backgroundColor: "#FFD800",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Explorar");
            }}
          >
            <Text>Adicionar uma Música</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  estiloViewInterna: {
    flex: 1,
    width: windowWidth,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#131313",
  },
  estiloMusica: {
    flexDirection: "row",
    alignItems: "center",
  },
  imagemMusicaSecundaria: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius: 10,
    marginRight: 10,
    borderColor: "#FFD800",
    borderWidth: 1,
  },
  imagemMusicaPrincipal: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
    borderRadius: 10,
    marginRight: 10,
    borderColor: "#FFD800",
    borderWidth: 1,
  },
  tituloMusicaPrincipal: {
    fontFamily: "InterSemiBold",
    fontSize: 16,
    color: "#fff",
  },
  artistaMusicaPrincipal: {
    fontFamily: "InterLight",
    fontSize: 14,
    color: "#fff",
  },
  escolhaMusicaPrincipal: {
    fontFamily: "InterRegular",
    fontSize: 12,
    marginTop: 5,
    color: "#fff",
  },
  nomeEscolhaMusicaPrincipal: {
    fontFamily: "InterSemiBold",
    fontSize: 12,
    color: "#fff",
  },
  nomeMusicaSecundaria: {
    fontFamily: "InterSemiBold",
    fontSize: 14,
    color: "#fff",
  },
  artistaMusicaSecundaria: {
    fontFamily: "InterLight",
    fontSize: 14,
    color: "#fff",
  },
  estiloMusicaSecundaria: {
    marginTop: 10,
  },
  estiloFilaEscolha: {
    fontFamily: "InterSemiBold",
    fontSize: 14,
    marginTop: 10,
    color: "#fff",
  },
  contadorMusica: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "#FFD800",
    borderRadius: 100,
    width: 14,
    height: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  numeroContadorMusica: {
    color: "#000",
    fontSize: 8,
  },
});
