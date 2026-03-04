import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BackgroundShapes from '../components/BackgroundShapes';
import { theme } from '../utils/theme';

export default function SearchScreen({ route, navigation }) {
    const initialCategory = route?.params?.initialCategory;
    const popularSearches = ['Auriculares', 'Smartwatch', 'Zapatos', 'Hogar', 'Ofertas'];

    const categories = [
        { id: 1, name: 'Tecnología', icon: 'phone-portrait', color: '#E3F2FD' },
        { id: 2, name: 'Moda', icon: 'shirt', color: '#F3E5F5' },
        { id: 3, name: 'Hogar', icon: 'home', color: '#E8F5E9' },
        { id: 4, name: 'Belleza', icon: 'color-palette', color: '#FCE4EC' },
        { id: 5, name: 'Deportes', icon: 'basketball', color: '#FFF3E0' },
        { id: 6, name: 'Juguetes', icon: 'game-controller', color: '#E0F2F1' },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <BackgroundShapes />
            <View style={styles.header}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color={theme.colors.primary} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder={initialCategory ? `Buscando en ${initialCategory}...` : "¿Qué estás buscando hoy?"}
                        placeholderTextColor="#94a3b8"
                    />
                </View>
            </View>

            <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 }]} showsVerticalScrollIndicator={false}>
                {initialCategory && (
                    <View style={styles.filterBadge}>
                        <View style={styles.filterLeft}>
                            <Ionicons name="funnel" size={16} color={theme.colors.primary} />
                            <Text style={styles.filterText}>
                                Explorando: <Text style={{ fontFamily: theme.fonts.bold }}>{initialCategory}</Text>
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.setParams({ initialCategory: null })}>
                            <Ionicons name="close-circle" size={22} color={theme.colors.primary} />
                        </TouchableOpacity>
                    </View>
                )}

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Búsquedas Populares</Text>
                    <View style={styles.chipContainer}>
                        {popularSearches.map((item) => (
                            <TouchableOpacity key={item} style={styles.chip}>
                                <Text style={styles.chipText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Explorar Categorías</Text>
                    <View style={styles.gridContainer}>
                        {categories.map((cat) => (
                            <TouchableOpacity key={cat.id} style={styles.categoryCard}>
                                <View style={[styles.gridIconContainer, { backgroundColor: cat.color }]}>
                                    <Ionicons name={cat.icon} size={28} color={theme.colors.primary} />
                                </View>
                                <Text style={styles.categoryCardText}>{cat.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <TouchableOpacity style={styles.promoCard} activeOpacity={0.9}>
                    <View style={styles.promoContent}>
                        <Text style={styles.promoTitle}>Emprendedores en Trujillo</Text>
                        <Text style={styles.promoSubtitle}>Apoya el talento local de tu ciudad y descubre ofertas exclusivas.</Text>
                    </View>
                    <View style={styles.promoIconFrame}>
                        <Ionicons name="location" size={30} color={theme.colors.white} />
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.colors.backgroundApp },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'rgba(200, 217, 194, 0.8)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        ...theme.shadows.small,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontFamily: theme.fonts.regular,
        fontSize: 15,
        color: theme.colors.textMain
    },
    scrollContent: { padding: 20 },
    filterBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(27, 94, 79, 0.08)',
        padding: 14,
        borderRadius: 16,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: 'rgba(27, 94, 79, 0.15)',
    },
    filterLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    filterText: {
        fontFamily: theme.fonts.medium,
        color: theme.colors.primary,
        fontSize: 14,
    },
    section: { marginBottom: 35 },
    sectionTitle: {
        fontSize: 18,
        fontFamily: theme.fonts.bold,
        color: theme.colors.textMain,
        marginBottom: 18
    },
    chipContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    chip: {
        backgroundColor: theme.colors.white,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        ...theme.shadows.small,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.03)',
    },
    chipText: {
        fontFamily: theme.fonts.medium,
        color: theme.colors.primary,
        fontSize: 14
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 15,
    },
    categoryCard: {
        width: '47%',
        backgroundColor: theme.colors.white,
        padding: 20,
        borderRadius: 24,
        alignItems: 'center',
        ...theme.shadows.small,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.02)',
    },
    gridIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    categoryCardText: {
        fontFamily: theme.fonts.bold,
        fontSize: 14,
        color: theme.colors.textMain,
    },
    promoCard: {
        backgroundColor: theme.colors.primary,
        borderRadius: 28,
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
        ...theme.shadows.medium,
        marginTop: 10,
    },
    promoContent: { flex: 1, marginRight: 15 },
    promoTitle: {
        fontFamily: theme.fonts.bold,
        fontSize: 18,
        color: theme.colors.white,
        marginBottom: 6,
    },
    promoSubtitle: {
        fontFamily: theme.fonts.regular,
        fontSize: 13,
        color: 'rgba(255,255,255,0.7)',
        lineHeight: 18,
    },
    promoIconFrame: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
