import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';

export default function InputField({
    label,
    icon,
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    onTogglePassword,
    containerStyle
}) {
    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={styles.label}>
                {icon && <Ionicons name={icon} size={14} color={theme.colors.textMuted} />}{' '}
                {label}
            </Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor="#9ca3af"
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    autoCapitalize="none"
                />
                {onTogglePassword && (
                    <TouchableOpacity onPress={onTogglePassword} style={styles.eyeIcon}>
                        <Ionicons
                            name={secureTextEntry ? "eye-off" : "eye"}
                            size={20}
                            color={theme.colors.textMuted}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        width: '100%',
    },
    label: {
        marginBottom: 8,
        fontSize: 14,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.textMuted,
    },
    inputContainer: {
        position: 'relative',
        justifyContent: 'center',
    },
    input: {
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.colors.border,
        fontSize: 15,
        fontFamily: theme.fonts.regular,
        backgroundColor: theme.colors.white,
        color: theme.colors.textMain,
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        padding: 5,
    }
});
