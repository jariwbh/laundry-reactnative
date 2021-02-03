import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import HTML from 'react-native-render-html'

export default class ServiceDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.ServiceDetails = this.props.route.params.item
        this.state = {
            ServiceDetails: this.ServiceDetails
        };
    }

    onPressBookNow(ServiceDetail) {
        this.props.navigation.navigate('BookScreen', { ServiceDetail })
    }

    render() {
        const { ServiceDetails } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: 'center', marginTop: hp('1%'), marginBottom: hp('3%'), }}>
                        <Image source={{ uri: ServiceDetails.gallery[0].attachment }} style={{
                            marginTop: hp('0%'), width: wp('100%'), height: hp('40%')
                        }} />
                    </View>
                    <View>
                        <View style={{ marginTop: hp('1%'), marginLeft: hp('3%') }}>
                            <Text style={{ fontSize: hp('2.5%'), fontWeight: '600', textTransform: 'capitalize' }}>{ServiceDetails.title}</Text>
                        </View>
                        <View style={{ marginTop: hp('1%'), marginLeft: hp('3%'), marginRight: hp('3%') }}>
                            <HTML baseFontStyle={{ fontSize: hp('2%'), textTransform: 'capitalize' }} html={`<html> ${ServiceDetails.description} </html>`} />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('3%') }}>
                            <TouchableOpacity style={styles.booknow} onPress={() => this.onPressBookNow(ServiceDetails)}>
                                <Text style={styles.booknowText}>Book Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    backIcon: {
        width: wp("7%"),
        height: wp("7%"),
        borderRadius: hp('6%'),
        marginTop: hp('5%'),
        marginLeft: hp('3%'),
        alignItems: 'center',
        justifyContent: 'center'
    }, booknow: {
        flexDirection: 'row',
        width: wp('80%'),
        backgroundColor: "#00C464",
        borderRadius: wp('2%'),
        height: hp('7%'),
        alignItems: "center",
        justifyContent: "center",
    },
    booknowText: {
        color: '#FFFFFF',
        fontSize: hp('3%'),
    },
})