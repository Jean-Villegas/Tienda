import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';
import PrimaryButton from '../components/PrimaryButton';

<<<<<<< HEAD
export default function OrdersScreen({ navigation, route }) {
    const justCreatedOrder = route?.params?.justCreatedOrder;
=======
export default function OrdersScreen({ navigation }) {
>>>>>>> 8d8bd5bf1d43fb7e6d77f4ac42fd508bce6bb573
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.title}>Mis Pedidos</Text>
            </View>
            <View style={styles.container}>
                <Ionicons name="cube-outline" size={80} color={theme.colors.textMuted} style={styles.icon} />
<<<<<<< HEAD
                {justCreatedOrder ? (
                    <>
                        <Text style={styles.emptyText}>
                            Tu pedido ha sido recibido por los administradores.
                        </Text>
                        <Text style={styles.helperText}>
                            Ellos coordinarán el delivery y pagarán al emprendedor al final del día.
                        </Text>
                    </>
                ) : (
                    <Text style={styles.emptyText}>No tienes pedidos en curso.</Text>
                )}
=======
                <Text style={styles.emptyText}>No tienes pedidos en curso.</Text>
>>>>>>> 8d8bd5bf1d43fb7e6d77f4ac42fd508bce6bb573
                <PrimaryButton
                    title="Ir a comprar"
                    onPress={() => navigation.navigate('Home')}
                    style={{ width: 200, marginTop: 20 }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.colors.backgroundApp },
    header: { padding: 20, backgroundColor: 'rgba(213, 228, 207, 0.9)', alignItems: 'center' },
    title: { fontSize: 20, fontFamily: theme.fonts.bold, color: theme.colors.textMain },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    icon: { marginBottom: 20, opacity: 0.5 },
<<<<<<< HEAD
    emptyText: { fontFamily: theme.fonts.medium, color: theme.colors.textMuted, fontSize: 16, textAlign: 'center' },
    helperText: { marginTop: 10, fontFamily: theme.fonts.regular, color: theme.colors.textMuted, fontSize: 14, textAlign: 'center' }
=======
    emptyText: { fontFamily: theme.fonts.medium, color: theme.colors.textMuted, fontSize: 16 }
>>>>>>> 8d8bd5bf1d43fb7e6d77f4ac42fd508bce6bb573
});
