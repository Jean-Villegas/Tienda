import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { theme } from '../utils/theme';
import PrimaryButton from '../components/PrimaryButton';

export default function CartScreen({ navigation }) {
    // Más adelante estos valores deben venir del backend / contexto de usuario
    const isVerified = false;
    const isAdminFlowEnabled = true; // indica que el dinero lo gestionan los administradores

    const handlePay = () => {
        if (!isVerified) {
            Alert.alert(
                'Verifica tu cuenta',
                'Para completar la compra debes verificar tu cuenta con cédula y teléfono.',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    {
                        text: 'Ir a verificar',
                        onPress: () => navigation.navigate('Verify'),
                    },
                ],
            );
            return;
        }

        if (isAdminFlowEnabled) {
            Alert.alert(
                'Pedido enviado',
                'Tu pago será recibido por los administradores. Ellos se encargarán de contactar al delivery y pagarle personalmente al emprendedor al final del día.',
                [
                    {
                        text: 'Ver mis pedidos',
                        onPress: () => navigation.navigate('Orders'),
                    },
                    { text: 'Cerrar' },
                ],
            );
            return;
        }

        Alert.alert('Pago', 'Aquí iría el flujo real de pago.');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.title}>Tu Carrito</Text>
            </View>
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                <Text style={styles.emptyText}>Tu carrito está vacío</Text>
            </ScrollView>

            <View style={styles.summaryContainer}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal</Text>
                    <Text style={styles.summaryValue}>$0.00</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Envío</Text>
                    <Text style={styles.summaryValue}>Gratis</Text>
                </View>
                <View style={[styles.summaryRow, styles.totalRow]}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>$0.00</Text>
                </View>
                <PrimaryButton title="Pagar Ahora" onPress={handlePay} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.colors.backgroundApp },
    header: { padding: 20, backgroundColor: 'rgba(213, 228, 207, 0.9)', alignItems: 'center' },
    title: { fontSize: 20, fontFamily: theme.fonts.bold, color: theme.colors.textMain },
    container: { flex: 1 },
    scrollContent: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    emptyText: { fontFamily: theme.fonts.medium, color: theme.colors.textMuted, fontSize: 16 },
    summaryContainer: { backgroundColor: theme.colors.white, padding: 20, borderTopLeftRadius: 24, borderTopRightRadius: 24, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: -4 }, elevation: 10 },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    summaryLabel: { fontFamily: theme.fonts.regular, color: theme.colors.textMuted },
    summaryValue: { fontFamily: theme.fonts.medium, color: theme.colors.textMain },
    totalRow: { borderTopWidth: 1, borderTopColor: theme.colors.border, paddingTop: 10, marginBottom: 20 },
    totalLabel: { fontFamily: theme.fonts.bold, fontSize: 18, color: theme.colors.textMain },
    totalValue: { fontFamily: theme.fonts.bold, fontSize: 18, color: theme.colors.primary }
});
