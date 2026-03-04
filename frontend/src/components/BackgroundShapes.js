import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../utils/theme';

const { width, height } = Dimensions.get('window');

const BackgroundShapes = () => {
    // Generar posiciones para un patrón de puntos sutil
    const dots = Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        top: Math.random() * height,
        left: Math.random() * width,
        size: Math.random() * 3 + 2,
    }));

    return (
        <View style={styles.container} pointerEvents="none">
            {/* Patrón de puntos decorativo */}
            {dots.map(dot => (
                <View
                    key={dot.id}
                    style={[
                        styles.dot,
                        { top: dot.top, left: dot.left, width: dot.size, height: dot.size }
                    ]}
                />
            ))}

            <View style={[styles.shape, styles.shape1]} />
            <View style={[styles.shape, styles.shape2]} />
            <View style={[styles.shape, styles.shape3]} />
            <View style={[styles.shape, styles.shape4]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
        zIndex: -1,
        backgroundColor: theme.colors.backgroundApp,
    },
    dot: {
        position: 'absolute',
        backgroundColor: 'rgba(27, 94, 79, 0.08)',
        borderRadius: 999,
    },
    shape: {
        position: 'absolute',
        borderRadius: 999,
        opacity: 0.1,
    },
    shape1: {
        width: width * 1.2,
        height: width * 1.2,
        backgroundColor: theme.colors.primary,
        top: -width * 0.4,
        right: -width * 0.4,
    },
    shape2: {
        width: width * 0.8,
        height: width * 0.8,
        backgroundColor: theme.colors.accent,
        bottom: height * 0.1,
        left: -width * 0.3,
    },
    shape3: {
        width: width * 1.5,
        height: width * 1.5,
        backgroundColor: theme.colors.primaryLight,
        bottom: -width * 0.6,
        right: -width * 0.5,
        opacity: 0.15,
    },
    shape4: {
        width: width * 0.5,
        height: width * 0.5,
        backgroundColor: theme.colors.primary,
        top: height * 0.25,
        left: width * 0.05,
        opacity: 0.06,
    }
});

export default BackgroundShapes;
