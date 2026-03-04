import { Ionicons } from '@expo/vector-icons';
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackgroundShapes from '../components/BackgroundShapes';
import { theme } from '../utils/theme';

export default function ProfileScreen({ navigation }) {
    const userRole = 'CLIENTE';

    const menuItems = [
        { icon: 'storefront-outline', title: 'Panel Emprendedor', route: 'VendorDashboard' },
        { icon: 'cube-outline', title: 'Mis Pedidos', route: 'Orders' },
        { icon: 'settings-outline', title: 'Configuración', route: 'Settings' },
        { icon: 'help-circle-outline', title: 'Ayuda y Soporte', route: 'HelpSupport' },
    ];

    if (userRole === 'ADMIN') {
        menuItems.unshift({ icon: 'shield-checkmark-outline', title: 'Panel Administrador', route: 'AdminDashboard' });
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <BackgroundShapes />
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 120 : 100 }} showsVerticalScrollIndicator={false}>
                <View style={styles.profileHeader}>
                    <View style={styles.profilePicContainer}>
                        <View style={styles.profilePic}>
                            <Ionicons name="person" size={50} color={theme.colors.primary} />
                        </View>
                        <TouchableOpacity style={styles.editPicBtn}>
                            <Ionicons name="camera" size={18} color={theme.colors.white} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.profileName}>
                        {userRole === 'ADMIN' ? 'Administrador' : 'Invitado Especial'}
                    </Text>
                    <Text style={styles.profileTag}>
                        {userRole === 'ADMIN' ? 'Súper Usuario' : 'Miembro de la Comunidad'}
                    </Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statLabel}>Pedidos</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>5</Text>
                        <Text style={styles.statLabel}>Favoritos</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>Trujillo</Text>
                        <Text style={styles.statLabel}>Estado</Text>
                    </View>
                </View>

                <View style={styles.menuContainer}>
                    <Text style={styles.menuSectionTitle}>Mi Cuenta</Text>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.menuItem}
                            onPress={() => item.route && navigation.navigate(item.route)}
                        >
                            <View style={styles.menuIconContainer}>
                                <Ionicons name={item.icon} size={22} color={theme.colors.primary} />
                            </View>
                            <Text style={styles.menuText}>{item.title}</Text>
                            <Ionicons name="chevron-forward" size={18} color={theme.colors.textMuted} />
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.logoutBtn}
                    onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}
                >
                    <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                    <Text style={styles.logoutText}>Cerrar Sesión</Text>
                </TouchableOpacity>

                <View style={styles.footerInfo}>
                    <Text style={styles.versionText}>NexStore v1.0.2</Text>
                    <Text style={styles.copyrightText}>Hecho con ❤️ en Trujillo</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.colors.backgroundApp },
    container: { flex: 1 },
    profileHeader: { alignItems: 'center', paddingVertical: 40 },
    profilePicContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    profilePic: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: theme.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.medium,
        borderWidth: 4,
        borderColor: theme.colors.white,
    },
    editPicBtn: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: theme.colors.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: theme.colors.white,
    },
    profileName: { fontSize: 24, fontFamily: theme.fonts.bold, color: theme.colors.textMain, marginBottom: 4 },
    profileTag: { fontSize: 13, fontFamily: theme.fonts.medium, color: theme.colors.textMuted },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: theme.colors.white,
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
        ...theme.shadows.small,
        marginBottom: 30,
    },
    statBox: { flex: 1, alignItems: 'center' },
    statNumber: { fontSize: 18, fontFamily: theme.fonts.bold, color: theme.colors.primary },
    statLabel: { fontSize: 12, fontFamily: theme.fonts.regular, color: theme.colors.textMuted },
    statDivider: { width: 1, height: '100%', backgroundColor: 'rgba(0,0,0,0.05)' },
    menuContainer: { paddingHorizontal: 20 },
    menuSectionTitle: {
        fontSize: 16,
        fontFamily: theme.fonts.bold,
        color: theme.colors.textMain,
        marginBottom: 15,
        marginLeft: 4,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        padding: 18,
        borderRadius: 18,
        marginBottom: 12,
        ...theme.shadows.small,
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(42, 131, 107, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    menuText: { flex: 1, fontFamily: theme.fonts.semiBold, fontSize: 15, color: theme.colors.textMain },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 20,
        padding: 18,
        borderRadius: 18,
        backgroundColor: '#fef2f2',
        gap: 10,
        borderWidth: 1,
        borderColor: '#fee2e2',
    },
    logoutText: { color: '#ef4444', fontFamily: theme.fonts.bold, fontSize: 16 },
    footerInfo: { alignItems: 'center', paddingVertical: 40, opacity: 0.5 },
    versionText: { fontSize: 12, fontFamily: theme.fonts.medium, color: theme.colors.textMuted },
    copyrightText: { fontSize: 11, fontFamily: theme.fonts.regular, color: theme.colors.textMuted, marginTop: 4 }
});
