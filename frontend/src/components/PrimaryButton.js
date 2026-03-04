import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../utils/theme';

export default function PrimaryButton({
    title,
    onPress,
    style,
    textStyle,
    icon,
    disabled = false,
}) {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.buttonDisabled, style]}
            onPress={disabled ? undefined : onPress}
            activeOpacity={0.8}
            disabled={disabled}
        >
            <Text style={[styles.text, disabled && styles.textDisabled, textStyle]}>{title}</Text>
            {icon}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        width: '100%',
    },
    text: {
        color: theme.colors.white,
        fontSize: 18,
        fontFamily: theme.fonts.semiBold,
    },
    buttonDisabled: {
        backgroundColor: theme.colors.border,
    },
    textDisabled: {
        color: theme.colors.textMuted,
    },
});
