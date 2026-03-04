import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';

export default function SearchScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color={theme.colors.textMuted} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar productos..."
                        placeholderTextColor="#9ca3af"
                    />
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.emptyText}>Ingresa un término para buscar</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.colors.backgroundApp },
    header: { padding: 20, backgroundColor: 'rgba(213, 228, 207, 0.9)' },
    searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.white, borderRadius: 12, paddingHorizontal: 15, paddingVertical: 10 },
    searchInput: { flex: 1, marginLeft: 10, fontFamily: theme.fonts.regular, fontSize: 16 },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { fontFamily: theme.fonts.medium, color: theme.colors.textMuted, fontSize: 16 }
});
