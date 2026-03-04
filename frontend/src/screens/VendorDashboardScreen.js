import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';

export default function VendorDashboardScreen({ navigation }) {
    const [titulo, setTitulo] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleSubmit = () => {
        alert('¡Felicidades! Tu anuncio ha sido enviado a revisión por el administrador.');
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
                    <View style={styles.header}>
                        <Text style={styles.logo}>Nex<Text style={{ color: theme.colors.white }}>Seller</Text></Text>
                        <Text style={styles.title}>Panel de Control</Text>
                        <Text style={styles.subtitle}>Hola, Emprendedor. Publica tus productos aquí.</Text>
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.sectionTitle}>Crear Nuevo Anuncio</Text>

                        <TouchableOpacity style={styles.uploadArea}>
                            <Ionicons name="cloud-upload-outline" size={40} color={theme.colors.textMuted} />
                            <Text style={styles.uploadText}>Toca para subir fotos del producto</Text>
                        </TouchableOpacity>

                        <InputField
                            label="Título del Producto"
                            placeholder="Ej: Pizza Artesanal"
                            value={titulo}
                            onChangeText={setTitulo}
                        />

                        <View style={styles.row}>
                            <InputField
                                label="Precio ($)"
                                placeholder="0.00"
                                value={precio}
                                onChangeText={setPrecio}
                                containerStyle={{ flex: 1, marginRight: 10 }}
                            />
                            <InputField
                                label="Categoría"
                                placeholder="Selecciona"
                                containerStyle={{ flex: 1 }}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Descripción</Text>
                            <TextInput
                                style={styles.textArea}
                                multiline
                                numberOfLines={4}
                                placeholder="Describe tu producto..."
                                placeholderTextColor="#9ca3af"
                                value={descripcion}
                                onChangeText={setDescripcion}
                                textAlignVertical="top"
                            />
                        </View>

                        <PrimaryButton
                            title="Publicar Anuncio "
                            icon={<Ionicons name="rocket-outline" size={20} color={theme.colors.white} />}
                            onPress={handleSubmit}
                            style={{ marginTop: 10 }}
                        />

                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <Text style={styles.backButtonText}>Volver a la Tienda</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: theme.colors.backgroundApp },
    container: { flex: 1 },
    header: { backgroundColor: theme.colors.textMain, padding: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, alignItems: 'center' },
    logo: { fontSize: 24, fontFamily: theme.fonts.bold, color: theme.colors.primary, marginBottom: 15 },
    title: { fontSize: 24, fontFamily: theme.fonts.bold, color: theme.colors.white, marginBottom: 5 },
    subtitle: { fontSize: 14, fontFamily: theme.fonts.regular, color: 'rgba(255,255,255,0.7)' },
    content: { padding: 20 },
    sectionTitle: { fontSize: 18, fontFamily: theme.fonts.bold, color: theme.colors.textMain, marginBottom: 20 },
    uploadArea: { borderWidth: 2, borderColor: theme.colors.primaryLight, borderStyle: 'dashed', borderRadius: 15, padding: 30, alignItems: 'center', marginBottom: 20, backgroundColor: 'rgba(157,204,155,0.1)' },
    uploadText: { fontFamily: theme.fonts.medium, color: theme.colors.textMuted, marginTop: 10 },
    row: { flexDirection: 'row', width: '100%' },
    formGroup: { marginBottom: 20 },
    label: { marginBottom: 8, fontSize: 14, fontFamily: theme.fonts.semiBold, color: theme.colors.textMuted },
    textArea: { backgroundColor: theme.colors.white, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border, padding: 15, fontFamily: theme.fonts.regular, fontSize: 15, color: theme.colors.textMain, minHeight: 100 },
    backButton: { borderWidth: 1, borderColor: theme.colors.border, borderRadius: 16, padding: 16, alignItems: 'center', marginTop: 15 },
    backButtonText: { fontFamily: theme.fonts.semiBold, color: theme.colors.textMuted, fontSize: 16 }
});
