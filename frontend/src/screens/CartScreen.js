import { Ionicons } from '@expo/vector-icons';
import { Alert, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackgroundShapes from '../components/BackgroundShapes';
import PrimaryButton from '../components/PrimaryButton';
import { theme } from '../utils/theme';

export default function CartScreen({ navigation }) {
    const isVerified = false;
    const isAdminFlowEnabled = true;

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
            <BackgroundShapes />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.textMain} />
                </TouchableOpacity>
                <Text style={styles.title}>Tu Carrito</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                <View style={styles.emptyContainer}>
                    <View style={styles.emptyIconCircle}>
                        <Ionicons name="cart-outline" size={50} color={theme.colors.primary} />
                    </View>
                    <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
                    <Text style={styles.emptySubtitle}>¿Aún no has encontrado nada que te guste?</Text>
                    <TouchableOpacity
                        style={styles.browseBtn}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.browseBtnText}>Explorar Tienda</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.summaryContainer}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal</Text>
                    <Text style={styles.summaryValue}>$0.00</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Envío Estimado</Text>
                    <Text style={styles.summaryValue}>$0.00</Text>
                </View>
                <View style={[styles.summaryRow, styles.totalRow]}>
                    <Text style={styles.totalLabel}>Total a pagar</Text>
                    <View style={styles.totalBadge}>
                        <Text style={styles.totalValue}>$0.00</Text>
                    </View>
                </View>
                <PrimaryButton
                    title="Proceder al Pago"
                    onPress={handlePay}
                    style={{ height: 56, borderRadius: 18 }}
                />
            </View>
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
    container: { flex: 1 },
    scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 25 },
    emptyContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.4)',
        padding: 40,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.6)',
    },
    emptyIconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: theme.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        ...theme.shadows.medium,
    },
    emptyTitle: {
        fontFamily: theme.fonts.bold,
        color: theme.colors.textMain,
        fontSize: 20,
        marginBottom: 10
    },
    emptySubtitle: {
        fontFamily: theme.fonts.regular,
        color: theme.colors.textMuted,
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 30
    },
    browseBtn: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 14,
        ...theme.shadows.small,
    },
    browseBtnText: {
        color: theme.colors.white,
        fontFamily: theme.fonts.bold,
        fontSize: 15
    },
    summaryContainer: {
        backgroundColor: theme.colors.white,
        padding: 25,
        paddingBottom: Platform.OS === 'ios' ? 105 : 85, // Ajuste para la barra de navegación absoluta
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        shadowColor: '#1B5E4F',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: -10 },
        shadowRadius: 20,
        elevation: 20,
    },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    summaryLabel: { fontFamily: theme.fonts.medium, color: theme.colors.textMuted, fontSize: 14 },
    summaryValue: { fontFamily: theme.fonts.semiBold, color: theme.colors.textMain, fontSize: 14 },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        paddingTop: 20,
        marginBottom: 25,
        alignItems: 'center'
    },
    totalLabel: { fontFamily: theme.fonts.bold, fontSize: 18, color: theme.colors.textMain },
    totalBadge: {
        backgroundColor: 'rgba(27, 94, 79, 0.1)',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
    },
    totalValue: { fontFamily: theme.fonts.bold, fontSize: 22, color: theme.colors.primary }
});
