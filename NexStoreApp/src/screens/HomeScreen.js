import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.logo}>Nex<Text style={styles.logoAccent}>Store</Text></Text>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Ionicons name="notifications-outline" size={24} color={theme.colors.textMain} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
                {/* Aquí irán las categorías y productos destacados según index.html */}
                <View style={styles.heroCard}>
                    <Text style={styles.heroTitle}>Nueva Colección</Text>
                    <Text style={styles.heroSubtitle}>Descubre lo último en tecnología y estilo.</Text>
                    <TouchableOpacity style={styles.heroBtn}>
                        <Text style={styles.heroBtnText}>Explorar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Categorías</Text>
                    <Text style={styles.linkText}>Ver todo</Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
                    {['Todos', 'Tech', 'Moda', 'Hogar'].map((cat, index) => (
                        <TouchableOpacity key={cat} style={[styles.categoryItem, index === 0 && styles.categoryActive]}>
                            <Text style={[styles.categoryText, index === 0 && styles.categoryTextActive]}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.colors.backgroundApp },
    header: { height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, backgroundColor: 'rgba(213, 228, 207, 0.9)' },
    logo: { fontSize: 22, fontFamily: theme.fonts.bold, color: theme.colors.textMain },
    logoAccent: { color: theme.colors.primary },
    headerActions: { flexDirection: 'row' },
    iconBtn: { marginLeft: 15 },
    container: { flex: 1, padding: 20 },
    heroCard: { backgroundColor: theme.colors.primary, borderRadius: 24, padding: 30, marginBottom: 25, justifyContent: 'center' },
    heroTitle: { color: theme.colors.white, fontSize: 24, fontFamily: theme.fonts.bold, marginBottom: 5 },
    heroSubtitle: { color: theme.colors.white, fontSize: 14, fontFamily: theme.fonts.regular, marginBottom: 15 },
    heroBtn: { backgroundColor: theme.colors.white, alignSelf: 'flex-start', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 },
    heroBtnText: { color: theme.colors.primary, fontFamily: theme.fonts.semiBold },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    sectionTitle: { fontSize: 18, fontFamily: theme.fonts.bold, color: theme.colors.textMain },
    linkText: { color: theme.colors.textMuted, fontFamily: theme.fonts.medium },
    categoriesScroll: { flexDirection: 'row', marginBottom: 25 },
    categoryItem: { paddingVertical: 10, paddingHorizontal: 20, backgroundColor: theme.colors.white, borderRadius: 50, marginRight: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 1 }, elevation: 2 },
    categoryActive: { backgroundColor: theme.colors.primary },
    categoryText: { fontFamily: theme.fonts.medium, color: theme.colors.textMain },
    categoryTextActive: { color: theme.colors.white },
});
