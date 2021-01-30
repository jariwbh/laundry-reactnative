import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Entypo } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

export default class BookScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ marginTop: hp('5%'), flexDirection: 'row', justifyContent: 'space-between', marginLeft: hp('2%'), marginRight: hp('2%') }}>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{}} >
                            <MaterialIcons name="arrow-back" size={24} color="#000000" />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold' }}>Washing</Text>
                    <Entypo name="bell" size={30} color='#000000' style={{}} />
                </View>
                <View style={{ marginTop: hp('5%'), justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.inputview}>
                        <View style={{ height: hp('3.5%'), width: hp('10%'), backgroundColor: '#00C464', marginLeft: hp('3%'), position: 'absolute', marginTop: hp('-2%') }}>
                            <Text style={{ color: '#FFFFFF', fontSize: hp('2.5%'), textAlign: 'center' }}>When</Text>
                        </View>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Today(Date&Time)"
                        />
                    </View>
                    <View style={styles.inputview}>
                        <View style={{ height: hp('3.5%'), width: hp('10%'), backgroundColor: '#00C464', marginLeft: hp('3%'), position: 'absolute', marginTop: hp('-2%') }}>
                            <Text style={{ color: '#FFFFFF', fontSize: hp('2.5%'), textAlign: 'center' }}>From</Text>
                        </View>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Adress"
                        />
                    </View>
                    <View style={styles.inputview}>
                        <View style={{ height: hp('3.5%'), width: hp('10%'), backgroundColor: '#00C464', marginLeft: hp('3%'), position: 'absolute', marginTop: hp('-2%') }}>
                            <Text style={{ color: '#FFFFFF', fontSize: hp('2.5%'), textAlign: 'center' }}>Quantity</Text>
                        </View>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Quantity"
                        />
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('3%') }}>
                    <TouchableOpacity style={styles.confBtn} onPress={() => this.props.navigation.navigate('BookConfirmScreen')} >
                        <Text style={styles.confText}>Confirm Booking</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: hp('3%'), marginLeft: hp('3%') }}>
                    <Text style={{ fontSize: hp('3%') }}>Note :</Text>
                </View>
                <View style={{ marginTop: hp('1%'), marginLeft: hp('3%'), marginRight: hp('3%') }}>
                    <Text style={{ fontSize: hp('2%') }}>Price is decided by the pickup man at the time of collecting your clothes</Text>
                </View>
            </View>
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
        fontSize: hp('2%'),
        flex: 1,
        padding: hp('2%'),
        color: '#193628'
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