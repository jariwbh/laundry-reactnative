import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
//import OTPInputView from '@twotalltotems/react-native-otp-input'
import { TextInput } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

export default class VerificatioScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../../assets/Image/Login.png')} style={styles.backgroundImage}>
                    <View style={{ marginTop: hp('3%'), marginLeft: hp('2%') }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{}} >
                            <MaterialIcons name="arrow-back" size={24} color="#000000" />
                        </TouchableOpacity>
                        <Image source={require('../../../assets/Image/Logo.png')} style={{ height: hp('7%'), width: wp('40%'), borderRadius: hp('1%'), }}
                        />
                    </View>
                    <View style={{ marginTop: hp('2%'), marginLeft: hp('3%') }}>
                        <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold' }}>Verification…</Text>
                    </View>
                    <View style={{ marginTop: hp('1%'), marginLeft: hp('3%'), marginRight: hp('10%') }}>
                        <Text style={{ fontSize: hp('2%'), color: '#193628' }}>Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum.</Text>
                    </View>
                    <View style={{ marginTop: hp('5%'), justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../../assets/Image/illustration.png')} style={{ height: 138.5, width: 105, }}
                        />
                    </View>
                    <View style={{ marginTop: hp('4%'), justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: hp('3%'), }}>O T P</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: hp('3%') }}>
                        <View style={styles.inputView}>
                            <TextInput
                                placeholder=""
                                color="#F4F4F4"
                                keyboardType="number-pad"

                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                placeholder=""
                                color="#F4F4F4"
                                keyboardType="number-pad"
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                placeholder=""
                                color="#F4F4F4"
                                keyboardType="number-pad"
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                placeholder=""
                                color="#F4F4F4"
                                keyboardType="number-pad"

                            />
                        </View>
                    </View>
                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginTop: hp('2%'), marginRight: hp('5%') }}>
                        <TouchableOpacity>
                            <Text style={{ color: '#00C464', fontSize: hp('2%') }}>Resend OTP</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                        <TouchableOpacity style={styles.VerifyBtn} onPress={() => { this.props.navigation.navigate('TabNavigation') }} >
                            <Text style={styles.VerifyText}>Verify</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
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
    inputView: {
        flexDirection: 'row',
        backgroundColor: "#F4F4F4",
        borderRadius: wp('2%'),
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        borderColor: '#FFFFFF',
        width: wp('12%'),
        height: hp('7%'),
        margin: hp('2%'),
        alignItems: "center",
        justifyContent: 'center'
    },
    VerifyBtn: {
        flexDirection: 'row',
        width: wp('30%'),
        backgroundColor: "#e6fff3",
        borderRadius: wp('2%'),
        height: hp('5%'),
        alignItems: "center",
        justifyContent: "center",
    },
    VerifyText: {
        color: '#00C464',
        fontSize: hp('2.5%'),

    },
})