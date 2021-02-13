import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class BookConfirmScreen extends Component {
    constructor(props) {
        super(props);
        this.BookedNumber = this.props.route.params.response;
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground source={require('../../assets/Image/Login.png')} style={styles.backgroundImage}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('30%') }}>
                        <Image source={require('../../assets/Image/Oval3.png')} style={{ marginTop: hp('0%'), width: 50, height: 50 }} />
                        <AntDesign name="check" size={30} color='#FFFFFF' style={{ position: 'absolute' }} />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('4%') }}>
                        <Text style={{ fontSize: hp('2.5%') }}> Booking Confirmed </Text>
                    </View>
                    {this.BookedNumber &&
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%'), marginRight: hp('3%'), marginLeft: hp('3%') }}>
                            <Text style={{ fontSize: hp('2.5%'), textAlign: 'center' }}> Booking ID : {this.BookedNumber.prefix + '-' + this.BookedNumber.number}  </Text>
                        </View>
                    }
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('4%') }} onPress={() => this.props.navigation.navigate('HomeScreen')}>
                        <Text style={{ fontSize: hp('2.5%'), color: 'red' }}> Close </Text>
                    </TouchableOpacity>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        height: hp('100%'),
        width: wp('100%')
    },
})