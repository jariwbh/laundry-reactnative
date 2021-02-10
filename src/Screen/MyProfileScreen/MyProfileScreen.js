import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, ToastAndroid, Share } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import AsyncStorage from '@react-native-community/async-storage'
import Loader from '../../Components/Loader/Loader';

export default class MyProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: null,
            userProfile: null,
            userName: null,
            userAddress: null,
            userMobile: null,
            loader: true,
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
                this.setState({ loader: false })
                this.props.navigation.replace('LoginScreen')
            }, 3000);
        } else {
            var userData;
            userData = JSON.parse(getUser)
            this.wait(1000).then(() => this.setState({
                loader: false,
                userDetails: userData,
                userProfile: userData.profilepic,
                userName: userData.property.fullname,
                userAddress: userData.property.address,
                userMobile: userData.property.mobile_number
            }));
        }
    }

    onPressUpdateProfile() {
        const { userDetails } = this.state;
        if (userDetails != null) {
            this.props.navigation.replace('ViewProfileScreen', { userDetails })
        }
    }

    onPressLogout() {
        AsyncStorage.removeItem('@authuserlaundry');
        ToastAndroid.show("Log Out Success!", ToastAndroid.SHORT),
            this.props.navigation.replace('LoginScreen')
    }

    onShare = async () => {
        try {
            const result = await Share.share({
                message: 'Laundry Mobile App | App DownLoad URL : https://play.google.com/store/apps/dev?id=7809689132535053719'
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    ToastAndroid.show("share", ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show("share", ToastAndroid.SHORT);
                }
            } else if (result.action === Share.dismissedAction) {
                ToastAndroid.show("share failed!", ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log(error.message);
        }
    };


    render() {
        const { userDetails, userProfile, userName, userAddress, userMobile, loader } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                {loader == true ? <Loader /> : <>
                    <View style={styles.profileView}>
                        <View style={{ flexDirection: 'row', marginTop: hp('3%'), marginLeft: hp('3%'), marginRight: hp('5%') }}>
                            <Image source={{ uri: userProfile && userProfile !== null ? userProfile : "https://res.cloudinary.com/dnogrvbs2/image/upload/v1610428971/userimage_qif8wv.jpg" }}
                                style={{ width: 60, height: 60, borderRadius: hp('7%') }} />
                            <View style={{ margin: hp('2%'), marginLeft: hp('5%') }}>
                                <View>
                                    <Text style={{ fontSize: hp('2.5%'), marginRight: hp('0%'), textTransform: 'capitalize' }} >{userName}</Text>
                                </View>
                                <TouchableOpacity onPress={() => this.onPressUpdateProfile()}>
                                    <Text style={{ fontSize: hp('2.5%'), marginRight: hp('0%'), color: '#00C464' }}>View Profile </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.Detailview}>
                        <View>
                            <View style={{ marginTop: hp('2%'), flexDirection: 'row', justifyContent: 'space-between', marginLeft: hp('3%'), marginRight: hp('3%') }}>
                                <Text style={{ fontSize: hp('2%') }}>Phone Number</Text>
                                <Text style={{ fontSize: hp('2%') }}>{userMobile}</Text>
                            </View>
                            <View style={{ alignItems: 'center', marginTop: hp('2%'), flexDirection: 'row' }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: '#e6e6e6' }} />
                            </View>
                            <View style={{ marginTop: hp('2%'), flexDirection: 'row', justifyContent: 'space-between', marginLeft: hp('3%'), marginRight: hp('3%') }}>
                                <Text style={{ fontSize: hp('2%') }}>Address</Text>
                                <Text style={{ fontSize: hp('2%'), textTransform: 'capitalize', marginLeft: hp('20%'), marginRight: hp('4%') }}>{userAddress}</Text>
                            </View>
                            <View style={{ alignItems: 'center', marginTop: hp('2%'), flexDirection: 'row' }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: '#e6e6e6' }} />
                            </View>
                            <TouchableOpacity
                                style={{ marginTop: hp('2%'), flexDirection: 'row', justifyContent: 'space-between', marginLeft: hp('3%') }}
                                onPress={() => this.props.navigation.navigate('SupportScreen')}
                            >
                                <Text style={{ fontSize: hp('2%') }}>Support</Text>
                            </TouchableOpacity>
                            <View style={{ alignItems: 'center', marginTop: hp('2%'), flexDirection: 'row' }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: '#e6e6e6' }} />
                            </View>
                            <TouchableOpacity
                                style={{ marginTop: hp('2%'), flexDirection: 'row', justifyContent: 'space-between', marginLeft: hp('3%') }}
                                onPress={() => this.onShare()}>
                                <Text style={{ fontSize: hp('2%') }}>Share</Text>
                            </TouchableOpacity>
                            <View style={{ alignItems: 'center', marginTop: hp('2%'), flexDirection: 'row' }}>
                                <View style={{ flex: 1, height: 1, backgroundColor: '#e6e6e6' }} />
                            </View>
                            <TouchableOpacity
                                style={{ marginTop: hp('2%'), flexDirection: 'row', justifyContent: 'space-between', marginLeft: hp('3%') }}
                                onPress={() => this.props.navigation.navigate('TermsAndConditionScreen')}
                            >
                                <Text style={{ fontSize: hp('2%') }}>Terms & Condition</Text>
                            </TouchableOpacity>
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
                </>
                }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    profileView: {
        flexDirection: 'column',
        backgroundColor: "#fff",
        height: hp('18%'),
        marginTop: hp('0%'),
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