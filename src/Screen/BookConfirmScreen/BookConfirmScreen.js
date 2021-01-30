import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default class BookConfirmScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../../assets/Image/Login.png')} style={styles.backgroundImage}>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ marginTop: hp('5%'), marginLeft: hp('3%') }} >
                            <MaterialIcons name="arrow-back" size={24} color="#000000" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('20%') }}>
                        <Image source={require('../../../assets/Image/Oval3.png')} style={{
                            marginTop: hp('0%'), width: wp('12.5%'), height: hp('7%'),
                        }} />
                        <AntDesign name="check" size={30} color='#FFFFFF' style={{ position: 'absolute' }} />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('4%') }}>
                        <Text style={{ fontSize: hp('2.5%') }}> Booking Confirmed </Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%'), marginRight: hp('3%'), marginLeft: hp('3%') }}>
                        <Text style={{ fontSize: hp('2.5%'), textAlign: 'center' }}> Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus. Donec ullamcorper nulla non metus auctor fringilla. </Text>
                    </View>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('4%') }} onPress={() => this.props.navigation.navigate('HomeScreen')}>
                        <Text style={{ fontSize: hp('2.5%'), color: 'red' }}> Close </Text>
                    </TouchableOpacity>
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
})