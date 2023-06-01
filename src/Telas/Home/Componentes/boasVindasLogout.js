import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

import sair from "../../../assets/Sair.png";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function BoasVindasLogout() {
  const { logout, usuarioInfo } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={estilos.estiloViewPrincipal}>
      <View>
        <Text style={estilos.estiloTextoBoasVindas}>Bom dia,</Text>
        <Text style={estilos.estiloTextoBoasVindas}>{usuarioInfo}</Text>
      </View>
      <TouchableOpacity
        onPress={async () => {
          await logout();
          navigation.navigate("TelaInicial");
        }}
      >
        <Image
          source={sair}
          style={{
            tintColor: "#fff",
            width: 25,
            height: 25,
            marginRight: 5,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  estiloViewPrincipal: {
    width: windowWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 16,
    alignItems: "center",
    backgroundColor: "#131313"
  },
  estiloTextoBoasVindas: {
    fontFamily: "InterRegular",
    fontSize: 14,
    color: "#fff",
  },
});
