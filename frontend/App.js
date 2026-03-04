import {
    Outfit_300Light,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold
} from '@expo-google-fonts/outfit';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';

import MainAppNavigator from './src/navigation/MainAppNavigator';
import AdminDashboardScreen from './src/screens/AdminDashboardScreen';
import HelpSupportScreen from './src/screens/HelpSupportScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SignupScreen from './src/screens/SignupScreen';
import VendorDashboardScreen from './src/screens/VendorDashboardScreen';
import VerifyScreen from './src/screens/VerifyScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                Outfit_300Light,
                Outfit_400Regular,
                Outfit_500Medium,
                Outfit_600SemiBold,
                Outfit_700Bold,
            });
            setFontsLoaded(true);
        }
        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Verify" component={VerifyScreen} />
                <Stack.Screen name="MainApp" component={MainAppNavigator} />
                <Stack.Screen name="VendorDashboard" component={VendorDashboardScreen} />
                <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
                <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
