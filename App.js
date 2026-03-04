import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import {
    Outfit_300Light,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold
} from '@expo-google-fonts/outfit';

import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import VerifyScreen from './src/screens/VerifyScreen';
import MainAppNavigator from './src/navigation/MainAppNavigator';
import VendorDashboardScreen from './src/screens/VendorDashboardScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
<<<<<<< HEAD
import AdminDashboardScreen from './src/screens/AdminDashboardScreen';
=======
>>>>>>> 8d8bd5bf1d43fb7e6d77f4ac42fd508bce6bb573

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
<<<<<<< HEAD
                <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
=======
>>>>>>> 8d8bd5bf1d43fb7e6d77f4ac42fd508bce6bb573
                <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
