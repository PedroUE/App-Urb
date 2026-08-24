import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const API_KEY = "cv_PoKQYX6JDrn6Azq2w-q_1kB0tbCmGhr3lZr2fDDWYXq5vD9GzNyamfc4gNxIdlJq";

const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});


export default function JogosCriarScreen() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [status, setStatus] = useState("");
  const [estudio, setEstudio] = useState("");
  const [genero, setGenero] = useState("");

  const [enviando, setEnviando] = useState(false);

  async function criarJogo() {
    if (!titulo) {
      Alert.alert("Atenção, Preencha pelo menos o título do jogo.");
      return;
    }

    setEnviando(true);
    try {
      const resposta = await api.post("/api/jogos", {
        title: titulo,
        description: descricao,
        imageUrl: imagemUrl,
        status: status,
        estudio: estudio,
        genero: genero,
      });

      Alert.alert("Jogo criado!", resposta.data.title);
      setTitulo("");
      setDescricao("");
      setImagemUrl("");
      setStatus("");
      setEstudio("");
      setGenero("");
    } catch (e) {
      Alert.alert(
        "Não deu pra criar o jogo",
        "A API respondeu com erro. Confere se todos os campos estão certinhos e tenta de novo."
      );
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
          placeholder="Ex: The Legend of Zelda: Breath of the Wild"
        />

        <Text style={styles.rotulo}>Descrição</Text>
        <TextInput
          style={styles.campo}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Ex: The Legend of Zelda: Breath of the Wild em uma versao simplificada do tema Jogos."
        />

        <Text style={styles.rotulo}>URL da imagem</Text>
        <TextInput
          style={styles.campo}
          value={imagemUrl}
          onChangeText={setImagemUrl}
          placeholder="Ex: https://exemplo.com/zelda.png"
        />

        <Text style={styles.secao}>Campos específicos do tema jogos</Text>

        <Text style={styles.rotulo}>status</Text>
        <TextInput
          style={styles.campo}
          value={status}
          onChangeText={setStatus}
          placeholder="Ex: Lancado"
        />

        <Text style={styles.rotulo}>estudio</Text>
        <TextInput
          style={styles.campo}
          value={estudio}
          onChangeText={setEstudio}
          placeholder="Ex: Nintendo"
        />

        <Text style={styles.rotulo}>genero</Text>
        <TextInput
          style={styles.campo}
          value={genero}
          onChangeText={setGenero}
          placeholder="Ex: aventura"
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

  rotulo: { fontSize: 13, fontWeight: "600", color: "#302525", marginBottom: 4 },
  campo: {
    borderWidth: 1,
    borderColor: "#1066cf",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: "white",
  },
  botao: {
    backgroundColor: "#522bc0e5",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  botaoTexto: { color: "white", fontWeight: "700" },
});