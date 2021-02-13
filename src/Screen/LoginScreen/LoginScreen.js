import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, TextInput, SafeAreaView, ToastAndroid, ScrollView, StatusBar, BackHandler } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../Components/Loader/Loading'
import appConfig from '../../Helpers/appConfig'
import { LoginService } from "../../Services/LoginService/LoginService"

export default class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            usererror: null,
            password: null,
            passworderror: null,
            loading: false,
        };
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.onPressSubmit = this.onPressSubmit.bind(this);
        this.secondTextInputRef = React.createRef();

        this._unsubscribeSiFocus = this.props.navigation.addListener('focus', e => {
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        });

        this._unsubscribeSiBlur = this.props.navigation.addListener('blur', e => {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton,
            );
        });
    }

    setEmail(email) {
        const re = /\S+@\S+\.\S+/;
        if (!email || email.length <= 0) {
            return this.setState({ usererror: 'Email Id can not be empty' });
        }
        return this.setState({ username: email, usererror: null })
    }

    setPassword(password) {
        if (!password || password.length <= 0) {
            return this.setState({ passworderror: 'Password cannot be empty' });
        }
        return this.setState({ password: password, passworderror: null })
    }

    resetScreen() {
        this.setState({
            username: null,
            usererror: null,
            password: null,
            passworderror: null,
            loading: false,
        })
    }

    authenticateUser = (user) => (
        AsyncStorage.setItem('@authuserlaundry', JSON.stringify(user))
    )

    onPressSubmit = async () => {
        const { username, password } = this.state;
        if (!username || !password) {
            this.setEmail(username)
            this.setPassword(password)
            return;
        }
        const body = {
            username: username,
            password: password
        }
        this.setState({ loading: true })
        try {
            await LoginService(body)
                .then(response => {
                    if (response.error) {
                        this.setState({ loading: false })
                        ToastAndroid.show("Username and Password Invalid!", ToastAndroid.LONG);
                        return
                    }

                    if (response) {
                        if (response.user && response.user.property && response.user.property.address) {
                            this.authenticateUser(response.user)
                            //---------------- appConfig.headers["authkey"] = response.user.addedby; -------------------
                            ToastAndroid.show("SignIn Success!", ToastAndroid.LONG);
                            this.props.navigation.navigate('TabNavigation')
                        } else {
                            this.authenticateUser(response.user)
                            ToastAndroid.show("SignIn Success!", ToastAndroid.LONG);
                            return this.props.navigation.navigate('MapScreen')
                        }
                    }
                })
        }
        catch (error) {
            this.setState({ loading: false })
            ToastAndroid.show("Username and Password Invalid!", ToastAndroid.LONG)
        };
    }

    componentWillUnmount() {
        this._unsubscribeSiFocus();
        this._unsubscribeSiBlur();
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        BackHandler.exitApp()
        return true;
    }

    render() {
        const { usererror, passworderror } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
                <ImageBackground source={require('../../assets/Image/Login.png')} style={styles.backgroundImage}>
                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                        <View style={{ marginTop: hp('5%'), marginLeft: hp('2%') }}>
                            <Image source={require('../../assets/Image/Logo.png')} style={{ height: hp('7%'), width: wp('40%'), borderRadius: hp('1%'), }}
                            />
                        </View>
                        <View style={{ marginTop: hp('5%'), marginLeft: hp('3%') }}>
                            <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold' }}>Welcome Back!</Text>
                        </View>
                        <View style={{ marginTop: hp('1%'), marginLeft: hp('3%'), marginRight: hp('10%') }}>
                            <Text style={{ fontSize: hp('2%'), color: '#193628' }}>Customize your services, appointment rules with flexible setup options. View an entire booking, set special discounts for services.</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={usererror == null ? styles.TextInput : styles.TextInputError}
                                    placeholder="Username"
                                    defaultValue={this.state.username}
                                    type='clear'
                                    returnKeyType="next"
                                    placeholderTextColor="#193628"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => { this.secondTextInputRef.current.focus() }}
                                    onChangeText={(email) => this.setEmail(email)}
                                />
                            </View>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={passworderror == null ? styles.TextInput : styles.TextInputError}
                                    placeholder="Password"
                                    type='clear'
                                    defaultValue={this.state.password}
                                    placeholderTextColor="#193628"
                                    secureTextEntry={true}
                                    returnKeyType="done"
                                    keyboardType="number-pad"
                                    ref={this.secondTextInputRef}
                                    onSubmitEditing={() => this.onPressSubmit()}
                                    onChangeText={(password) => this.setPassword(password)}
                                />
                            </View>
                        </View>
                        {/* <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: hp('4%') }}>
                        <TouchableOpacity onPress={() => { }} >
                            <Text style={{ fontSize: hp('2%'), color: '#193628' }}>Forgot Password ?</Text>
                        </TouchableOpacity>
                    </View> */}
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                            <TouchableOpacity style={styles.loginBtn} onPress={() => { this.onPressSubmit() }} >
                                {this.state.loading == true ? <Loader /> : <Text style={styles.loginText}>LOGIN</Text>}
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('7%') }}>
                            <TouchableOpacity onPress={() => { }} >
                                <Text style={{ fontSize: hp('2%'), color: '#193628' }}>Need an account ?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('1%') }}>
                            <TouchableOpacity style={styles.signup} onPress={() => { this.props.navigation.navigate('RegisterScreen'), this.resetScreen() }}>
                                <Text style={styles.signupText}>Signup</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
        //borderRadius: wp('2%'),
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
        fontSize: hp('2.5%'),
        flex: 1,
        padding: hp('2%'),
        backgroundColor: '#F4F4F4'
    },
    TextInputError: {
        fontSize: hp('2.5%'),
        flex: 1,
        padding: hp('2%'),
        backgroundColor: "#F4F4F4",
        borderColor: '#FF0000',
        width: wp('85%'),
        height: hp('8%'),
        alignItems: "center",
        borderWidth: hp('0.2%')
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