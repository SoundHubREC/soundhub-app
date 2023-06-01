import React from "react";
import { ScrollView, View } from "react-native";

import Playlist from "./playlist";

export default function Corpo() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center", flex: 1 }}>
        <Playlist />
      </View>
    </View>
  );
}
