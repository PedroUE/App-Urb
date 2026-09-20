import { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Alert,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';


const API_KEY = 'cv_L7Urk0CcrSlQQe0Xn812A0cPmLfe15djWWVXm1cIszytSpwpWWJSPNwheO7JyCOj';


const api = axios.create({
    baseURL: 'https://api-ds.codeverse.dev.br',
    headers: {
        'x-api-key': API_KEY,
    },
});


export default function JogosEditarScreen() {
    const [jogos, setJogos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);


    const [selecionado, setSelecionado] = useState(null);

    const [nome, setNome] = useState('');
    const [imagemUrl, setImagemUrl] = useState('');
    const [genero, setGenero] = useState('');
    const [plataforma, setPlataforma] = useState('');
    const [ano_lancamento, setAnoLancamento] = useState('');
    const [estudio, setEstudio] = useState('');
    const [salvando, setSalvando] = useState(false);

    async function buscarJogos() {
        setCarregando(true);
        setErro(null);
        try {
            const resposta = await api.get('/api/jogos', {
                params: { limit: 50 },
            });
            setJogos(resposta.data.data);
        } catch (e) {
            setErro('Não foi possível carregar os jogos. Tenta de novo em instantes.');
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        buscarJogos();
    }, []);

    function selecionarJogo(jogo) {
        setSelecionado(jogo);
        setNome(jogo.nome ?? '');
        setImagemUrl(jogo.imageUrl ?? '');
        setGenero(jogo.genero ?? '');
        setPlataforma(jogo.plataforma ?? '');
        setAnoLancamento(jogo.ano_lancamento ?? '');
        setEstudio(jogo.estudio ?? '');
    }

    async function salvarEdicao() {
        if (!selecionado) return;
        if (!nome) {
            Alert.alert('Preencha pelo menos o título.');
            return;
        }

        setSalvando(true);
        try {

            const resposta = await api.put(`/api/jogos/${selecionado.id}`, {
                nome: nome,
                imageUrl: imagemUrl,
                genero: genero,
                plataforma: plataforma,
                ano_lancamento: Number(ano_lancamento),
                estudio: estudio,
            });


            Alert.alert('Jogo atualizado!', resposta.data.nome);

            setSelecionado(null);
            buscarJogos();
        } catch (e) {
            Alert.alert(
                'Não deu pra atualizar o jogo',
                'A API respondeu com erro. Confere se todos os campos estão certinhos e tenta de novo.',
            );
        } finally {
            setSalvando(false);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Editar jogo</Text>
                    <Text style={styles.subtitulo}>PUT /api/jogos/:id</Text>
                </View>

                {!selecionado && (
                    <>
                        <Text style={styles.instrucao}>Toque em um jogo pra editar:</Text>

                        {carregando && <ActivityIndicator style={{ marginVertical: 16 }} />}
                        {erro && <Text style={styles.erro}>{erro}</Text>}

                        {!carregando &&
                            jogos.map((item) => (
                                <Pressable
                                    key={item.id}
                                    style={styles.linha}
                                    onPress={() => selecionarJogo(item)}>
                                    <Text style={styles.linhaTitulo}>{item.nome}</Text>
                                    <Text style={styles.linhaSeta}>editar ›</Text>
                                </Pressable>
                            ))}
                    </>
                )}

                {selecionado && (
                    <>
                        <Pressable onPress={() => setSelecionado(null)} style={styles.voltar}>
                            <Text style={styles.voltarTexto}>‹ voltar pra lista</Text>
                        </Pressable>

                        <Text style={styles.rotulo}>Título</Text>
                        <TextInput
                            style={styles.campo}
                            value={nome}
                            onChangeText={setNome}
                            placeholder="Ex: Batman"
                        />

                        <Text style={styles.rotulo}>URL da imagem</Text>
                        <TextInput
                            style={styles.campo}
                            value={imagemUrl}
                            onChangeText={setImagemUrl}
                            placeholder="Ex: https://exemplo.com/batman.jpg"
                        />

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

                        <Text style={styles.rotulo}>Ano de lançamento</Text>
                        <TextInput
                            style={styles.campo}
                            value={ano_lancamento}
                            onChangeText={setAnoLancamento}
                            placeholder="Ex: 2023"
                        />

                        <Text style={styles.rotulo}>Desenvolvedora</Text>
                        <TextInput
                            style={styles.campo}
                            value={estudio}
                            onChangeText={setEstudio}
                            placeholder="Ex: Epic Games"
                        />

                        <Pressable style={styles.botao} onPress={salvarEdicao} disabled={salvando}>
                            <Text style={styles.botaoTexto}>
                                {salvando ? 'Salvando...' : 'Salvar alterações'}
                            </Text>
                        </Pressable>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#af74e746' },
    conteudo: { padding: 24, paddingBottom: 48 },
    header: { marginBottom: 16 },
    tituloPagina: { fontSize: 24, fontWeight: '800', color: '#522bc0e5' },
    subtitulo: { fontSize: 14, color: '#5f6b7a', marginTop: 2 },

    instrucao: { fontSize: 14, color: '#334155', marginBottom: 8 },
    erro: { color: '#c62828', marginTop: 12 },

    linha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 14,
        marginBottom: 8,
    },
    linhaTitulo: { fontSize: 15, fontWeight: '700', color: '#102542' },
    linhaSeta: { fontSize: 13, color: '#1565c0', fontWeight: '600' },

    voltar: { marginBottom: 16 },
    voltarTexto: { color: '#1565c0', fontWeight: '700' },

    rotulo: { fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 4 },
    campo: {
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 12,
        backgroundColor: 'white',
    },
    botao: {
        backgroundColor: '#1565c0',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 4,
    },
    botaoTexto: { color: 'white', fontWeight: '700' },
});
