import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secureText, setSecureText] = useState(true);

    const handleLogin = () => {
        // Navigate to MainApp (placeholder)
        alert(`¡Bienvenido, ${username}!`);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.logo}>Nex<Text style={styles.logoAccent}>Store</Text></Text>
                        <Text style={styles.title}>Bienvenido de nuevo</Text>
                        <Text style={styles.subtitle}>Ingresa tus credenciales para continuar</Text>
                    </View>

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
                        />
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>¿No tienes una cuenta? </Text>
                        <TouchableOpacity onPress={() => { }}>
                            <Text style={styles.linkText}>Regístrate gratis</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.backButton} onPress={() => { }}>
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
        backgroundColor: theme.colors.white,
    },
    container: {
        flexGrow: 1,
        paddingHorizontal: 30,
        paddingTop: 60,
        paddingBottom: 40,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        fontSize: 28,
        fontFamily: theme.fonts.bold,
        color: theme.colors.textMain,
        marginBottom: 15,
    },
    logoAccent: {
        color: theme.colors.primary,
    },
    title: {
        fontSize: 24,
        fontFamily: theme.fonts.bold,
        color: theme.colors.textMain,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        fontFamily: theme.fonts.regular,
        color: theme.colors.textMuted,
    },
    formContainer: {
        width: '100%',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
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
        marginTop: 20,
        gap: 5,
    },
    backButtonText: {
        fontFamily: theme.fonts.medium,
        color: theme.colors.textMuted,
    }
});
