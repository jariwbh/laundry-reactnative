import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, ToastAndroid } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Entypo from 'react-native-vector-icons/Entypo';
import Loader from '../../Components/Loader/Loader';
import AsyncStorage from '@react-native-community/async-storage'

export default class MyProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: null,
            userProfile: null,
        }
    }

    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    componentDidMount() {
        this.getdata()
    }

    getdata = async () => {
        var getUser = await AsyncStorage.getItem('@authuserlaundry')
        if (getUser == null) {
            setTimeout(() => {
                this.props.navigation.replace('LoginScreen')
            }, 5000);
        } else {
            var userData;
            userData = JSON.parse(getUser)
            this.wait(1000).then(() => this.setState({ loader: false, userDetails: userData, userProfile: userData.profilepic }));
        }
    }

    onPressUpdateProfile() {
        const { userDetails } = this.state;
        if (userDetails != null) {
            this.props.navigation.navigate('UpdateProfileScreen', { userDetails })
        }
    }

    onPressLogout() {
        AsyncStorage.removeItem('@authuserlaundry');
        ToastAndroid.show("Log Out Success!", ToastAndroid.SHORT),
            this.props.navigation.replace('LoginScreen')
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.profileView}>
                    <View style={{ flexDirection: 'row', marginTop: hp('3%'), justifyContent: 'space-between', marginLeft: hp('3%'), marginRight: hp('5%') }}>
                        <Image source={require('../../assets/Image/1.jpg')} style={{
                            marginTop: hp('0%'), width: 100, height: 100, borderRadius: hp('7%'), marginLeft: hp('0%')
                        }}
                        />
                        <View style={{ flexDirection: 'column', margin: hp('1%') }}>
                            <View>
                                <Text style={{ fontSize: hp('2.5%'), marginRight: hp('0%') }} >Phillip Mathis </Text>
                            </View>
                            <TouchableOpacity onPress={() => this.onPressUpdateProfile()}>
                                <Text style={{ fontSize: hp('2.5%'), marginRight: hp('0%'), color: '#00C464' }}>View Profile </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Entypo name="bell" size={30} color='#000000' style={{}} />
                        </View>
                    </View>
                </View>
                <View style={styles.Detailview}>
                    <View>
                        <View style={{ marginTop: hp('2%'), flexDirection: 'row', justifyContent: 'space-between', marginLeft: hp('3%'), marginRight: hp('3%') }}>
                            <Text style={{ fontSize: hp('2%') }}>Phone Number</Text>
                            <Text style={{ fontSize: hp('2%') }}>483-930-7078</Text>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: hp('2%'), flexDirection: 'row' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#e6e6e6' }} />
                        </View>
                        <View style={{ marginTop: hp('2%'), flexDirection: 'row', justifyContent: 'space-between', marginLeft: hp('3%'), marginRight: hp('3%') }}>
                            <Text style={{ fontSize: hp('2%') }}>Address</Text>
                            <Text style={{ fontSize: hp('2%') }}>015 Rolfson Inlet Apt. 700,…</Text>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: hp('2%'), flexDirection: 'row' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#e6e6e6' }} />
                        </View>
                        <View style={{ marginTop: hp('2%'), flexDirection: 'row', justifyContent: 'space-between', marginLeft: hp('3%') }}>
                            <Text style={{ fontSize: hp('2%') }}>Support</Text>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: hp('2%'), flexDirection: 'row' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#e6e6e6' }} />
                        </View>
                        <View style={{ marginTop: hp('2%'), flexDirection: 'row', justifyContent: 'space-between', marginLeft: hp('3%') }}>
                            <Text style={{ fontSize: hp('2%') }}>Share</Text>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: hp('2%'), flexDirection: 'row' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#e6e6e6' }} />
                        </View>
                        <View style={{ marginTop: hp('2%'), flexDirection: 'row', justifyContent: 'space-between', marginLeft: hp('3%') }}>
                            <Text style={{ fontSize: hp('2%') }}>Terms & Condition</Text>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: hp('2%'), flexDirection: 'row' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#e6e6e6' }} />
                        </View>
                        <TouchableOpacity style={{ marginTop: hp('2%'), flexDirection: 'row', justifyContent: 'space-between', marginLeft: hp('3%') }} onPress={() => this.onPressLogout()}>
                            <Text style={{ fontSize: hp('2%'), color: 'red' }}>Signout</Text>
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center', marginTop: hp('2%'), flexDirection: 'row' }}>
                            <View style={{ flex: 1, height: 1, backgroundColor: '#e6e6e6' }} />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileView: {
        flexDirection: 'column',
        backgroundColor: "#fff",
        height: hp('22%'),
        marginTop: hp('5%'),
        marginBottom: hp('1%'),
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
    },
    Detailview: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#fff",
        marginTop: hp('1%'),
        marginBottom: hp('1%'),
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,

    },

})