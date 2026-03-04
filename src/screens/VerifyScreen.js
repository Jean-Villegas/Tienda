import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { apiActualizarVerificacionUsuario } from '../services/api';
import { theme } from '../utils/theme';

export default function VerifyScreen({ navigation, route }) {
    const [cedula, setCedula] = useState('');
    const [telefono, setTelefono] = useState('');
    const [otp, setOtp] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const usuarioId = route?.params?.usuarioId;

    const handleVerifyPhone = () => {
        if (telefono.length >= 10) {
            setCodeSent(true);
            alert('Código enviado al ' + telefono);
        } else {
            alert('Ingresa un número válido');
        }
    };

    const handleComplete = async () => {
        if (!usuarioId) {
            alert('No se encontró el usuario a verificar.');
            return;
        }

        try {
            setIsSubmitting(true);
            await apiActualizarVerificacionUsuario({ usuarioId, cedula, telefono });

            alert('¡Verificación exitosa! Bienvenido a NexStore.');
            navigation.reset({
                index: 0,
                routes: [{ name: 'MainApp' }],
            });
        } catch (error) {
            console.error(error);
            alert('Ocurrió un error al guardar tu verificación. Intenta de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isCompleteDisabled =
        !cedula.trim() ||
        !telefono.trim() ||
        telefono.length < 10 ||
        !codeSent ||
        otp.length !== 4;
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
                        <Text style={styles.subtitle}>Paso 2: Verifica tus datos para poder comprar</Text>
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

                        <Text style={styles.helperText}>
                            Usamos tu cédula y teléfono para darle más seguridad a tus compras y evitar fraudes.
                        </Text>
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
                            disabled={isCompleteDisabled || isSubmitting}
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
    ,
    helperText: {
        marginBottom: 20,
        fontSize: 12,
        fontFamily: theme.fonts.regular,
        color: theme.colors.textMuted,
    }
});
