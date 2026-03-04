import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackgroundShapes from '../components/BackgroundShapes';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { apiLogin } from '../services/api';
import { theme } from '../utils/theme';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secureText, setSecureText] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isLoginDisabled = !username.trim() || !password.trim();

    const simpleHash = (text) => {
        // Debe coincidir con el "hash" usado en el registro (solo demo)
        return `local_${text.split('').reverse().join('')}`;
    };

    const handleLogin = async () => {
        if (isLoginDisabled) return;

        try {
            setIsSubmitting(true);
            const passwordHash = simpleHash(password);
            await apiLogin({ usuario: username.trim(), passwordHash });
            navigation.replace('MainApp');
        } catch (error) {
            console.error(error);
            alert('Usuario o contraseña incorrectos.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <BackgroundShapes />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.logoIconContainer}>
                            <Ionicons name="cart" size={32} color={theme.colors.primary} />
                        </View>
                        <Text style={styles.logo}>Nex<Text style={styles.logoAccent}>Store</Text></Text>
                        <Text style={styles.title}>¡Qué bueno verte!</Text>
                        <Text style={styles.subtitle}>Encuentra lo que buscas con estilo</Text>
                    </View>

                    <View style={styles.cardContainer}>
                        <View style={styles.formContainer}>
                            <InputField
                                label="Usuario"
                                icon="at"
                                placeholder="Tu usuario"
                                value={username}
                                onChangeText={setUsername}
                            />

                            <InputField
                                label="Contraseña"
                                icon="lock-closed"
                                placeholder="Tu contraseña"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={secureText}
                                onTogglePassword={() => setSecureText(!secureText)}
                                containerStyle={{ marginBottom: 30 }}
                            />

                            <PrimaryButton
                                title="Iniciar Sesión "
                                icon={<Ionicons name="log-in-outline" size={20} color={theme.colors.white} />}
                                onPress={handleLogin}
                                disabled={isLoginDisabled || isSubmitting}
                            />
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>¿No tienes una cuenta? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text style={styles.linkText}>Regístrate gratis</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.replace('MainApp')}
                    >
                        <Ionicons name="arrow-back" size={16} color={theme.colors.textMuted} />
                        <Text style={styles.backButtonText}> Volver a la tienda</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.backgroundApp,
    },
    container: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 40,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 35,
    },
    logoIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 20,
        backgroundColor: theme.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        ...theme.shadows.medium,
    },
    logo: {
        fontSize: 32,
        fontFamily: theme.fonts.bold,
        color: theme.colors.textMain,
        marginBottom: 8,
    },
    logoAccent: {
        color: theme.colors.primary,
    },
    title: {
        fontSize: 24,
        fontFamily: theme.fonts.bold,
        color: theme.colors.textMain,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 15,
        fontFamily: theme.fonts.regular,
        color: theme.colors.textMuted,
        textAlign: 'center',
    },
    cardContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 24,
        padding: 24,
        ...theme.shadows.medium,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    formContainer: {
        width: '100%',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 35,
    },
    footerText: {
        fontFamily: theme.fonts.regular,
        color: theme.colors.textMain,
    },
    linkText: {
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.primary,
        textDecorationLine: 'underline',
    },
    backButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        gap: 5,
    },
    backButtonText: {
        fontFamily: theme.fonts.medium,
        color: theme.colors.textMuted,
    }
});
