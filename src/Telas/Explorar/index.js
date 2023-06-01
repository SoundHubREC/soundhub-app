import React, { useContext, useState } from "react";
import {
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  StatusBar,
} from "react-native";

import { pesquisar } from "../../Servicos/Requisições/pesquisar";

import BarraSuperior from "../Home/Componentes/barraSuperior";
import { QueueContext } from "../../contexts/QueueContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Explorar() {
  const [text, onChangeText] = useState("");
  const [resultado, setResultado] = useState([]);
  const [musica, setMusica] = useState({ nome: "", id: "" });
  const [modalVisible, setModalVisible] = useState(false);
  const [erro, setErro] = useState("");

  const { inserirMusica } = useContext(QueueContext);

  async function pesquisa(text) {
    const result = await pesquisar(text);

    if (result) {
      setResultado(result);
    }
  }

  const Item = ({
    nomeMusica,
    nomeCantor,
    imagemMusica,
    index,
    musicaId,
    artistaId,
  }) => (
    <TouchableOpacity
      style={[estilos.estiloViewPrincipal]}
      onPress={() => {
        setMusica({ nome: nomeMusica, id: musicaId, artistaId: artistaId });
        setModalVisible(true);
      }}
    >
      <View style={[estilos.estiloMusica, estilos.estiloMusicaSecundaria]}>
        <View>
          <Image
            source={{ uri: imagemMusica }}
            style={estilos.imagemMusicaSecundaria}
          />
          <View style={estilos.contadorMusica}>
            <Text style={estilos.numeroContadorMusica}>{index + 1}</Text>
          </View>
        </View>
        <View>
          <Text style={estilos.nomeMusicaSecundaria}>{nomeMusica}</Text>
          <Text style={estilos.artistaMusicaSecundaria}>{nomeCantor}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const Popup = ({ nome, id, artistaId }) => {
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
              Tem certeza que deseja inserir a musica {nome} na queue?
            </Text>
            <Text style={{ fontSize: 10, color: "red", marginBottom: 10 }}>
              {erro}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={async () => {
                  try {
                    await inserirMusica(id, artistaId);
                    setModalVisible(!modalVisible);
                  } catch (error) {
                    setErro(
                      "Limite de escolhas atingido e/ou essa música já foi escolhida recentemente"
                    );
                  }
                }}
              >
                <Text style={styles.textStyle}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose, { marginLeft: 20 }]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setErro("");
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

  return (
    <View style={{ backgroundColor: "#131313", flex: 1 }}>
      <FlatList
        data={resultado}
        renderItem={({ item, index }) => (
          <Item
            nomeMusica={item.name}
            nomeCantor={item.artist}
            imagemMusica={item.images.url}
            musicaId={item.id}
            artistaId={item.artirstId}
            index={index}
          />
        )}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={
          <>
            <BarraSuperior />
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
              <TextInput
                style={estilos.input}
                onChangeText={onChangeText}
                value={text}
                placeholder={"Pesquise por música, artista, album..."}
                placeholderTextColor="#fff"
                onSubmitEditing={() => pesquisa(text)}
              />
              <TouchableOpacity onPress={() => pesquisa(text)} style={{marginRight: 20, backgroundColor: "#FFD800", height: 50, padding: 16, borderRadius: 50, alignItems: "center", justifyContent: "center", position: "absolute", width: "15%", right: 0}}><Text style={{color: "#000", fontSize: 10}}>Pesquisar</Text></TouchableOpacity>
            </View>
            <Text
              style={{ paddingHorizontal: 20, marginBottom: 15, color: "#fff" }}
            >
              Resultados da Pesquisa
            </Text>
          </>
        }
      />
      <Popup nome={musica.nome} id={musica.id} artistaId={musica.artistaId} />
    </View>
  );
}

const estilos = StyleSheet.create({
  estiloViewPrincipal: {
    justifyContent: "flex-start",
    marginHorizontal: 20,
    marginBottom: 10,
    justifyContent: "center",
    backgroundColor: "#272727",
    borderRadius: 10,
    maxWidth: windowWidth * 0.9,
  },
  estiloMusica: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  estiloMusicaSecundaria: {},
  imagemMusicaSecundaria: {
    width: windowWidth * 0.11,
    height: windowWidth * 0.11,
    borderRadius: 10,
    marginRight: 10,
    borderColor: "#FFD800",
    borderWidth: 1,
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
  nomeMusicaSecundaria: {
    fontFamily: "InterSemiBold",
    fontSize: 12,
    color: "#fff",
    maxWidth: windowWidth * 0.6,
  },
  artistaMusicaSecundaria: {
    fontFamily: "InterLight",
    fontSize: 12,
    color: "#fff",
  },
  input: {
    height: 50,
    width: "90%",
    marginVertical: 16,
    marginLeft: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    color: "#fff",
    backgroundColor: "#272727",
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
