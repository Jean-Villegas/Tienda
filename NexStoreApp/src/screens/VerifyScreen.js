import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';

export default function VerifyScreen({ navigation }) {
    const [cedula, setCedula] = useState('');
    const [telefono, setTelefono] = useState('');
    const [otp, setOtp] = useState('');
    const [codeSent, setCodeSent] = useState(false);

    const handleVerifyPhone = () => {
        if (telefono.length >= 10) {
            setCodeSent(true);
            alert('Código enviado al ' + telefono);
        } else {
            alert('Ingresa un número válido');
        }
    };

    const handleComplete = () => {
        alert('¡Verificación exitosa! Bienvenido a NexStore.');
        // Navigate to MainApp (placeholder)
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
                        <Text style={styles.title}>Verificación</Text>
                        <Text style={styles.subtitle}>Paso 2: Datos de Identificación</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <InputField
                            label="Cédula"
                            icon="card"
                            placeholder="12345678"
                            value={cedula}
                            onChangeText={setCedula}
                        />

                        <View style={styles.phoneGroup}>
                            <Text style={styles.label}>
                                <Ionicons name="call" size={14} color={theme.colors.textMuted} /> Teléfono
                            </Text>
                            <View style={styles.phoneInputContainer}>
                                <TextInput
                                    style={styles.phoneInput}
                                    placeholder="04121234567"
                                    placeholderTextColor="#9ca3af"
                                    value={telefono}
                                    onChangeText={setTelefono}
                                    keyboardType="phone-pad"
                                />
                                <TouchableOpacity
                                    style={[styles.verifyButton, codeSent && { backgroundColor: theme.colors.primary }]}
                                    onPress={handleVerifyPhone}
                                >
                                    {codeSent ? (
                                        <Ionicons name="checkmark" size={20} color={theme.colors.white} />
                                    ) : (
                                        <Text style={styles.verifyButtonText}>Verificar</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>

                        {codeSent && (
                            <View style={styles.otpGroup}>
                                <Text style={styles.label}>Código de Verificación</Text>
                                <TextInput
                                    style={styles.otpInput}
                                    placeholder="0 0 0 0"
                                    maxLength={4}
                                    value={otp}
                                    onChangeText={setOtp}
                                    keyboardType="number-pad"
                                />
                            </View>
                        )}

                        <PrimaryButton
                            title="Completar Registro "
                            icon={<Ionicons name="checkmark-circle" size={20} color={theme.colors.white} />}
                            onPress={handleComplete}
                            style={{ marginTop: 20 }}
                        />
                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={16} color={theme.colors.textMain} />
                            <Text style={styles.footerText}>Volver al paso anterior</Text>
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
    label: { marginBottom: 8, fontSize: 14, fontFamily: theme.fonts.semiBold, color: theme.colors.textMuted },
    phoneGroup: { marginBottom: 20 },
    phoneInputContainer: { flexDirection: 'row', gap: 10 },
    phoneInput: { flex: 1, paddingVertical: 14, paddingHorizontal: 18, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border, fontFamily: theme.fonts.regular, fontSize: 15 },
    verifyButton: { backgroundColor: theme.colors.primary, paddingHorizontal: 15, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    verifyButtonText: { color: theme.colors.white, fontFamily: theme.fonts.semiBold },
    otpGroup: { marginBottom: 20 },
    otpInput: { paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border, fontFamily: theme.fonts.bold, fontSize: 24, textAlign: 'center', letterSpacing: 15 },
    footer: { alignItems: 'center', marginTop: 30 },
    backButton: { flexDirection: 'row', gap: 5, alignItems: 'center' },
    footerText: { fontFamily: theme.fonts.regular, color: theme.colors.textMain, textDecorationLine: 'underline' }
});
