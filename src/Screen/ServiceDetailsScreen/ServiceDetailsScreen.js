import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class ServiceDetailsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('BookScreen')} style={{ alignItems: 'center', marginTop: hp('1%'), marginBottom: hp('3%'), }}>
                    <Image source={require('../../assets/Image/1.jpg')} style={{
                        marginTop: hp('0%'), width: wp('100%'), height: hp('40%'),
                    }}
                    />
                    <View>
                        <TouchableOpacity style={styles.backIcon} onPress={() => this.props.navigation.goBack()} style={{ position: 'relative', marginTop: hp('-36%'), marginLeft: hp('-25%') }} >
                            <MaterialIcons name="arrow-back" size={24} color="#000000" />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <View style={{ marginTop: hp('1%'), marginLeft: hp('3%') }}>
                    <Text style={{ fontSize: hp('2.5%'), fontWeight: 'bold' }}>Hand Wash</Text>
                </View>
                <View style={{ marginTop: hp('1%'), marginLeft: hp('3%'), marginRight: hp('3%') }}>
                    <Text style={{ fontSize: hp('2%'), fontWeight: '600' }}>Maecenas faucibus mollis interdum. Cras mattis consectetur purus sit amet fermentum. Nullam quis risus eget urna mollis ornare vel eu leo. Aenean lacinia bibendum nulla sed consectetur.</Text>
                </View>
                <View style={{ marginTop: hp('1%'), marginLeft: hp('3%') }}>
                    <Text style={{ fontSize: hp('2.5%'), fontWeight: 'bold' }}>Advantage</Text>
                </View>
                <View style={{ marginTop: hp('1%'), marginLeft: hp('3%'), marginRight: hp('3%') }}>
                    <Text style={{ fontSize: hp('2%'), fontWeight: '600' }}>Maecenas faucibus mollis interdum.</Text>
                    <Text style={{ fontSize: hp('2%'), fontWeight: '600' }}>Fusce dapibus, tellus ac cursus commodo, tortor.</Text>
                    <Text style={{ fontSize: hp('2%'), fontWeight: '600' }}>Mauris condimentum nibh, ut fermentum massa.</Text>
                </View>
                <View style={{ marginTop: hp('1%'), marginLeft: hp('3%') }}>
                    <Text style={{ fontSize: hp('2.5%'), fontWeight: 'bold' }}>Drawbacks</Text>
                </View>
                <View style={{ marginTop: hp('1%'), marginLeft: hp('3%'), marginRight: hp('3%') }}>
                    <Text style={{ fontSize: hp('2%'), fontWeight: '600' }}>Maecenas faucibus mollis interdum.</Text>
                    <Text style={{ fontSize: hp('2%'), fontWeight: '600' }}>Fusce dapibus, tellus ac cursus commodo, tortor.</Text>
                </View>
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
    }
})