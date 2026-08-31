import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";


const API_KEY = "cv_ndLe5pShAHm7xv7r3QjNNXLYxv5P3M9HRBHIQ0ILxNYRkRGz2khJI7SNrx9EZgEp";


const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});


export default function JogosCriarScreen() {
  const [titulo, setTitulo] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [genero, setGenero] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [anoLancamento, setAnoLancamento] = useState("");
  const [desenvolvedora, setDesenvolvedora] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function criarJogo() {
    if (!titulo) {
      Alert.alert("Preencha pelo menos o título.");
      return;
    }

    setEnviando(true);
    try {
      const resposta = await api.post("/api/jogos", {
        title: titulo,
        imageUrl: imagemUrl || null,
        genero: genero,
        plataforma: plataforma,
        ano_lancamento: Number(anoLancamento),
        desenvolvedora: desenvolvedora,
      });

      Alert.alert("Jogo criado!", resposta.data.title);
      setTitulo("");
      setImagemUrl("");
      setGenero("");
      setPlataforma("");
      setAnoLancamento("");
      setDesenvolvedora("");
    } catch (e) {
      Alert.alert(
        "Não deu pra criar o jogo",
        "A API respondeu com erro. Confere se todos os campos estão certinhos e tenta de novo."
      );
      console.error(e.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>Criar jogo</Text>
          <Text style={styles.subtitulo}>POST /api/jogos</Text>
        </View>

        <Text style={styles.rotulo}>Título</Text>
        <TextInput
          style={styles.campo}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ex: Fortnite"
        />

        <Text style={styles.rotulo}>URL da imagem</Text>
        <TextInput
          style={styles.campo}
          value={imagemUrl}
          onChangeText={setImagemUrl}
          placeholder="Ex: https://exemplo.com/fortnite.jpg"
        />

        <Text style={styles.secao}>Campos específicos do tema jogos</Text>

        <Text style={styles.rotulo}>Gênero</Text>
        <TextInput
          style={styles.campo}
          value={genero}
          onChangeText={setGenero}
          placeholder="Ex: Ação"
        />

        <Text style={styles.rotulo}>Plataforma</Text>
        <TextInput
          style={styles.campo}
          value={plataforma}
          onChangeText={setPlataforma}
          placeholder="Ex: PC"
        />

        <Text style={styles.rotulo}>Ano de Lançamento</Text>
        <TextInput
          style={styles.campo}
          value={anoLancamento}
          onChangeText={setAnoLancamento}
          placeholder="Ex: 2020"
        />
        <Text style={styles.rotulo}>Desenvolvedora</Text>
        <TextInput
          style={styles.campo}
          value={desenvolvedora}
          onChangeText={setDesenvolvedora}
          placeholder="Ex: Epic Games"
          />

        <Pressable style={styles.botao} onPress={criarJogo} disabled={enviando}>
          <Text style={styles.botaoTexto}>{enviando ? "Enviando..." : "Criar jogo"}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#af74e746" },
  conteudo: { padding: 24, paddingBottom: 48 },
  header: { marginBottom: 16 },
  tituloPagina: { fontSize: 24, fontWeight: "800", color: "#522bc0e5" },
  subtitulo: { fontSize: 14, color: "#5f6b7a", marginTop: 2 },
  secao: {
    fontSize: 14,
    fontWeight: "700",
    color: "#102542",
    marginTop: 8,
    marginBottom: 8,
  },

  rotulo: { fontSize: 13, fontWeight: "600", color: "#334155", marginBottom: 4 },
  campo: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: "white",
  },
  botao: {
    backgroundColor: "#1565c0",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  botaoTexto: { color: "white", fontWeight: "700" },
});