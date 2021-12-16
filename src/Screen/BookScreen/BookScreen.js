import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ToastAndroid, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Loader from '../../Components/Loader/Loading';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-community/async-storage';
import { BookService } from '../../Services/BookService/BookService';
import { Keyboard } from 'react-native';

export default class BookScreen extends Component {
    constructor(props) {
        super(props);
        this.serviceDetails = this.props.route.params.ServiceDetail;
        this.state = {
            userID: null,
            memberID: null,
            userAddress: null,
            userAddressError: null,
            userData: null,
            serviceDate: null,
            serviceDateError: null,
            serviceTime: null,
            serviceTimeError: null,
            isDatePickerVisible: false,
            isTimePickerVisibility: false,
            loading: false,
            userQuentityError: null,
            userQuentity: null
        };
        this.setServiceDate = this.setServiceDate.bind(this);
        this.setServiceTime = this.setServiceTime.bind(this);
        this.setAddress = this.setAddress.bind(this);
        this.setQuentity = this.setQuentity.bind(this);
        this.onPressSubmit = this.onPressSubmit.bind(this);
        this.secondTextInputRef = React.createRef();
    }

    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
    };

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false });
    };

    handleConfirmDate = (date) => {
        this.setState({ serviceDate: moment(date).format('YYYY-MM-DD') });
        this.hideDatePicker();
    };

    showTimePicker = () => {
        this.setState({ isTimePickerVisibility: true });
    };

    hideTimePicker = () => {
        this.setState({ isTimePickerVisibility: false });
    };

    handleConfirmTime = (time) => {
        this.setState({ serviceTime: moment(time).format('HH:mm') });
        this.hideTimePicker();
    };

    componentDidMount() {
        this.getdata()
    }

    setServiceDate(serviceDate) {
        if (!serviceDate || serviceDate.length <= 0) {
            return this.setState({ serviceDateError: 'service Date cannot be empty', serviceDate: serviceDate });
        }
        return this.setState({ serviceDate: serviceDate, serviceDateError: null })
    }

    setServiceTime(serviceTime) {
        if (!serviceTime || serviceTime.length <= 0) {
            return this.setState({ serviceTimeError: 'Service Time cannot be empty', serviceTime: serviceTime });
        }
        return this.setState({ serviceTime: serviceTime, serviceTimeError: null })
    }

    setAddress(userAddress) {
        if (!userAddress || userAddress.length <= 0) {
            return this.setState({ userAddressError: 'Address cannot be empty', userAddress: null });
        }
        return this.setState({ userAddress: userAddress, userAddressError: null })
    }

    setQuentity(userQuentity) {
        if (!userQuentity || userQuentity.length <= 0) {
            return this.setState({ userQuentityError: 'Address cannot be empty', userQuentity: null });
        }
        return this.setState({ userQuentity: userQuentity, userQuentityError: null })
    }

    getdata = async () => {
        var getUser = await AsyncStorage.getItem('@authuserlaundry')
        if (getUser == null || getUser && getUser.length == 0) {
            setTimeout(() => {
                this.props.navigation.replace('LoginScreen')
            }, 3000);
        } else {
            const user = JSON.parse(getUser)
            this.setState({
                userID: user.addedby,
                memberID: user._id,
                userAddress: user.property.address
            })
        }
    }

    onPressSubmit = () => {
        const { serviceDate, serviceTime, userID, memberID, userAddress, userQuentity } = this.state;
        if (!serviceDate || !serviceTime || !userAddress || !userQuentity) {
            this.setServiceDate(serviceDate)
            this.setServiceTime(serviceTime)
            this.setAddress(userAddress)
            this.setQuentity(userQuentity)
            return;
        }

        const body = {
            appointmentdate: serviceDate,
            attendee: memberID,
            onModel: "Member",
            refid: this.serviceDetails._id,
            //host: userID,
            charges: this.serviceDetails.charges,
            duration: '0', //this.serviceDetails.duration,
            timeslot: {
                starttime: serviceTime
            },
            property: {
                quentity: userQuentity
            }
        }
        console.log(`body`, body);
        this.setState({ loading: true });
        try {
            BookService(body).then(response => {
                console.log(`response`, response);
                if (response != null) {
                    this.setState({ loading: false });
                    ToastAndroid.show("Booking Sucess!", ToastAndroid.LONG);
                    this.props.navigation.navigate('BookConfirmScreen', { response })
                }
            })
        }
        catch (error) {
            this.setState({ loading: false })
            console.log('error', error)
            ToastAndroid.show("Booking Failed!", ToastAndroid.LONG)
        }
    }

    render() {

        const { userAddressError, userQuentityError, serviceTimeError, serviceDateError, serviceDate, serviceTime, userAddress, userQuentity, loading } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
                    <View style={{ marginTop: hp('1%'), justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.inputview}>
                            <View style={{ height: hp('3.5%'), width: hp('10%'), backgroundColor: '#00C464', marginLeft: hp('3%'), marginTop: hp('-3.5%') }}>
                                <Text style={{ color: '#FFFFFF', fontSize: hp('2.5%'), textAlign: 'center' }}>Date</Text>
                            </View>
                            <TextInput
                                style={serviceDateError == null ? styles.TextInput : styles.TextInputError}
                                defaultValue={serviceDate}
                                placeholder="YYYY-MM-DD"
                                placeholderTextColor="#737373"
                                type='clear'
                                returnKeyType="next"
                                onTouchEnd={() => Keyboard.dismiss()}
                                onFocus={this.showDatePicker}
                                onChangeText={(serviceDate) => this.setServiceDate(serviceDate)}
                            />
                            <DateTimePickerModal
                                isVisible={this.state.isDatePickerVisible}
                                mode="date"
                                onConfirm={this.handleConfirmDate}
                                onCancel={this.hideDatePicker}
                            />
                        </View>
                        <View style={styles.inputview}>
                            <View style={{ height: hp('3.5%'), width: hp('10%'), backgroundColor: '#00C464', marginLeft: hp('3%'), marginTop: hp('-3.5%') }}>
                                <Text style={{ color: '#FFFFFF', fontSize: hp('2.5%'), textAlign: 'center' }}>Time</Text>
                            </View>
                            <TextInput
                                style={serviceTimeError == null ? styles.TextInput : styles.TextInputError}
                                defaultValue={serviceTime}
                                placeholder="HH-MM"
                                type='clear'
                                placeholderTextColor="#737373"
                                returnKeyType="next"
                                onTouchEnd={() => Keyboard.dismiss()}
                                onFocus={this.showTimePicker}
                                onChangeText={(serviceTime) => this.setServiceTime(serviceTime)}
                            />
                            <DateTimePickerModal
                                isVisible={this.state.isTimePickerVisibility}
                                mode="time"
                                onConfirm={this.handleConfirmTime}
                                onCancel={this.hideTimePicker}
                            />
                        </View>
                        <View style={styles.inputview}>
                            <View style={{ height: hp('3.5%'), width: hp('10%'), backgroundColor: '#00C464', marginLeft: hp('3%'), marginTop: hp('-3.5%') }}>
                                <Text style={{ color: '#FFFFFF', fontSize: hp('2.5%'), textAlign: 'center' }}>Address</Text>
                            </View>
                            <TextInput
                                style={userAddressError == null ? styles.TextInput : styles.TextInputError}
                                defaultValue={userAddress}
                                placeholder="Enter Address"
                                type='clear'
                                placeholderTextColor="#737373"
                                returnKeyType="next"
                                blurOnSubmit={false}
                                onSubmitEditing={() => { this.secondTextInputRef.current.focus() }}
                                onChangeText={(userAddress) => this.setAddress(userAddress)}
                            />
                        </View>
                        <View style={styles.inputview}>
                            <View style={{ height: hp('3.5%'), width: hp('10%'), backgroundColor: '#00C464', marginLeft: hp('3%'), marginTop: hp('-3.5%') }}>
                                <Text style={{ color: '#FFFFFF', fontSize: hp('2.5%'), textAlign: 'center' }}>Quantity</Text>
                            </View>
                            <TextInput
                                style={userQuentityError == null ? styles.TextInput : styles.TextInputError}
                                defaultValue={userQuentity}
                                placeholder="Quantity"
                                type='clear'
                                placeholderTextColor="#737373"
                                keyboardType="numeric"
                                returnKeyType="done"
                                ref={this.secondTextInputRef}
                                onChangeText={(userQuentity) => this.setQuentity(userQuentity)}
                                onSubmitEditing={() => this.onPressSubmit()}
                            />
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('3%') }}>
                        <TouchableOpacity style={styles.confBtn} onPress={() => this.onPressSubmit()} >
                            {loading == true ? <Loader /> : <Text style={styles.confText}>Confirm Booking</Text>}
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: hp('3%'), marginLeft: hp('3%') }}>
                        <Text style={{ fontSize: hp('3%') }}>Note :</Text>
                    </View>
                    <View style={{ marginTop: hp('1%'), marginLeft: hp('3%'), marginRight: hp('3%') }}>
                        <Text style={{ fontSize: hp('2%') }}>Price is decided by the pickup man at the time of collecting your clothes</Text>
                    </View>
                    <View style={{ marginBottom: hp('12%') }}></View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    inputview: {
        flexDirection: 'column',
        backgroundColor: "#F4F4F4",
        width: wp('90%'),
        height: hp('9%'),
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        margin: hp('3.5%'),
    },
    TextInput: {
        fontSize: hp('2.5%'),
        flex: 1,
        padding: hp('2%'),
        color: '#737373',
        backgroundColor: '#F4F4F4'
    },
    TextInputError: {
        fontSize: hp('2.5%'),
        color: '#737373',
        flex: 1,
        padding: hp('2%'),
        backgroundColor: "#F4F4F4",
        borderColor: '#FF0000',
        width: wp('90%'),
        height: hp('9%'),
        alignItems: "center",
        borderWidth: hp('0.2%')
    },
    confBtn: {
        flexDirection: 'row',
        width: wp('50%'),
        backgroundColor: "#e6fff3",
        borderRadius: wp('2%'),
        height: hp('6%'),
        alignItems: "center",
        justifyContent: "center",
    },
    confText: {
        color: '#00C464',
        fontSize: hp('2.5%'),
    },
})