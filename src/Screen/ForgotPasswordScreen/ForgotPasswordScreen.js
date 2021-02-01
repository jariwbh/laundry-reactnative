import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, TextInput, SafeAreaView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default class ForgotPasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground source={require('../../assets/Image/Login.png')} style={styles.backgroundImage}>
                    <View style={{ marginTop: hp('5%'), marginLeft: hp('2%') }}>
                        <Image source={require('../../assets/Image/Logo.png')} style={{ height: hp('7%'), width: wp('40%'), borderRadius: hp('1%'), }}
                        />
                    </View>
                    <View style={{ marginTop: hp('2%'), marginLeft: hp('3%') }}>
                        <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold' }}>Forgot Password..</Text>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('5%') }}>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Current Password"
                                type='clear'
                                placeholderTextColor="#193628"
                                returnKeyType="next"
                                keyboardType="phone-pad"

                            />
                        </View>
                        {/* <Text style={{ marginTop: hp('-3%'), marginLeft: hp('0%'), color: '#ff0000' }}>{this.state.usererror && this.state.usererror}</Text> */}
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Change Password"
                                type='clear'
                                placeholderTextColor="#193628"
                                secureTextEntry={true}
                                returnKeyType="next"
                                keyboardType="phone-pad"
                            />
                        </View>
                        {/* <Text style={{ marginTop: hp('-3%'), marginLeft: hp('0%'), color: '#ff0000' }}>{this.state.passworderror && this.state.passworderror}</Text> */}
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Confirm Password"
                                type='clear'
                                placeholderTextColor="#193628"
                                secureTextEntry={true}
                                returnKeyType="done"
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>
                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row', marginRight: hp('5%') }}>
                        <Text style={{ fontSize: hp('2%'), color: '#000000' }}> Back to </Text>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('LoginScreen') }} >
                            <Text style={{ fontSize: hp('2%'), color: '#193628' }}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('5%') }}>
                        <TouchableOpacity style={styles.signupBtn} onPress={() => { }} >
                            <Text style={styles.signupText}>Save</Text>
                        </TouchableOpacity>
                    </View>
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
        width: wp('85%'),
        height: hp('7%'),
        margin: hp('2%'),
        alignItems: "center",

    },
    TextInput: {
        fontSize: hp('2%'),
        flex: 1,
        padding: hp('2%'),
    },
    signupBtn: {
        flexDirection: 'row',
        width: wp('30%'),
        backgroundColor: "#e6fff3",
        borderRadius: wp('2%'),
        height: hp('5%'),
        alignItems: "center",
        justifyContent: "center",
    },
    signupText: {
        color: '#00C464',
        fontSize: hp('2.5%'),

    },
    login: {
        flexDirection: 'row',
        width: wp('80%'),
        backgroundColor: "#00C464",
        borderRadius: wp('2%'),
        height: hp('7%'),
        alignItems: "center",
        justifyContent: "center",
    },
    loginText: {
        color: '#FFFFFF',
        fontSize: hp('3%'),

    },
    innerText: {
        color: '#605C5C',
        fontSize: hp('2%'),
    },
    baseText: {
        fontWeight: 'normal',
        color: '#183BAE',
        fontSize: hp('2%'),
    },
})