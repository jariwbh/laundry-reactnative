import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Foundation from 'react-native-vector-icons/Foundation'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
//-------HomeStackScreen
import HomeScreen from "../Screen/HomeScreen/HomeScreen";
import ServiceDetailsScreen from "../Screen/ServiceDetailsScreen/ServiceDetailsScreen"
import BookScreen from "../Screen/BookScreen/BookScreen"
import BookConfirmScreen from "../Screen/BookConfirmScreen/BookConfirmScreen"
import HistoryScreen from "../Screen/HistoryScreen/HistoryScreen";
//-------ProfileStackScreen
import MyProfileScreen from '../Screen/MyProfileScreen/MyProfileScreen';
import ViewProfileScreen from '../Screen/MyProfileScreen/ViewProfileScreen';
import UpdateProfileScreen from '../Screen/MyProfileScreen/UpdateProfileScreen'
import BackButton from '../Components/BackButton/BackButton';
import SupportScreen from '../Screen/SupportScreen/SupportScreen';
import TermsAndConditionScreen from '../Screen/TermsAndConditionScreen/TermsAndConditionScreen';

const ProfileStack = createStackNavigator();
function ProfileStackScreen({ navigation }) {
    return (
        <ProfileStack.Navigator initialRouteName="MyProfileScreen" headerMode='screen'>
            <ProfileStack.Screen name="MyProfileScreen"
                options={{
                    title: 'Our Services',
                    headerShown: false
                }}
                component={MyProfileScreen} />
            <ProfileStack.Screen name="ViewProfileScreen" options={{
                title: 'Profile', headerStyle: {
                    backgroundColor: '#FFFFFF',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }, headerLeft: () => <BackButton onPress={() => navigation.navigate("MyProfileScreen")} />,
                headerTintColor: '#000000',
                headerTitleAlign: 'center'
            }} component={ViewProfileScreen} />
            <ProfileStack.Screen name="UpdateProfileScreen" options={{
                title: 'Profile', headerStyle: {
                    backgroundColor: '#FFFFFF',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }, headerLeft: () => <BackButton onPress={() => navigation.navigate("MyProfileScreen")} />,
                headerTintColor: '#000000',
                headerTitleAlign: 'center'
            }} component={UpdateProfileScreen} />
            <ProfileStack.Screen name="SupportScreen" options={{
                title: 'Support', headerStyle: {
                    backgroundColor: '#FFFFFF',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }, headerLeft: () => <BackButton onPress={() => navigation.navigate("MyProfileScreen")} />,
                headerTintColor: '#000000',
                headerTitleAlign: 'center'
            }} component={SupportScreen} />
            <ProfileStack.Screen name="TermsAndConditionScreen" options={{
                title: 'Terms & Condition', headerStyle: {
                    backgroundColor: '#FFFFFF',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }, headerLeft: () => <BackButton onPress={() => navigation.navigate("MyProfileScreen")} />,
                headerTintColor: '#000000',
                headerTitleAlign: 'center'
            }} component={TermsAndConditionScreen} />
        </ProfileStack.Navigator>
    );
}

const HomeStack = createStackNavigator();
function HomeStackScreen({ navigation }) {
    return (
        <HomeStack.Navigator initialRouteName="HomeScreen" headerMode='screen'>
            <HomeStack.Screen name="HomeScreen" options={{
                title: 'Our Services', headerStyle: {
                    backgroundColor: '#FFFFFF',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }, headerLeft: () => { },
            }}
                component={HomeScreen} />
            <HomeStack.Screen name="ServiceDetailsScreen"
                options={{
                    title: '',
                    headerShown: false
                }}
                component={ServiceDetailsScreen} />
            <HomeStack.Screen name="BookScreen" options={{
                title: 'Washing', headerStyle: {
                    backgroundColor: '#FFFFFF',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }, headerLeft: () => <BackButton onPress={() => navigation.navigate("ServiceDetailsScreen")} />,
            }} component={BookScreen} />
            <HomeStack.Screen name="BookConfirmScreen"
                options={{
                    title: '',
                    headerShown: false
                }}
                component={BookConfirmScreen} />
            <HomeStack.Screen name="HistoryScreen" options={{
                title: 'History', headerStyle: {
                    backgroundColor: '#FFFFFF',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                }, headerLeft: () => <BackButton onPress={() => navigation.navigate("HomeScreen")} />,
            }} component={HistoryScreen} />
        </HomeStack.Navigator>
    );
}

const HistoryStack = createStackNavigator();
function HistoryStackScreen({ navigation }) {
    return (
        <HistoryStack.Navigator initialRouteName="HistoryScreen" headerMode='screen'>
            <HistoryStack.Screen name="HistoryScreen"
                options={{
                    title: 'History', headerStyle: {
                        backgroundColor: '#FFFFFF',
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    }, headerLeft: () => <BackButton onPress={() => navigation.navigate("HomeScreen")} />,
                }}
                component={HistoryScreen} />
        </HistoryStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
    return (
        <Tab.Navigator initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Home') {
                        return (
                            <Foundation
                                name={focused ? 'home' : 'home'}
                                size={20}
                                color={color}
                            />
                        );
                    } else if (route.name === 'Book') {
                        return (
                            <MaterialIcons
                                name={focused ? 'book' : 'book'}
                                size={20}
                                color={color}
                            />
                        );
                    } else if (route.name === 'History') {
                        return (
                            <Entypo
                                name={focused ? 'stopwatch' : 'stopwatch'}
                                size={20}
                                color={color}
                            />
                        );
                    }
                    else if (route.name === 'Profile') {
                        return (
                            <FontAwesome5
                                name={focused ? 'user' : 'user'}
                                size={20}
                                color={color}
                            />
                        );
                    }
                },
            })}
            tabBarOptions={{
                style: {
                    backgroundColor: '#FFFFFF',
                    borderTopRightRadius: 21,
                    borderTopLeftRadius: 21,
                    position: 'absolute',
                },
                activeTintColor: '#00C464',
                inactiveTintColor: '#808B96',
                keyboardHidesTabBar: true,
                backBehavior: "history",
                showLabel: false
            }}
        >
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="History" component={HistoryStackScreen} />
            <Tab.Screen name="Profile" component={ProfileStackScreen} />
        </Tab.Navigator>
    );
}