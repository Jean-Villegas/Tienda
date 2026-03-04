export const theme = {
    colors: {
        primary: '#1B5E4F', // Verde más profundo
        primaryHover: '#136B69',
        primaryLight: '#9DCC9B',
        accent: '#3E8E62',
        backgroundApp: '#C8D9C2', // Tono ligeramente más oscuro y saturado que el anterior #D5E4CF
        backgroundCard: '#ffffff',
        textMain: '#012A36', // Texto un poco más oscuro
        textMuted: '#1E4D4A',
        glass: 'rgba(200, 217, 194, 0.7)',
        white: '#ffffff',
        border: '#cbd5e1', // Borde un poco más definido
    },
    fonts: {
        regular: 'Outfit_400Regular',
        medium: 'Outfit_500Medium',
        semiBold: 'Outfit_600SemiBold',
        bold: 'Outfit_700Bold',
    },
    sizes: {
        navHeight: 60,
        headerHeight: 60,
        borderRadius: 12,
        largeBorderRadius: 24,
    },
    shadows: {
        small: {
            shadowColor: '#024053',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 3,
            elevation: 3,
        },
        medium: {
            shadowColor: '#024053',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.12,
            shadowRadius: 10,
            elevation: 6,
        },
    },
};
