import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { theme } from '../utils/theme';

import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

export default function MainAppNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                animation: 'fade', // Agrega una transición suave de desvanecimiento entre pantallas
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
                    else if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline';
                    else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
                    else if (route.name === 'Cart') iconName = focused ? 'cart' : 'cart-outline';
                    else if (route.name === 'Orders') iconName = focused ? 'cube' : 'cube-outline';

                    return (
                        <Ionicons
                            name={iconName}
                            size={focused ? size + 2 : size}
                            color={color}
                        />
                    );
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textMuted,
                tabBarLabelStyle: {
                    fontFamily: theme.fonts.medium,
                    fontSize: 11,
                    marginBottom: Platform.OS === 'ios' ? 0 : 8,
                },
                tabBarStyle: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderTopWidth: 1,
                    borderTopColor: 'rgba(0,0,0,0.05)',
                    height: Platform.OS === 'ios' ? 85 : 70,
                    paddingTop: 10,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 15,
                    shadowColor: theme.colors.primary,
                    shadowOpacity: 0.1,
                    shadowOffset: { width: 0, height: -4 },
                    shadowRadius: 10,
                }
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Inicio' }} />
            <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarLabel: 'Buscar' }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Perfil' }} />
            <Tab.Screen name="Cart" component={CartScreen} options={{ tabBarLabel: 'Carrito' }} />
            <Tab.Screen name="Orders" component={OrdersScreen} options={{ tabBarLabel: 'Pedidos' }} />
        </Tab.Navigator>
    );
}
