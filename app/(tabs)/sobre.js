import { View, Text, StyleSheet, Image, ScrollView, Button } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

const Foto = require("../../assets/Image.png")

export default function sobre() {
    return (
        <ScrollView>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <View style={styles.hero}>
                        <Text style={styles.title}>Bem vindo</Text>
                        <Text style={styles.subtitle}>sobre mim</Text>
                        <Image source={Foto} style={styles.foto} resizeMode="contain" />
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Sobre mim</Text>
                        <Text style={styles.description}>Sou uma pessoa calma que adora desafios, estou sempre atrás aprendizado e constantemente de novos desafios!</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Habilidades</Text>
                        <Text style={styles.cardItem}>. Desenvolvedor de sistema</Text>
                        <Text style={styles.cardItem}>. Comunicação</Text>
                        <Text style={styles.cardItem}>. Trabalho em equipe</Text>
                        <Text style={styles.cardItem}>. Inteligencia emocional</Text>
                    </View>
                </View>
                <View style={styles.botao}>
                    <Button title="Clique 1" onProgress={() => {}}>
                </Button>
                </View>
                <View style={styles.botao}>
                    <Button title="Clique 2" onProgress={() => {}}>
                    </Button>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#af74e746',
    },
    container: {
        flex: 1,
        padding: 24,
        gap: 20,
    },
    hero: {
        alignItems: 'center',
        gap: 10,
        padding: 24,
        borderRadius: 24,
        backgroundColor: '#522bc0e5',
    },
    foto: {
        width: 500,
        height: 160,
        marginBottom: 4,
        borderRadius: 90,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 1,
        textTransform: 'uppercase',
        color: '#d0e2ff',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        color: '#edf5ff',
        textAlign: 'center',
    },
    card: {
        gap: 8,
        padding: 20,
        borderRadius: 20,
        backgroundColor: '#ffffff',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#102542',
    },
    botao: {
        justifyContent: 'center',
        marginBottom: 20,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
        justifyContent: "space-around",
    },
    cardItem: {
        fontSize: 15,
        color: '#334e68',
    },
    description: {
        fontSize: 15,
    }
});
