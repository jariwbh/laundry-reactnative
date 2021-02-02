import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, TextInput, SafeAreaView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { RegisterService } from '../../Services/RegisterService/RegisterService';
import Loader from '../../Components/Loader/Loading';
import BackButton from '../../Components/BackButton/BackButton'

export default class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: null,
            fullnameError: null,
            username: null,
            usernameError: null,
            mobilenumber: null,
            mobilenumberError: null,
            address: null,
            addressError: null,
            loading: false,
        }
        this.setFullName = this.setFullName.bind(this);
        this.setUserName = this.setUserName.bind(this);
        this.setMobileNumber = this.setMobileNumber.bind(this);
        this.setAddress = this.setAddress.bind(this);
        this.onPressSubmit = this.onPressSubmit.bind(this);
        this.secondTextInputRef = React.createRef();
        this.TeardTextInputRef = React.createRef();
        this.FourTextInputRef = React.createRef();
    }

    setFullName(fullname) {
        if (!fullname || fullname.length <= 0) {
            return this.setState({ fullnameError: 'User Name cannot be empty' });
        }
        return this.setState({ fullname: fullname, fullnameError: null })
    }

    setUserName(email) {
        const re = /\S+@\S+\.\S+/;
        if (!email || email.length <= 0) {
            return this.setState({ usernameError: 'Email Id can not be empty' });
        }
        if (!re.test(email)) {

            return this.setState({ usernameError: 'Ooops! We need a valid email address' });
        }
        return this.setState({ username: email, usernameError: null })
    }

    setMobileNumber(mobilenumber) {
        const reg = /^[0]?[789]\d{9}$/;
        if (!mobilenumber || mobilenumber.length <= 0) {
            return this.setState({ mobilenumberError: 'Mobile Number cannot be empty' });
        }
        if (!reg.test(mobilenumber)) {
            return this.setState({ mobilenumberError: 'Ooops! We need a valid Mobile Number' });
        }
        return this.setState({ mobilenumber: mobilenumber, mobilenumberError: null })
    }

    setAddress(address) {
        if (!address || address.length <= 0) {
            return this.setState({ addressError: 'Address cannot be empty' });
        }
        return this.setState({ address: address, addressError: null })
    }

    onPressSubmit = async () => {
        const { fullname, username, mobilenumber, address } = this.state;
        if (!fullname || !username || !mobilenumber) {
            this.setFullName(fullname)
            this.setUserName(username)
            this.setMobileNumber(mobilenumber)
            this.setAddress(address)
            return;
        }
        const body = {
            property: {
                fullname: fullname,
                email: username,
                mobile_number: mobilenumber,
                address: address
            }
        }

        this.setState({ loading: true })

        try {
            await RegisterService(body).then(response => {
                if (response.error) {
                    this.setState({ loading: false })
                    ToastAndroid.show("SignUp Failed!", ToastAndroid.LONG);
                    this.resetScreen()
                    return
                }
                if (response != null) {
                    ToastAndroid.show("SignUp Success!", ToastAndroid.LONG);
                    this.props.navigation.navigate('LoginScreen')
                    this.resetScreen()
                }
            })
        }
        catch (error) {
            this.setState({ loading: false })
            ToastAndroid.show("SignUp Failed!", ToastAndroid.LONG)
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ImageBackground source={require('../../assets/Image/Login.png')} style={styles.backgroundImage}>
                    <View style={{ marginTop: hp('3%'), marginLeft: hp('2%'), flexDirection: 'row' }}>
                        <Image source={require('../../assets/Image/Logo.png')} style={{ height: hp('7%'), width: wp('40%'), borderRadius: hp('1%') }}
                        />
                    </View>
                    <View style={{ marginTop: hp('2%'), marginLeft: hp('3%') }}>
                        <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold' }}>Signup..</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('0%') }}>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Full Name"
                                defaultValue={this.state.fullname}
                                type='clear'
                                returnKeyType="next"
                                placeholderTextColor="#193628"
                                blurOnSubmit={false}
                                onSubmitEditing={() => { this.secondTextInputRef.current.focus() }}
                                onChangeText={(fullname) => this.setFullName(fullname)}
                            />
                        </View>
                        <Text style={{ marginTop: hp('-3%'), marginLeft: hp('0%'), color: '#ff0000' }}>{this.state.fullnameError && this.state.fullnameError}</Text>
                        <View style={styles.inputview}>
                            <TextInput
                                style={styles.TextInput}
                                defaultValue={this.state.username}
                                placeholder="Email"
                                type='clear'
                                placeholderTextColor="#ABAFB3"
                                returnKeyType="next"
                                autoCapitalize="none"
                                autoCompleteType="email"
                                textContentType="emailAddress"
                                keyboardType="email-address"
                                blurOnSubmit={false}
                                onSubmitEditing={() => { this.TeardTextInputRef.current.focus() }}
                                ref={this.secondTextInputRef}
                                onChangeText={(username) => this.setUserName(username)}
                            />
                        </View>
                        <Text style={{ marginTop: hp('-2%'), marginLeft: hp('-20%'), color: '#ff0000' }}>{this.state.usernameError && this.state.usernameError}</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Address"
                                type='clear'
                                defaultValue={this.state.address}
                                placeholderTextColor="#193628"
                                returnKeyType="next"
                                onSubmitEditing={() => { this.FourTextInputRef.current.focus() }}
                                ref={this.TeardTextInputRef}
                                onChangeText={(address) => this.setAddress(address)}
                            />
                        </View>
                        <Text style={{ marginTop: hp('-2%'), marginLeft: hp('-20%'), color: '#ff0000' }}>{this.state.addressError && this.state.addressError}</Text>
                        <View style={styles.inputview} >
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Mobile Number"
                                type='clear'
                                placeholderTextColor="#ABAFB3"
                                returnKeyType="done"
                                keyboardType="number-pad"
                                ref={this.FourTextInputRef}
                                onSubmitEditing={() => this.onPressSubmit()}
                                onChangeText={(mobilenumber) => this.setMobileNumber(mobilenumber)}
                            />
                        </View>
                        <Text style={{ marginTop: hp('-2%'), marginLeft: hp('-16%'), color: '#ff0000' }}>{this.state.mobilenumberError && this.state.mobilenumberError}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                        <TouchableOpacity style={styles.signupBtn} onPress={() => { this.onPressSubmit() }} >
                            <Text style={styles.signupText}>Signup</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('5%') }}>
                        <TouchableOpacity onPress={() => { }} >
                            <Text style={{ fontSize: hp('2%'), color: '#193628' }}>Already have an account ?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('3%') }}>
                        <TouchableOpacity style={styles.login} onPress={() => { this.props.navigation.navigate('LoginScreen') }}>
                            <Text style={styles.loginText}>Login</Text>
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
})