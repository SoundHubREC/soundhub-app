import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  StatusBar,
} from "react-native";

import BarraSuperior from "../../Componentes/Estabelecimento/barraSuperior";
import { listaVisitantesMesa } from "../../Servicos/Requisições/listaVisitantesMesa";
import { pegaQrMesa } from "../../Servicos/Requisições/pegaQrMesa";
import { removerClientes } from "../../Servicos/Requisições/removerClientes";

const windowWidth = Dimensions.get("window").width;

export default function ClientesMesa({ route, navigation }) {
  const [clientes, setClientes] = useState([]);
  const [qr, setQr] = useState();
  const { key } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [cliente, setCliente] = useState({ nome: "", id: "" });

  async function busca(key) {
    const resultado = await listaVisitantesMesa(key);

    if (resultado) {
      setClientes(resultado);
    }
  }

  async function pegaQR(key) {
    const resultado = await pegaQrMesa(key);

    if (resultado) {
      setQr(resultado);
    }
  }

  async function removerCliente(key) {
    await removerClientes(key);
  }

  useEffect(() => {
    busca(key);
    pegaQR(key);
  }, []);

  const Popup = ({ nome, id }) => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <StatusBar backgroundColor="#9E9E9E" />
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Tem certeza que deseja remover o cliente {nome}?
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={async () => {
                  await removerCliente(id);
                  await busca(key);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose, { marginLeft: 20 }]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Não</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const Item = ({ nomeCliente, idCliente }) => {
    return (
      <View style={estilos.viewCliente}>
        <Text style={estilos.textoCliente}>{nomeCliente}</Text>
        <TouchableOpacity
          onPress={() => {
            setCliente({ nome: nomeCliente, id: idCliente });
            setModalVisible(true);
          }}
        >
          <Text style={{ color: "#FFD800" }}>Remover</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: "#131313", flex: 1 }}>
      <BarraSuperior />
      <TouchableOpacity
        style={{ position: "absolute", margin: 20 }}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: "#fff" }}>Voltar</Text>
      </TouchableOpacity>
      <View style={estilos.viewPrincipal}>
        <Text style={estilos.titulo}>Mesa {key}</Text>
        <FlatList
          data={clientes}
          extraData={clientes}
          renderItem={({ item }) => (
            <Item nomeCliente={item.name} idCliente={item._id} />
          )}
          keyExtractor={({ _id }) => `${_id}`}
        />
        <Popup nome={cliente.nome} id={cliente.id} />
        <Image
          style={{
            width: 200,
            height: 200,
            borderWidth: 2,
            borderColor: "#FFD800",
            borderRadius: 10,
            marginTop: 20,
          }}
          source={{ uri: qr }}
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
  textoCliente: {
    fontFamily: "InterSemiBold",
    fontSize: 14,
    color: "#fff",
  },
  viewCliente: {
    flexDirection: "row",
    backgroundColor: "#272727",
    width: windowWidth * 0.85,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 16,
    justifyContent: "space-between",
  },
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(100,100,100, 0.5)",
    padding: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
