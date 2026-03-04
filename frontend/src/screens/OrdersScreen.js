import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackgroundShapes from '../components/BackgroundShapes';
import PrimaryButton from '../components/PrimaryButton';
import { theme } from '../utils/theme';

export default function OrdersScreen({ navigation, route }) {
    const justCreatedOrder = route?.params?.justCreatedOrder;

    return (
        <SafeAreaView style={styles.safeArea}>
            <BackgroundShapes />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.textMain} />
                </TouchableOpacity>
                <Text style={styles.title}>Mis Pedidos</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 100 }]}>
                <View style={styles.contentCard}>
                    <View style={styles.iconCircle}>
                        <Ionicons
                            name={justCreatedOrder ? "checkmark-circle" : "cube-outline"}
                            size={50}
                            color={theme.colors.primary}
                        />
                    </View>

                    {justCreatedOrder ? (
                        <View style={styles.textContainer}>
                            <Text style={styles.orderStatusTitle}>¡Pedido Recibido!</Text>
                            <Text style={styles.emptyText}>
                                Tu pedido ha sido enviado con éxito a los administradores de NexStore.
                            </Text>
                            <View style={styles.infoBox}>
                                <Ionicons name="information-circle" size={20} color={theme.colors.primary} />
                                <Text style={styles.helperText}>
                                    Coordinaremos con el delivery y el emprendedor. Te avisaremos pronto.
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <View style={styles.textContainer}>
                            <Text style={styles.orderStatusTitle}>Sin pedidos activos</Text>
                            <Text style={styles.emptyText}>Parece que no tienes ningún pedido en curso en este momento.</Text>
                        </View>
                    )}

                    <PrimaryButton
                        title="Seguir Comprando"
                        onPress={() => navigation.navigate('Home')}
                        style={styles.actionBtn}
                    />
                </View>

                {!justCreatedOrder && (
                    <View style={styles.historySection}>
                        <Text style={styles.historyTitle}>Historial reciente</Text>
                        <View style={styles.historyPlaceholder}>
                            <Text style={styles.historyPlaceholderText}>Aquí aparecerán tus pedidos finalizados</Text>
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.colors.backgroundApp },
    header: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        backgroundColor: 'rgba(200, 217, 194, 0.8)',
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: { fontSize: 20, fontFamily: theme.fonts.bold, color: theme.colors.textMain },
    container: { flex: 1, padding: 25 },
    contentCard: {
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderRadius: 32,
        padding: 35,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.6)',
        ...theme.shadows.medium,
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: theme.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        ...theme.shadows.medium,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    orderStatusTitle: {
        fontFamily: theme.fonts.bold,
        fontSize: 22,
        color: theme.colors.textMain,
        marginBottom: 12,
        textAlign: 'center'
    },
    emptyText: {
        fontFamily: theme.fonts.medium,
        color: theme.colors.textMuted,
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 22
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: 'rgba(27, 94, 79, 0.05)',
        padding: 15,
        borderRadius: 16,
        marginTop: 20,
        alignItems: 'center',
        gap: 12
    },
    helperText: {
        flex: 1,
        fontFamily: theme.fonts.regular,
        color: theme.colors.primary,
        fontSize: 13,
        lineHeight: 18
    },
    actionBtn: {
        width: '100%',
        height: 56,
        borderRadius: 16
    },
    historySection: {
        marginTop: 40,
    },
    historyTitle: {
        fontFamily: theme.fonts.bold,
        fontSize: 16,
        color: theme.colors.textMain,
        marginBottom: 15,
        marginLeft: 5
    },
    historyPlaceholder: {
        height: 100,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.05)',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center'
    },
    historyPlaceholderText: {
        fontFamily: theme.fonts.medium,
        color: theme.colors.textMuted,
        fontSize: 13
    }
});
