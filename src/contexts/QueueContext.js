import { createContext, useState, useEffect, useCallback } from "react";
import { inserirQueue } from "../Servicos/Requisições/inserirQueue";
import { pegaQueue } from "../Servicos/Requisições/pegaQueue";

export const QueueContext = createContext({});

export function QueueProvider({ children }) {
  const [musicas, setMusicas] = useState([]);
  const [result, setResult] = useState([]);

  const queue = useCallback(async () => {
    try {
      const resultado = await pegaQueue();
      setMusicas(resultado);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    queue();

    const interval = setInterval(() => {
      queue();
    }, 60000);
    return () => clearInterval(interval);
  }, [queue]);

  async function inserirMusica(musicaId, artistaId) {
    try {
      setResult(await inserirQueue(musicaId, artistaId));
      queue();
    } catch (error) {
      throw error;
    }
  }

  async function pauseMusica() {
    await pauseQueue();
    //queue();
  }

  async function playMusica() {
    await playQueue();
    //queue();
  }

  async function nextMusica() {
    setResult(await nextQueue());
    //await queue();
  }

  return (
    <QueueContext.Provider
      value={{ musicas, inserirMusica, pauseMusica, playMusica, nextMusica }}
    >
      {children}
    </QueueContext.Provider>
  );
}
