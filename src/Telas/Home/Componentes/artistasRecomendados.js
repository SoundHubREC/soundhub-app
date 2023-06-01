import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import { pegaArtistas } from "../../../Servicos/Requisições/pegaArtistas";
import { useNavigation } from "@react-navigation/native";

export default function ArtistasRecomendados() {
  const [artistas, setArtistas] = useState([]);
  const navigation = useNavigation();

  const getArtistas = useCallback(async () => {
    try {
      const result = await pegaArtistas();
      setArtistas(result);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getArtistas();
  }, []);

  const Item = ({ idCantor, nomeCantor, imagemMusica, index }) => {
    return (
      <TouchableOpacity
        style={estilos.estiloViewArtistas}
        onPress={() => {
          navigation.navigate("Explorar", { nomeCantor: nomeCantor });
        }}
      >
        <Image source={{ uri: imagemMusica }} style={estilos.imagemArtista} />
        <Text
          style={{
            color: "#fff",
            marginTop: 1,
            fontFamily: "InterLight",
            fontSize: 12,
          }}
        >
          {nomeCantor}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ paddingHorizontal: 20, width: "100%" }}>
      <Text style={estilos.titulo}>Artistas</Text>
      <View style={{backgroundColor: "#272727", padding: 16, borderRadius: 15}}>
        <FlatList
          horizontal
          data={artistas}
          extraData={artistas}
          renderItem={({ item, index }) => (
            <Item
              idCantor={item.id}
              nomeCantor={item.name}
              imagemMusica={item.images.url}
              index={index}
            />
          )}
          keyExtractor={({ id }, index) => `${id}${index}`}
        />
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  estiloViewArtistas: {
    marginRight: 15,
    alignItems: "center",
  },
  imagemArtista: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius: 100,
    borderColor: "#FFD800",
    borderWidth: 1,
  },
  titulo: {
    paddingBottom: 10,
    fontFamily: "InterSemiBold",
    fontSize: 14,
    color: "#fff",
  },
});
