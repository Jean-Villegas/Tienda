import { Ionicons } from '@expo/vector-icons';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import BackgroundShapes from '../components/BackgroundShapes';
import { theme } from '../utils/theme';

export default function HelpSupportScreen({ navigation }) {

    const SupportItem = ({ icon, title, subtitle, onPress, color = theme.colors.primary }) => (
        <TouchableOpacity
            style={styles.supportItem}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={[styles.iconBox, { backgroundColor: `${color}15` }]}>
                <Ionicons name={icon} size={24} color={color} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>{title}</Text>
                <Text style={styles.itemSubtitle}>{subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textMuted} />
        </TouchableOpacity>
    );

    const FaqItem = ({ question }) => (
        <TouchableOpacity style={styles.faqItem} onPress={() => { }}>
            <Text style={styles.faqText}>{question}</Text>
            <Ionicons name="add" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <BackgroundShapes />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.textMain} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ayuda y Soporte</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <View style={styles.heroIconCircle}>
                        <Ionicons name="chatbubbles-outline" size={40} color={theme.colors.white} />
                    </View>
                    <Text style={styles.heroTitle}>¿Cómo podemos ayudarte?</Text>
                    <Text style={styles.heroSubtitle}>Estamos aquí para guiarte en cada paso de tu compra.</Text>
                </View>

                {/* Contact Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Canales de Atención</Text>
                    <View style={styles.card}>
                        <SupportItem
                            icon="logo-whatsapp"
                            title="Chat por WhatsApp"
                            subtitle="Soporte rápido en vivo"
                            onPress={() => { }}
                            color="#25D366"
                        />
                        <View style={styles.divider} />
                        <SupportItem
                            icon="mail-outline"
                            title="Correo Electrónico"
                            subtitle="soporte@nexstore.com"
                            onPress={() => { }}
                        />
                        <View style={styles.divider} />
                        <SupportItem
                            icon="call-outline"
                            title="Llamada Directa"
                            subtitle="Atención de Lunes a Sábado"
                            onPress={() => { }}
                        />
                    </View>
                </View>

                {/* FAQ Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Preguntas Frecuentes</Text>
                    <View style={styles.card}>
                        <FaqItem question="¿Cómo rastrear mi pedido?" />
                        <View style={styles.divider} />
                        <FaqItem question="¿Cuáles son los métodos de pago?" />
                        <View style={styles.divider} />
                        <FaqItem question="¿Cómo vender mis productos?" />
                        <View style={styles.divider} />
                        <FaqItem question="Zonas de entrega en Trujillo" />
                    </View>
                </View>

                {/* Help Guides */}
                <View style={styles.infoBox}>
                    <View style={styles.infoIcon}>
                        <Ionicons name="book-outline" size={20} color={theme.colors.primary} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.infoTitle}>Guía de Usuario</Text>
                        <Text style={styles.infoText}>Aprende a sacar el máximo provecho de NexStore con nuestros tutoriales rápidos.</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>NexStore Support • Trujillo, Venezuela</Text>
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
        fontSize: 18,
        fontFamily: theme.fonts.bold,
        color: theme.colors.textMain
    },
    scrollContent: { padding: 20, paddingBottom: 40 },
    heroSection: {
        alignItems: 'center',
        marginBottom: 35,
        marginTop: 10,
    },
    heroIconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        ...theme.shadows.medium,
    },
    heroTitle: {
        fontSize: 22,
        fontFamily: theme.fonts.bold,
        color: theme.colors.textMain,
        marginBottom: 8,
    },
    heroSubtitle: {
        fontSize: 14,
        fontFamily: theme.fonts.regular,
        color: theme.colors.textMuted,
        textAlign: 'center',
        paddingHorizontal: 30,
        lineHeight: 20,
    },
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
        padding: 5,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.8)',
        ...theme.shadows.small,
    },
    supportItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    textContainer: { flex: 1 },
    itemTitle: {
        fontSize: 15,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.textMain,
    },
    itemSubtitle: {
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
    faqItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 18,
    },
    faqText: {
        fontSize: 14,
        fontFamily: theme.fonts.medium,
        color: theme.colors.textMain,
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: 'rgba(27, 94, 79, 0.05)',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        gap: 15,
        borderWidth: 1,
        borderColor: 'rgba(27, 94, 79, 0.1)',
    },
    infoIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: theme.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.small,
    },
    infoTitle: {
        fontSize: 15,
        fontFamily: theme.fonts.bold,
        color: theme.colors.primary,
        marginBottom: 4,
    },
    infoText: {
        fontSize: 12,
        fontFamily: theme.fonts.regular,
        color: theme.colors.textMuted,
        lineHeight: 18,
    },
    footer: {
        alignItems: 'center',
        marginTop: 40,
        opacity: 0.5,
    },
    footerText: {
        fontSize: 11,
        fontFamily: theme.fonts.medium,
        color: theme.colors.textMuted,
    }
});
