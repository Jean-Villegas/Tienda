import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../utils/theme';

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.logo}>Nex<Text style={styles.logoAccent}>Store</Text></Text>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.iconBtn}>
                        <Ionicons name="notifications-outline" size={24} color={theme.colors.textMain} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Cart')}>
                        <Ionicons name="cart-outline" size={24} color={theme.colors.textMain} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                <View style={styles.heroCard}>
                    <View style={styles.heroDecorative1} />
                    <View style={styles.heroDecorative2} />
                    <View style={styles.heroContent}>
                        <Text style={styles.heroTag}>OFERTA LIMITADA</Text>
                        <Text style={styles.heroTitle}>Nueva Colección{'\n'}Tecnológica</Text>
                        <Text style={styles.heroSubtitle}>Descubre gadgets que definen tu estilo.</Text>
                        <TouchableOpacity
                            style={styles.heroBtn}
                            onPress={() => navigation.navigate('Search')}
                        >
                            <Text style={styles.heroBtnText}>Explorar ahora</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.heroIconContainer}>
                        <Ionicons name="rocket" size={80} color="rgba(255,255,255,0.2)" />
                    </View>
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Categorías</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <Text style={styles.linkText}>Ver todo</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
                    {[
                        { name: 'Todos', icon: 'apps' },
                        { name: 'Tech', icon: 'phone-portrait' },
                        { name: 'Moda', icon: 'shirt' },
                        { name: 'Hogar', icon: 'home' },
                        { name: 'Belleza', icon: 'color-palette' }
                    ].map((cat, index) => (
                        <TouchableOpacity
                            key={cat.name}
                            style={[styles.categoryItem, index === 0 && styles.categoryActive]}
                            onPress={() => navigation.navigate('Search', { initialCategory: cat.name })}
                        >
                            <Ionicons
                                name={cat.icon}
                                size={18}
                                color={index === 0 ? theme.colors.white : theme.colors.primary}
                                style={{ marginRight: 8 }}
                            />
                            <Text style={[styles.categoryText, index === 0 && styles.categoryTextActive]}>{cat.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Destacados</Text>
                </View>

                {/* Placeholder para productos */}
                <View style={styles.featuredPlaceholder}>
                    <Ionicons name="sparkles" size={40} color={theme.colors.textMuted} />
                    <Text style={styles.placeholderText}>Cargando los mejores productos para ti...</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.colors.backgroundApp },
    header: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: 'rgba(213, 228, 207, 0.95)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(2, 64, 83, 0.05)',
    },
    logo: { fontSize: 24, fontFamily: theme.fonts.bold, color: theme.colors.textMain },
    logoAccent: { color: theme.colors.primary },
    headerActions: { flexDirection: 'row' },
    iconBtn: { marginLeft: 18 },
    container: { flex: 1, padding: 20 },
    heroCard: {
        backgroundColor: theme.colors.primary,
        borderRadius: 28,
        padding: 24,
        marginBottom: 30,
        minHeight: 180,
        position: 'relative',
        overflow: 'hidden',
        ...theme.shadows.medium,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    heroDecorative1: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(255,255,255,0.1)',
        top: -50,
        right: -30,
    },
    heroDecorative2: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.05)',
        bottom: -20,
        left: -20,
    },
    heroContent: { zIndex: 1 },
    heroTag: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 10,
        fontFamily: theme.fonts.bold,
        letterSpacing: 1.5,
        marginBottom: 8,
    },
    heroTitle: {
        color: theme.colors.white,
        fontSize: 26,
        fontFamily: theme.fonts.bold,
        marginBottom: 8,
        lineHeight: 32,
    },
    heroSubtitle: {
        color: 'rgba(240, 255, 240, 0.9)',
        fontSize: 14,
        fontFamily: theme.fonts.regular,
        marginBottom: 20,
        width: '70%',
    },
    heroBtn: {
        backgroundColor: theme.colors.white,
        alignSelf: 'flex-start',
        paddingHorizontal: 22,
        paddingVertical: 12,
        borderRadius: 14,
        ...theme.shadows.small,
    },
    heroBtnText: { color: theme.colors.primary, fontFamily: theme.fonts.bold, fontSize: 14 },
    heroIconContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        opacity: 0.5,
    },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
    sectionTitle: { fontSize: 20, fontFamily: theme.fonts.bold, color: theme.colors.textMain },
    linkText: { color: theme.colors.primary, fontFamily: theme.fonts.semiBold, fontSize: 14 },
    categoriesScroll: { flexDirection: 'row', marginBottom: 30, paddingHorizontal: 4 },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 18,
        backgroundColor: theme.colors.white,
        borderRadius: 16,
        marginRight: 12,
        ...theme.shadows.small,
        borderWidth: 1,
        borderColor: 'rgba(2, 64, 83, 0.05)',
    },
    categoryActive: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
    categoryText: { fontFamily: theme.fonts.semiBold, color: theme.colors.textMain, fontSize: 14 },
    categoryTextActive: { color: theme.colors.white },
    featuredPlaceholder: {
        height: 200,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 24,
        borderWidth: 2,
        borderColor: 'rgba(2, 64, 83, 0.05)',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    placeholderText: {
        color: theme.colors.textMuted,
        fontFamily: theme.fonts.medium,
        fontSize: 14,
        textAlign: 'center',
        marginTop: 15,
    }
});
