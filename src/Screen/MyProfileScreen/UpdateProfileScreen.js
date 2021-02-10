import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ToastAndroid, ScrollView, SafeAreaView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { UpdateUserService } from '../../Services/UserService/UserService';
import Loader from '../../Components/Loader/Loader';
import Loading from '../../Components/Loader/Loading';
import AsyncStorage from '@react-native-community/async-storage'

class UpdateProfile extends Component {
    constructor(props) {
        super(props);
        this.userDetails = this.props.route.params.userDetails;
        this.state = {
            _id: this.userDetails._id,
            fullname: this.userDetails.property.fullname,
            fullnameError: null,
            username: this.userDetails.property.email,
            usernameError: null,
            mobilenumber: this.userDetails.property.mobile_number,
            mobilenumberError: null,
            userProfile: this.userDetails.profilepic,
            profileName: this.userDetails.fullname,
            memberName: this.userDetails.username,
            address: this.userDetails.property.address,
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
            return this.setState({ fullnameError: 'User Name cannot be empty', fullname: null });
        }
        return this.setState({ fullname: fullname, fullnameError: null })
    }

    setUserName(email) {
        const re = /\S+@\S+\.\S+/;
        if (!email || email.length <= 0) {
            return this.setState({ usernameError: 'Email cannot be empty', username: null });
        }
        if (!re.test(email)) {

            return this.setState({ usernameError: 'Ooops! We need a valid email address' });
        }
        return this.setState({ username: email, usernameError: null })
    }

    setMobileNumber(mobilenumber) {
        const reg = /^[0]?[789]\d{9}$/;
        if (!mobilenumber || mobilenumber.length <= 0) {
            return this.setState({ mobilenumberError: 'Mobile Number cannot be empty', mobilenumber: null });
        }
        if (!reg.test(mobilenumber)) {
            return this.setState({ mobilenumberError: 'Ooops! We need a valid Mobile Number' });
        }
        return this.setState({ mobilenumber: mobilenumber, mobilenumberError: null })
    }

    setAddress(address) {
        if (!address || address.length <= 0) {
            return this.setState({ addressError: 'Address cannot be empty', address: null });
        }
        return this.setState({ address: address, addressError: null })
    }

    authenticateUser = (user) => {
        AsyncStorage.setItem('@authuserlaundry', JSON.stringify(user));
    }


    onPressSubmit = () => {
        const { fullname, username, mobilenumber, _id, memberName, address } = this.state;
        if (!fullname || !username || !mobilenumber) {
            this.setFullName(fullname)
            this.setUserName(username)
            this.setMobileNumber(mobilenumber)
            this.setAddress(address)
            return;
        }

        const body = {
            _id: _id,
            status: "active",
            username: memberName,
            property: {
                fullname: fullname,
                email: username,
                mobile_number: mobilenumber,
                address: address
            }
        }

        this.setState({ loading: true })

        try {
            UpdateUserService(body).then(response => {

                if (response != null) {
                    console.log('response', response)
                    this.authenticateUser(response)
                    ToastAndroid.show("Your Profile Update!", ToastAndroid.LONG);
                    this.props.navigation.replace('MyProfileScreen')
                }
            })
        }
        catch (error) {
            this.setState({ loading: false })
            console.log('error', error)
            ToastAndroid.show("Your Profile Not Update!", ToastAndroid.LONG)
        }
    }

    render() {
        const { fullname, fullnameError, usernameError, username, mobilenumber, mobilenumberError, userProfile, profileName, loading, addressError, address } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                    {this.userData === null ?
                        <Loader />
                        : <>
                            <Image style={styles.avatar} source={{ uri: userProfile && userProfile !== null ? userProfile : "https://res.cloudinary.com/dnogrvbs2/image/upload/v1610428971/userimage_qif8wv.jpg" }} />
                            <View style={styles.body}>
                                <View style={styles.bodyContent}>
                                    <Text style={styles.name}>{profileName && profileName}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={styles.inputView}>
                                        <TextInput
                                            style={fullnameError == null ? styles.TextInput : styles.TextInputError}
                                            defaultValue={fullname}
                                            placeholder="User Name"
                                            type='clear'
                                            placeholderTextColor="#193628"
                                            returnKeyType="next"
                                            blurOnSubmit={false}
                                            onSubmitEditing={() => { this.secondTextInputRef.current.focus() }}
                                            onChangeText={(fullname) => this.setFullName(fullname)}
                                        />
                                    </View>
                                    <View style={styles.inputView}>
                                        <TextInput
                                            style={usernameError == null ? styles.TextInput : styles.TextInputError}
                                            defaultValue={username}
                                            placeholder="Email Id"
                                            type='clear'
                                            placeholderTextColor="#193628"
                                            autoCapitalize="none"
                                            autoCompleteType="email"
                                            textContentType="emailAddress"
                                            keyboardType="email-address"
                                            returnKeyType="next"
                                            blurOnSubmit={false}
                                            onSubmitEditing={() => { this.TeardTextInputRef.current.focus() }}
                                            ref={this.secondTextInputRef}
                                            onChangeText={(username) => this.setUserName(username)}
                                        />
                                    </View>
                                    <View style={styles.inputView} >
                                        <TextInput
                                            style={mobilenumberError == null ? styles.TextInput : styles.TextInputError}
                                            defaultValue={mobilenumber}
                                            placeholder="Mobile Number"
                                            type='clear'
                                            placeholderTextColor="#193628"
                                            keyboardType="numeric"
                                            returnKeyType="next"
                                            ref={this.TeardTextInputRef}
                                            onSubmitEditing={() => { this.FourTextInputRef.current.focus() }}
                                            onChangeText={(mobilenumber) => this.setMobileNumber(mobilenumber)}
                                        />
                                    </View>
                                    <View style={styles.inputView}>
                                        <TextInput
                                            style={addressError == null ? styles.TextInput : styles.TextInputError}
                                            placeholder="Address"
                                            type='clear'
                                            defaultValue={address}
                                            placeholderTextColor="#193628"
                                            returnKeyType="done"
                                            ref={this.FourTextInputRef}
                                            onSubmitEditing={() => this.onPressSubmit()}
                                            onChangeText={(address) => this.setAddress(address)}
                                        />
                                    </View>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                                        <TouchableOpacity style={styles.update_Btn} onPress={() => this.onPressSubmit()}>
                                            {loading == true ? <Loading /> : <Text style={styles.update_text} >Update Profile</Text>}
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </>}
                </ScrollView>
            </SafeAreaView>
        );
    }
}

export default UpdateProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    avatar: {
        width: hp('15%'),
        height: hp('15%'),
        borderRadius: wp('20%'),
        alignSelf: 'center',
        marginTop: hp('2%'),
        marginBottom: hp('3%')
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: hp('5%')
    },
    name: {
        fontSize: hp('4%'),
        color: "#737373",
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    inputView: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        borderRadius: wp('8%'),
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        borderColor: '#fff',
        width: wp('80%'),
        height: hp('8%'),
        marginBottom: hp('3%'),
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
        backgroundColor: '#ffcccc'
    },
    update_Btn: {
        flexDirection: 'row',
        width: wp('30%'),
        backgroundColor: "#e6fff3",
        borderRadius: wp('2%'),
        height: hp('5%'),
        alignItems: "center",
        justifyContent: "center",
        marginBottom: hp('12%')
    },
    update_text: {
        color: '#00C464',
        fontSize: hp('2.5%'),
    },
})

