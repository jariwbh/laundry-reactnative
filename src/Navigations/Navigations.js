// import React, { Component } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import LoginScreen from '../Screen/LoginScreen/LoginScreen';
// import RegisterScreen from '../Screen/RegisterScreen/RegisterScreen';
// import ForgotPasswordScreen from "../Screen/ForgotPasswordScreen/ForgotPasswordScreen";
// import VerificatioScreen from "../Screen/VerificatioScreen/VerificatioScreen"
// import HomeScreen from "../Screen/HomeScreen/HomeScreen";
// import ServiceDetailsScreen from "../Screen/ServiceDetailsScreen/ServiceDetailsScreen"
// import BookScreen from "../Screen/BookScreen/BookScreen"
// import BookConfirmScreen from "../Screen/BookConfirmScreen/BookConfirmScreen"
// //import HistoryScreen from "../Screen/HistoryScreen/HistoryScreen";
// import MyProfileScreen from '../Screen/MyProfileScreen/MyProfileScreen';
// import UpdateProfileScreen from '../Screen/MyProfileScreen/UpdateProfileScreen'



// const Stack = createStackNavigator();

// export default class NavigationsApp extends Component {
//     render() {
//         return (
//             <NavigationContainer>
//                 <Stack.Navigator headerMode='none' initialRouteName="LoginScreen">
//                     <Stack.Screen name="LoginScreen" component={LoginScreen} />
//                     <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
//                     <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
//                     <Stack.Screen name="VerificatioScreen" component={VerificatioScreen} />
//                     <Stack.Screen name="HomeScreen" component={HomeScreen} />
//                     <Stack.Screen name="ServiceDetailsScreen" component={ServiceDetailsScreen} />
//                     <Stack.Screen name="BookScreen" component={BookScreen} />
//                     <Stack.Screen name="BookConfirmScreen" component={BookConfirmScreen} />
//                     {/* <Stack.Screen name="HistoryScreen" component={HistoryScreen} /> */}
//                     <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} />
//                     <Stack.Screen name="UpdateProfileScreen" component={UpdateProfileScreen} />

//                 </Stack.Navigator>
//             </NavigationContainer>
//         )
//     }
// }

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import LoginScreen from '../Screen/LoginScreen/LoginScreen';
import RegisterScreen from '../Screen/RegisterScreen/RegisterScreen';
import VerificatioScreen from "../Screen/VerificatioScreen/VerificatioScreen"
//import ForgotPasswordScreen from "../Screen/ForgotPasswordScreen/ForgotPasswordScreen";

const Stack = createStackNavigator();

export default NavigationsApp = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode='none' initialRouteName='LoginScreen'>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> */}
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="VerificatioScreen" component={VerificatioScreen} />
                <Stack.Screen name="TabNavigation" component={TabNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};