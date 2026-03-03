import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';
import PrimaryButton from '../components/PrimaryButton';

export default function OrdersScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.title}>Mis Pedidos</Text>
            </View>
            <View style={styles.container}>
                <Ionicons name="cube-outline" size={80} color={theme.colors.textMuted} style={styles.icon} />
                <Text style={styles.emptyText}>No tienes pedidos en curso.</Text>
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
    emptyText: { fontFamily: theme.fonts.medium, color: theme.colors.textMuted, fontSize: 16 }
});
