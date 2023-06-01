import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import Home from "./src/Telas/Home";

import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

import AppLoading from "expo-app-loading";
import Rotas from "./src/Rotas";
import { AuthProvider } from "./src/contexts/AuthContext";

export default function App() {
  const [fontCarregada] = useFonts({
    InterLight: Inter_300Light,
    InterRegular: Inter_400Regular,
    InterSemiBold: Inter_600SemiBold,
  });

  if (!fontCarregada) {
    return <AppLoading />;
  }

  return (
    <AuthProvider>
      <SafeAreaView style={estilos.container}>
        <StatusBar backgroundColor={"#000"} />
        <Rotas />
      </SafeAreaView>
    </AuthProvider>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
