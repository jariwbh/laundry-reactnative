import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import LoginScreen from '../Screen/LoginScreen/LoginScreen';
import RegisterScreen from '../Screen/RegisterScreen/RegisterScreen';
import VerificatioScreen from "../Screen/VerificatioScreen/VerificatioScreen"
import AsyncStorage from '@react-native-community/async-storage';


const Stack = createStackNavigator();

export default NavigationsApp = () => {
    const [authUser, setauthUser] = useState(false);

    useEffect(() => {
        async function fetchMyAPI() {
            var getUser = await AsyncStorage.getItem('@authuserlaundry')
            console.log('getUser', getUser)
            if (getUser != null) {
                setauthUser(true);
            }
        }
        fetchMyAPI();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator headerMode='none' initialRouteName='LoginScreen'>
                {authUser == false ?
                    <>
                        <Stack.Screen name="LoginScreen" component={LoginScreen} />
                        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                        <Stack.Screen name="VerificatioScreen" component={VerificatioScreen} />
                    </>
                    :
                    <Stack.Screen name="TabNavigation" component={TabNavigation} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
};

//import ForgotPasswordScreen from "../Screen/ForgotPasswordScreen/ForgotPasswordScreen";
/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> */
