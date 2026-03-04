import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';

export default function AdminDashboardScreen() {
    // Más adelante aquí se listarán pedidos reales desde el backend
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
                <View style={styles.header}>
                    <Text style={styles.logo}>Nex<Text style={styles.logoAccent}>Admin</Text></Text>
                    <Text style={styles.title}>Panel de Administrador</Text>
                    <Text style={styles.subtitle}>
                        Aquí gestionas los pedidos, coordinar el delivery y llevas control de los pagos a emprendedores.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Pedidos del día</Text>
                    <View style={styles.card}>
                        <Ionicons name="cash-outline" size={26} color={theme.colors.primary} style={{ marginBottom: 10 }} />
                        <Text style={styles.cardTitle}>Flujo de dinero</Text>
                        <Text style={styles.cardText}>
                            El dinero de cada pedido se recibe en las cuentas de los administradores. Ustedes
                            contactan al delivery y pagan personalmente al emprendedor al final del día.
                        </Text>
                    </View>
                    <View style={styles.card}>
                        <Ionicons name="list-circle-outline" size={26} color={theme.colors.primary} style={{ marginBottom: 10 }} />
                        <Text style={styles.cardTitle}>Próximamente</Text>
                        <Text style={styles.cardText}>
                            Aquí se mostrarán los pedidos pendientes, en proceso y completados, junto con el estado
                            de pago a cada emprendedor.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.colors.backgroundApp },
    container: { flex: 1 },
    header: {
        padding: 24,
        backgroundColor: theme.colors.textMain,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    logo: { fontSize: 24, fontFamily: theme.fonts.bold, color: theme.colors.primary, marginBottom: 8 },
    logoAccent: { color: theme.colors.white },
    title: { fontSize: 22, fontFamily: theme.fonts.bold, color: theme.colors.white, marginBottom: 6 },
    subtitle: {
        fontSize: 13,
        fontFamily: theme.fonts.regular,
        color: 'rgba(255,255,255,0.85)',
    },
    section: { padding: 20 },
    sectionTitle: {
        fontSize: 18,
        fontFamily: theme.fonts.bold,
        color: theme.colors.textMain,
        marginBottom: 16,
    },
    card: {
        backgroundColor: theme.colors.white,
        padding: 18,
        borderRadius: 18,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    cardTitle: {
        fontSize: 16,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.textMain,
        marginBottom: 6,
    },
    cardText: {
        fontSize: 14,
        fontFamily: theme.fonts.regular,
        color: theme.colors.textMuted,
    },
});

