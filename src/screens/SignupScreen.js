import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';

export default function SignupScreen({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [usuario, setUsuario] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureText, setSecureText] = useState(true);

    const isNextDisabled =
        !nombre.trim() ||
        !apellido.trim() ||
        !usuario.trim() ||
        !municipio.trim() ||
        !password.trim() ||
        !confirmPassword.trim();

    const handleNext = () => {
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        if (password.length < 6) {
            alert('La contraseña es muy corta');
            return;
        }
        navigation.navigate('Verify');
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
                        <Text style={styles.title}>Crea tu Cuenta</Text>
                        <Text style={styles.subtitle}>Paso 1: Información Personal</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.row}>
                            <InputField
                                label="Nombre"
                                placeholder=""
                                value={nombre}
                                onChangeText={setNombre}
                                containerStyle={{ flex: 1, marginRight: 10 }}
                            />
                            <InputField
                                label="Apellido"
                                placeholder=""
                                value={apellido}
                                onChangeText={setApellido}
                                containerStyle={{ flex: 1 }}
                            />
                        </View>

                        <InputField
                            label="Usuario"
                            icon="at"
                            placeholder="Ej: jeanph12"
                            value={usuario}
                            onChangeText={setUsuario}
                        />

                        <InputField
                            label="Municipio"
                            icon="map"
                            placeholder="Tu municipio"
                            value={municipio}
                            onChangeText={setMunicipio}
                        />

                        <InputField
                            label="Contraseña"
                            icon="lock-closed"
                            placeholder="Mínimo 6 caracteres"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={secureText}
                            onTogglePassword={() => setSecureText(!secureText)}
                        />

                        <InputField
                            label="Confirmar Contraseña"
                            icon="shield-checkmark"
                            placeholder="Repite tu contraseña"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={true}
                            containerStyle={{ marginBottom: 30 }}
                        />

                        <PrimaryButton
                            title="Siguiente Paso "
                            icon={<Ionicons name="arrow-forward" size={20} color={theme.colors.white} />}
                            onPress={handleNext}
                            disabled={isNextDisabled}
                        />
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>¿Ya tienes una cuenta? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.linkText}>Inicia sesión</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.colors.white },
    container: { flexGrow: 1, paddingHorizontal: 30, paddingTop: 60, paddingBottom: 40, justifyContent: 'center' },
    header: { alignItems: 'center', marginBottom: 40 },
    logo: { fontSize: 28, fontFamily: theme.fonts.bold, color: theme.colors.textMain, marginBottom: 15 },
    logoAccent: { color: theme.colors.primary },
    title: { fontSize: 24, fontFamily: theme.fonts.bold, color: theme.colors.textMain, marginBottom: 8 },
    subtitle: { fontSize: 15, fontFamily: theme.fonts.regular, color: theme.colors.textMuted },
    formContainer: { width: '100%' },
    row: { flexDirection: 'row', width: '100%' },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
    footerText: { fontFamily: theme.fonts.regular, color: theme.colors.textMain },
    linkText: { fontFamily: theme.fonts.semiBold, color: theme.colors.primary, textDecorationLine: 'underline' }
});
