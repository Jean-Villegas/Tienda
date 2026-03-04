import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import BackgroundShapes from '../components/BackgroundShapes';
import { theme } from '../utils/theme';

export default function SettingsScreen({ navigation }) {
    const [notifications, setNotifications] = useState(true);
    const [emailUpdates, setEmailUpdates] = useState(false);
    const [faceId, setFaceId] = useState(true);

    const SettingItem = ({ icon, title, subtitle, type, value, onToggle, onPress, color = theme.colors.primary }) => (
        <TouchableOpacity
            style={styles.settingItem}
            onPress={onPress}
            disabled={type === 'switch' || !onPress}
        >
            <View style={[styles.iconBox, { backgroundColor: `${color}15` }]}>
                <Ionicons name={icon} size={22} color={color} />
            </View>
            <View style={styles.settingTextContent}>
                <Text style={styles.settingTitle}>{title}</Text>
                {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
            </View>
            {type === 'switch' ? (
                <Switch
                    value={value}
                    onValueChange={onToggle}
                    trackColor={{ false: '#cbd5e1', true: theme.colors.primaryLight }}
                    thumbColor={value ? theme.colors.primary : '#f4f3f4'}
                />
            ) : onPress ? (
                <Ionicons name="chevron-forward" size={20} color={theme.colors.textMuted} />
            ) : null}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <BackgroundShapes />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.textMain} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Configuración</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Notificaciones</Text>
                    <View style={styles.card}>
                        <SettingItem
                            icon="notifications-outline"
                            title="Notificaciones Push"
                            subtitle="Recibe alertas de tus pedidos"
                            type="switch"
                            value={notifications}
                            onToggle={setNotifications}
                        />
                        <View style={styles.divider} />
                        <SettingItem
                            icon="mail-outline"
                            title="Boletín por Email"
                            subtitle="Ofertas y novedades locales"
                            type="switch"
                            value={emailUpdates}
                            onToggle={setEmailUpdates}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Seguridad y Privacidad</Text>
                    <View style={styles.card}>
                        <SettingItem
                            icon="finger-print-outline"
                            title="Face ID / Huella digital"
                            subtitle="Para un acceso más rápido"
                            type="switch"
                            value={faceId}
                            onToggle={setFaceId}
                        />
                        <View style={styles.divider} />
                        <SettingItem
                            icon="lock-closed-outline"
                            title="Cambiar Contraseña"
                            onPress={() => { }}
                        />
                        <View style={styles.divider} />
                        <SettingItem
                            icon="eye-off-outline"
                            title="Privacidad de Datos"
                            onPress={() => { }}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Otros</Text>
                    <View style={styles.card}>
                        <SettingItem
                            icon="globe-outline"
                            title="Idioma"
                            subtitle="Español (Venezuela)"
                        />
                        <View style={styles.divider} />
                        <SettingItem
                            icon="information-circle-outline"
                            title="Acerca de NexStore"
                            onPress={() => { }}
                        />
                        <View style={styles.divider} />
                        <SettingItem
                            icon="document-text-outline"
                            title="Términos y Condiciones"
                            onPress={() => { }}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.deleteAccountBtn}>
                    <Text style={styles.deleteAccountText}>Eliminar cuenta</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerVersion}>NexStore App v1.0.2</Text>
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
    headerTitle: {
        fontSize: 20,
        fontFamily: theme.fonts.bold,
        color: theme.colors.textMain
    },
    scrollContent: { padding: 20, paddingBottom: 40 },
    section: { marginBottom: 30 },
    sectionHeader: {
        fontSize: 16,
        fontFamily: theme.fonts.bold,
        color: theme.colors.textMain,
        marginBottom: 15,
        marginLeft: 5
    },
    card: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 24,
        padding: 8,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.8)',
        ...theme.shadows.small,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    settingTextContent: { flex: 1 },
    settingTitle: {
        fontSize: 15,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.textMain,
    },
    settingSubtitle: {
        fontSize: 12,
        fontFamily: theme.fonts.regular,
        color: theme.colors.textMuted,
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.03)',
        marginHorizontal: 15,
    },
    deleteAccountBtn: {
        marginTop: 10,
        padding: 18,
        alignItems: 'center',
    },
    deleteAccountText: {
        color: '#ef4444',
        fontFamily: theme.fonts.bold,
        fontSize: 15,
    },
    footer: {
        alignItems: 'center',
        marginTop: 20,
        opacity: 0.5,
    },
    footerVersion: {
        fontSize: 12,
        fontFamily: theme.fonts.medium,
        color: theme.colors.textMuted,
    }
});
