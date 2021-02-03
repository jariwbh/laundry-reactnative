import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
//-------HomeStackScreen
import HomeScreen from "../Screen/HomeScreen/HomeScreen";
import ServiceDetailsScreen from "../Screen/ServiceDetailsScreen/ServiceDetailsScreen"
import BookScreen from "../Screen/BookScreen/BookScreen"
import BookConfirmScreen from "../Screen/BookConfirmScreen/BookConfirmScreen"
import HistoryScreen from "../Screen/HistoryScreen/HistoryScreen";
//-------ProfileStackScreen
import MyProfileScreen from '../Screen/MyProfileScreen/MyProfileScreen';
import UpdateProfileScreen from '../Screen/MyProfileScreen/UpdateProfileScreen'

const ProfileStack = createStackNavigator();
function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator initialRouteName="MyProfile" headerMode='none'>
            <ProfileStack.Screen name="MyProfileScreen" component={MyProfileScreen} />
            <ProfileStack.Screen name="UpdateProfileScreen" component={UpdateProfileScreen} />
        </ProfileStack.Navigator>
    );
}
const HomeStack = createStackNavigator();
function HomeStackScreen() {
    return (
        <HomeStack.Navigator initialRouteName="HomeScreen" headerMode='none'>
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
            <HomeStack.Screen name="ServiceDetailsScreen" component={ServiceDetailsScreen} />
            <HomeStack.Screen name="BookScreen" component={BookScreen} />
            <HomeStack.Screen name="BookConfirmScreen" component={BookConfirmScreen} />
            <HomeStack.Screen name="HistoryScreen" component={HistoryScreen} />
        </HomeStack.Navigator>
    );
}

//const AppStack = createStackNavigator();
// function AppStackScreen({ navigation }) {
//     return (
//         <AppStack.Navigator initialRouteName="Staff" headerMode='screen' >
//             <AppStack.Screen name="Staff" options={{
//                 title: 'StaffDetails', headerStyle: {
//                     backgroundColor: '#FFFFFF',
//                     elevation: 0,
//                     shadowOpacity: 0,
//                     borderBottomWidth: 0,
//                 }, headerLeft: () =>
//                     <MenuIcon onPress={() => navigation.navigate("StaffDetails")} />,

//             }}
//                 component={AppScreen} />
//         </AppStack.Navigator>
//     );
// }

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
    return (
        <Tab.Navigator initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Home') {
                        return (
                            <Ionicons
                                name={focused ? 'ios-home' : 'ios-home'}
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
                            <Entypo
                                name={focused ? 'dots-three-vertical' : 'dots-three-vertical'}
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
            <Tab.Screen name="Book" component={BookScreen} />
            <Tab.Screen name="History" component={HistoryScreen} />
            <Tab.Screen name="Profile" component={ProfileStackScreen} />
        </Tab.Navigator>
    );
}