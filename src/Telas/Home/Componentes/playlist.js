import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import { QueueContext } from "../../../contexts/QueueContext";

export default function Playlist() {
  const { musicas } = useContext(QueueContext);

  const Item = ({ nomeMusica, nomeCantor, imagemMusica, index, visitorName }) => {
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
                {visitorName}
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
    <View style={estilos.estiloViewPrincipal}>
      <Text style={{ color: "#fff", fontFamily: "InterSemiBold" }}>
        Queue
      </Text>
      <View style={estilos.estiloViewInterna}>
        <FlatList
          data={musicas}
          extraData={musicas}
          renderItem={({ item, index }) => {
            if(item.visitorName !== null){
              return <Item
              nomeMusica={item.name}
              nomeCantor={item.artist}
              imagemMusica={item.images.url}
              visitorName={item.visitorName}
              index={index}
            />
            }
          }
            
          }
          keyExtractor={({ id }) => id}
        />
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  estiloViewPrincipal: {
    width: windowWidth,
    maxHeight: windowHeight * 0.4,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    marginVertical: 20,
    justifyContent: "center",
  },
  estiloViewInterna: {
    maxHeight: windowHeight * 0.32,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#272727",
    borderRadius: 20,
  },
  estiloMusica: {
    flexDirection: "row",
    alignItems: "center",
  },
  imagemMusicaSecundaria: {
    width: windowWidth * 0.11,
    height: windowWidth * 0.11,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#FFD800",
  },
  imagemMusicaPrincipal: {
    width: windowWidth * 0.27,
    height: windowWidth * 0.27,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#FFD800",
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
    fontFamily: "InterSemiBold",
    fontSize: 12,
    marginTop: 5,
    color: "#fff",
  },
  nomeEscolhaMusicaPrincipal: {
    fontFamily: "InterRegular",
    fontSize: 12,
    color: "#fff",
  },
  nomeMusicaSecundaria: {
    fontFamily: "InterSemiBold",
    fontSize: 12,
    color: "#fff",
  },
  artistaMusicaSecundaria: {
    fontFamily: "InterLight",
    fontSize: 12,
    color: "#fff",
  },
  estiloMusicaSecundaria: {
    marginTop: 10,
  },
  estiloFilaEscolha: {
    fontFamily: "InterSemiBold",
    fontSize: 12,
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
