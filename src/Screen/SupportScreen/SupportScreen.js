import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
const SupportScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <MaterialCommunityIcons name="face-agent" size={100} color='#000000' />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: hp('3%'), fontWeight: 'bold' }}>We are here to help you</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', margin: hp('3%') }}>
                <Text style={{ fontSize: hp('3%'), fontWeight: '300' }}>Contact Us</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                <View style={styles.inputView}>
                    <MaterialIcons name="call" size={30} color='#000000' style={{ marginLeft: hp('2%') }} />
                    <View style={{ flexDirection: 'column', marginLeft: '10%' }}>
                        <Text style={{ fontSize: hp('2.2%') }}> Call us on</Text>
                        <Text style={{ fontSize: hp('2%') }} > +91-77788-22666</Text>
                    </View>
                    {/* <TouchableOpacity onPress={() => { Linking.openURL('tel:+91-77788-22666') }}
                        style={{ width: wp('25%'), height: hp('7%'), marginRight: hp('2%'), backgroundColor: '#00C464', borderRadius: hp('3%'), alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: hp('3%') }}>Call now</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('-3%') }}>
                <View style={styles.inputView}>
                    <MaterialIcons name="email" size={30} color='#000000' style={{ marginLeft: hp('2%') }} />
                    <View style={{ flexDirection: 'column', marginLeft: '10%' }}>
                        <Text style={{ fontSize: hp('2.5%') }}> Email us on</Text>
                        <Text style={{ fontSize: hp('2%') }}> contact@membroz.com</Text>
                    </View>
                    {/* <TouchableOpacity onPress={() => Linking.openURL('mailto:contact@membroz.com')}
                        style={{ width: wp('25%'), height: hp('7%'), marginRight: hp('2%'), backgroundColor: '#00C464', borderRadius: hp('3%'), alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', fontSize: hp('3%') }}>Email</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SupportScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    inputView: {
        flexDirection: 'row',
        backgroundColor: "#FFFFFF",
        borderRadius: hp('0.5%'),
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        borderColor: '#FFFFFF',
        width: wp('95%'),
        height: hp('13%'),
        margin: hp('3%'),
        alignItems: "center",
        justifyContent: 'flex-start'
    },

})