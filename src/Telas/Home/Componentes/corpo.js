import React from "react";
import { ScrollView, View } from "react-native";

import BoasVindasLogout from "./boasVindasLogout";
import CarrosselPlaylistsRecomendadas from "./carrosselPlaylistsRecomendadas";
import Playlist from "./playlist";
import ArtistasRecomendados from "./artistasRecomendados";

export default function Corpo() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#131313" }}>
      <View style={{ alignItems: "center", flex: 1 }}>
        <BoasVindasLogout />
        <CarrosselPlaylistsRecomendadas />
        <Playlist />
        <ArtistasRecomendados />
      </View>
    </ScrollView>
  );
}
