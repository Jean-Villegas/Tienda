import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../utils/theme';

export default function ProfileScreen({ navigation }) {
    // IMPORTANTE:
    // El rol real (incluyendo ADMIN) debe venir desde la base de datos / backend.
    // Aquí dejamos CLIENTE por defecto solo a nivel de UI, hasta conectar con la BD.
    const userRole = 'CLIENTE'; // 'CLIENTE' | 'EMPRENDEDOR' | 'ADMIN' (desde backend)

    const baseMenuItems = [
        { icon: 'storefront-outline', title: 'Panel Emprendedor', route: 'VendorDashboard' },
        { icon: 'cube-outline', title: 'Mis Pedidos', route: 'Orders' },
    ];

    const adminItems = userRole === 'ADMIN'
        ? [{ icon: 'shield-checkmark-outline', title: 'Panel Administrador', route: 'AdminDashboard' }]
        : [];

    const menuItems = [
        ...baseMenuItems,
        ...adminItems,
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.profileHeader}>
                    <View style={styles.profilePic}>
                        <Ionicons name="person" size={50} color={theme.colors.textMuted} />
                    </View>
                    <Text style={styles.profileName}>
                        {userRole === 'ADMIN' ? 'Administrador' : 'Invitado'}
                    </Text>
                    <Text style={styles.profileEmail}>
                        {userRole === 'ADMIN'
                            ? 'correo-admin-desde-bd@ejemplo.com'
                            : 'bienvenido@ejemplo.com'}
                    </Text>
                </View>

                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.menuItem} onPress={() => {
                            if (item.route === 'VendorDashboard') {
                                navigation.navigate('VendorDashboard');
                            } else if (item.route === 'Orders') {
                                navigation.navigate('Orders');
                            } else if (item.route === 'AdminDashboard') {
                                navigation.navigate('AdminDashboard');
                            }
                        }}>
                            <View style={styles.menuIconContainer}>
                                <Ionicons name={item.icon} size={22} color={theme.colors.primary} />
                            </View>
                            <Text style={styles.menuText}>{item.title}</Text>
                            <Ionicons name="chevron-forward" size={20} color={theme.colors.textMuted} />
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}>
                    <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                    <Text style={styles.logoutText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.colors.backgroundApp },
    container: { flex: 1 },
    profileHeader: { alignItems: 'center', paddingVertical: 40, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
    profilePic: { width: 100, height: 100, borderRadius: 50, backgroundColor: theme.colors.white, justifyContent: 'center', alignItems: 'center', marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 4 }, elevation: 4 },
    profileName: { fontSize: 22, fontFamily: theme.fonts.bold, color: theme.colors.textMain },
    profileEmail: { fontSize: 14, fontFamily: theme.fonts.regular, color: theme.colors.textMuted },
    menuContainer: { padding: 20 },
    menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.white, padding: 15, borderRadius: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
    menuIconContainer: { width: 40, alignItems: 'center' },
    menuText: { flex: 1, fontFamily: theme.fonts.medium, fontSize: 16, color: theme.colors.textMain },
    logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 20, marginTop: 10, padding: 15, borderRadius: 16, backgroundColor: '#fef2f2', gap: 10 },
    logoutText: { color: '#ef4444', fontFamily: theme.fonts.semiBold, fontSize: 16 }
});
