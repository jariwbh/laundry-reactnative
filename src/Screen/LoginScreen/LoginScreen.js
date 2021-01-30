import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../../assets/Image/Login.png')} style={styles.backgroundImage}>
                    <View style={{ marginTop: hp('5%'), marginLeft: hp('2%') }}>
                        <Image source={require('../../../assets/Image/Logo.png')} style={{ height: hp('7%'), width: wp('40%'), borderRadius: hp('1%'), }}
                        />
                    </View>
                    <View style={{ marginTop: hp('5%'), marginLeft: hp('3%') }}>
                        <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold' }}>Welcome Back!</Text>
                    </View>
                    <View style={{ marginTop: hp('1%'), marginLeft: hp('3%'), marginRight: hp('10%') }}>
                        <Text style={{ fontSize: hp('2%'), color: '#193628' }}>Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Email"
                                //   defaultValue={this.state.username}
                                type='clear'
                                returnKeyType="next"
                                placeholderTextColor="#193628"
                                blurOnSubmit={false}
                            // onSubmitEditing={() => { this.secondTextInputRef.current.focus() }}
                            //  onChangeText={(email) => this.setEmail(email)}
                            />
                        </View>
                        {/* <Text style={{ marginTop: hp('-3%'), marginLeft: hp('0%'), color: '#ff0000' }}>{this.state.usererror && this.state.usererror}</Text> */}
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="**********"
                                type='clear'
                                //  defaultValue={this.state.password}
                                placeholderTextColor="#193628"
                                secureTextEntry={true}
                                returnKeyType="done"
                                keyboardType="number-pad"
                                ref={this.secondTextInputRef}
                            //  onSubmitEditing={() => this.onPressSubmit()}
                            //  onChangeText={(password) => this.setPassword(password)}
                            />
                        </View>
                        {/* <Text style={{ marginTop: hp('-3%'), marginLeft: hp('0%'), color: '#ff0000' }}>{this.state.passworderror && this.state.passworderror}</Text> */}
                    </View>
                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: hp('4%') }}>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('ForgotPasswordScreen') }} >
                            <Text style={{ fontSize: hp('2%'), color: '#193628' }}>Forgot Password ?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                        <TouchableOpacity style={styles.loginBtn} onPress={() => { }} >
                            <Text style={styles.loginText}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('7%') }}>
                        <TouchableOpacity onPress={() => { }} >
                            <Text style={{ fontSize: hp('2%'), color: '#193628' }}>Need an account ?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('1%') }}>
                        <TouchableOpacity style={styles.signup} onPress={() => { this.props.navigation.navigate('RegisterScreen') }}>
                            <Text style={styles.signupText}>Signup</Text>
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
        width: wp('85%'),
        height: hp('8%'),
        margin: hp('3%'),
        alignItems: "center",
    },
    TextInput: {
        fontSize: hp('2%'),
        flex: 1,
        padding: hp('2%'),
    },
    loginBtn: {
        flexDirection: 'row',
        width: wp('30%'),
        backgroundColor: "#e6fff3",
        borderRadius: wp('2%'),
        height: hp('5%'),
        alignItems: "center",
        justifyContent: "center",
    },
    loginText: {
        color: '#00C464',
        fontSize: hp('2.5%'),
    },
    signup: {
        flexDirection: 'row',
        width: wp('80%'),
        backgroundColor: "#00C464",
        borderRadius: wp('2%'),
        height: hp('7%'),
        alignItems: "center",
        justifyContent: "center",
    },
    signupText: {
        color: '#FFFFFF',
        fontSize: hp('3%'),
    },
})