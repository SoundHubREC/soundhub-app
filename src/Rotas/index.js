import React, { useContext, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../Telas/Home";
import Playlist from "../Telas/Playlist";
import Explorar from "../Telas/Explorar";
import Mesas from "../Telas/Mesas";
import ClientesMesa from "../Telas/ClientesMesa";
import TelaInicial from "../Telas/TelaInicial";
import TelaApresentacao from "../Telas/TelaApresentacao";
import TelaInicialEstabelecimento from "../Telas/TelaInicialEstabelecimento";
import { Image, Text, View } from "react-native";

import iconeHome from "../assets/Home.png";
import iconePlaylist from "../assets/Playlist.png";
import iconeExplorar from "../assets/Explorar.png";
import iconMesa from "../assets/Mesa.png";
import iconeExplorarSelecionado from "../assets/ExplorarSelecionado.png";
import iconePlaylistSelecionada from "../assets/PlaylistSelecionada.png";
import iconeHomeSelecionada from "../assets/HomeSelecionada.png";
import { QueueProvider } from "../contexts/QueueContext";

const Tab = createBottomTabNavigator();
const Tab2 = createBottomTabNavigator();
const Tab3 = createNativeStackNavigator();
const Tab4 = createNativeStackNavigator();

export default function Rotas() {
  function RotasUsuarios() {
    return (
      <QueueProvider>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: "#131313",
              height: 60,
              borderTopWidth: 1,
              borderTopColor: "#272727",
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={{
                      minHeight: 40,
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? "#FFD800" : "#fff",
                      }}
                      source={focused ? iconeHomeSelecionada : iconeHome}
                    />
                    <Text
                      style={{
                        fontFamily: "InterRegular",
                        fontSize: 8,
                        color: focused ? "#FFD800" : "#fff",
                      }}
                    >
                      Home
                    </Text>
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name="Playlist"
            component={Playlist}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={{
                      minHeight: 40,
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? "#FFD800" : "#fff",
                      }}
                      source={
                        focused ? iconePlaylistSelecionada : iconePlaylist
                      }
                    />
                    <Text
                      style={{
                        fontFamily: "InterRegular",
                        fontSize: 8,
                        color: focused ? "#FFD800" : "#fff",
                      }}
                    >
                      Playlist
                    </Text>
                  </View>
                );
              },
            }}
          />
          <Tab.Screen
            name="Explorar"
            component={Explorar}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={{
                      minHeight: 40,
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{
                        width: 25,
                        height: 25,
                        tintColor: focused ? "#FFD800" : "#fff",
                      }}
                      source={
                        focused ? iconeExplorarSelecionado : iconeExplorar
                      }
                    />
                    <Text
                      style={{
                        fontFamily: "InterRegular",
                        fontSize: 8,
                        color: focused ? "#FFD800" : "#fff",
                      }}
                    >
                      Explorar
                    </Text>
                  </View>
                );
              },
            }}
          />
        </Tab.Navigator>
      </QueueProvider>
    );
  }

  function RotasEstabelecimento() {
    return (
      <QueueProvider>
        <Tab2.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: "#131313",
              height: 60,
              borderTopWidth: 1,
              borderTopColor: "#272727",
            },
          }}
        >
          <Tab2.Screen
            name="Mesa"
            component={Mesa}
            options={{
              headerShown: false,
              tabBarIcon: () => {
                return (
                  <>
                    <Image
                      style={{ width: 25, height: 25, tintColor: "#fff" }}
                      source={iconMesa}
                    />
                    <Text style={{ fontFamily: "InterRegular", fontSize: 8, color: "#fff" }}>
                      Mesas
                    </Text>
                  </>
                );
              },
            }}
          />
        </Tab2.Navigator>
      </QueueProvider>
    );
  }

  function Mesa() {
    return (
      <Tab3.Navigator screenOptions={{ headerShown: false }}>
        <Tab3.Screen name="Mesas" component={Mesas}></Tab3.Screen>
        <Tab3.Screen name="ClientesMesa" component={ClientesMesa}></Tab3.Screen>
      </Tab3.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Tab4.Navigator screenOptions={{ headerShown: false }}>
        <Tab4.Screen
          name="TelaApresentacao"
          component={TelaApresentacao}
        ></Tab4.Screen>
        <Tab4.Screen name="TelaInicial" component={TelaInicial}></Tab4.Screen>
        <Tab4.Screen
          name="TelaInicialEstabelecimento"
          component={TelaInicialEstabelecimento}
        ></Tab4.Screen>
        <Tab4.Screen
          name="Estabelecimentos"
          component={RotasEstabelecimento}
        ></Tab4.Screen>
        <Tab4.Screen name="Usuarios" component={RotasUsuarios}></Tab4.Screen>
      </Tab4.Navigator>
    </NavigationContainer>
  );
}
