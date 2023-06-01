import React from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";

import joaoGomes from "../../../../assets/joaoGomes.png";
import reginaldoRossi from "../../../../assets/reginaldoRossi.png";
import pitty from "../../../../assets/pitty.png";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function CarrosselPlaylistsRecomendadas() {
  return (
    <View style={estilos.estiloViewPrincipal}>
      <View style={estilos.estiloTituloPlaylistOpcoes}>
        <Text style={estilos.estiloTituloPlaylist}>Playlist quarta-feira</Text>
        <Text style={estilos.estiloOpcoes}>...</Text>
      </View>
      <Text style={estilos.estiloCriadorPlaylist}>by Gibox Bar</Text>
      <View style={estilos.estiloViewArtistas}>
        <Image source={joaoGomes} style={estilos.estiloArtistas} />
        <Image
          source={reginaldoRossi}
          style={[estilos.estiloArtistas, estilos.estiloArtistasSobreposicao]}
        />
        <Image
          source={pitty}
          style={[estilos.estiloArtistas, estilos.estiloArtistasSobreposicao]}
        />
        <Text style={estilos.estiloTextoQuantidadeArtistas}>+3 artistas</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  estiloViewPrincipal: {
    minWidth: windowWidth * 0.8,
    minHeight: windowHeight * 0.1,
    backgroundColor: "#272727",
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 18,
    borderRadius: 10,
  },
  estiloTituloPlaylistOpcoes: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  estiloTituloPlaylist: {
    fontFamily: "InterRegular",
    fontSize: 14,
    color: "#fff"
  },
  estiloCriadorPlaylist: {
    fontFamily: "InterLight",
    fontSize: 12,
    color: "#fff"
  },
  estiloOpcoes: {
    marginTop: -5,
    fontWeight: "900",
    color: "#FFD800"
  },
  estiloViewArtistas: {
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
  },
  estiloArtistas: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderColor: "#fff",
    borderWidth: 1,
  },
  estiloArtistasSobreposicao: {
    marginLeft: -10,
  },
  estiloTextoQuantidadeArtistas: {
    marginLeft: 5,
    fontFamily: "InterRegular",
    fontSize: 14,
    color: "#fff"
  },
});
