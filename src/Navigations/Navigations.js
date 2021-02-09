import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import LoginScreen from '../Screen/LoginScreen/LoginScreen';
import RegisterScreen from '../Screen/RegisterScreen/RegisterScreen';
import SplashScreen from '../Screen/SplashScreen/splashScreen';
import SearchMapScreen from '../Screen/MapScreen/SearchMapScreen';
import MapScreen from '../Screen/MapScreen/MapScreen';
const Stack = createStackNavigator();

export default NavigationsApp = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode='none' initialRouteName='SplashScreen'>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="TabNavigation" component={TabNavigation} />
                <Stack.Screen name="MapScreen" component={MapScreen} />
                <Stack.Screen name="SearchMapScreen" component={SearchMapScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

//import ForgotPasswordScreen from "../Screen/ForgotPasswordScreen/ForgotPasswordScreen";
/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> */
