import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default class ViewProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.userDetails = this.props.route.params.userDetails;
        this.state = {
            userDetails: this.userDetails,
            userProfile: this.userDetails.profilepic,
            userName: this.userDetails.property.fullname,
            userAddress: this.userDetails.property.address,
            userMobile: this.userDetails.property.mobile_number
        };
    }

    render() {
        const { userDetails, userProfile, userName, userAddress, userMobile } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.profileView}>
                    <View style={{ margin: hp('1%'), justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={{ uri: userProfile && userProfile !== null ? userProfile : "https://res.cloudinary.com/dnogrvbs2/image/upload/v1610428971/userimage_qif8wv.jpg" }}
                            style={{ marginTop: hp('0%'), width: 100, height: 100, borderRadius: hp('10%') }} />
                    </View>
                    <View style={{ margin: hp('0.5%'), justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: hp('3.5%'), textTransform: 'capitalize' }} >{userName} </Text>
                    </View>
                    <View style={{ margin: hp('0.5%'), justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: hp('2.5%'), color: '#737373' }} >{userMobile} </Text>
                    </View>
                    {userAddress &&
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: hp('10%'), marginRight: hp('10%') }}>
                            <Text style={{ fontSize: hp('2%'), color: '#737373', textTransform: 'capitalize' }} >{userAddress} </Text>
                        </View>
                    }
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('5%') }}>
                    <TouchableOpacity style={styles.editBtn} onPress={() => { this.props.navigation.navigate('UpdateProfileScreen', { userDetails }) }} >
                        {this.state.loading == true ? <Loader /> : <Text style={styles.editText}>Edit</Text>}
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    profileView: {
        marginTop: hp('5%'),
    },
    editBtn: {
        flexDirection: 'row',
        width: wp('30%'),
        backgroundColor: "#e6fff3",
        borderRadius: wp('2%'),
        height: hp('5%'),
        alignItems: "center",
        justifyContent: "center",
    },
    editText: {
        color: '#00C464',
        fontSize: hp('2.5%'),
    }
})