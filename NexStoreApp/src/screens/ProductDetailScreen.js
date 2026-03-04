import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';
import PrimaryButton from '../components/PrimaryButton';

export default function ProductDetailScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
                    <Ionicons name="close" size={24} color={theme.colors.primary} />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <View style={styles.imgPlaceholder}>
                    <Ionicons name="image-outline" size={64} color={theme.colors.textMuted} />
                </View>
                <Text style={styles.title}>Producto de Ejemplo</Text>
                <Text style={styles.price}>$99.99</Text>
                <Text style={styles.desc}>Esta es una descripción de ejemplo del producto que se mostrará en detalle.</Text>
            </View>
            <View style={styles.footer}>
                <PrimaryButton
                    title="Agregar al Carrito "
                    icon={<Ionicons name="cart" size={20} color={theme.colors.white} />}
                    onPress={() => {
                        alert('Producto agregado');
                        navigation.goBack();
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.colors.white },
    header: { padding: 20, flexDirection: 'row', justifyContent: 'flex-end' },
    closeBtn: { width: 40, height: 40, backgroundColor: theme.colors.white, borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, elevation: 4, justifyContent: 'center', alignItems: 'center' },
    content: { flex: 1, padding: 20 },
    imgPlaceholder: { width: '100%', aspectRatio: 1, backgroundColor: theme.colors.backgroundApp, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    title: { fontSize: 24, fontFamily: theme.fonts.bold, color: theme.colors.textMain, marginBottom: 10 },
    price: { fontSize: 22, fontFamily: theme.fonts.bold, color: theme.colors.primary, marginBottom: 15 },
    desc: { fontSize: 16, fontFamily: theme.fonts.regular, color: theme.colors.textMuted },
    footer: { padding: 20, borderTopWidth: 1, borderTopColor: theme.colors.border }
});
