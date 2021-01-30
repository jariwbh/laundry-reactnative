import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Entypo } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

export default class HomeScreen extends Component {
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
                    <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold' }}>Our Services</Text>
                    <Entypo name="bell" size={30} color='#000000' style={{}} />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: 'center', marginTop: hp('1%'), flex: 1, }}>
                        <View style={styles.listview}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ServiceDetailsScreen')}>
                                <Image source={require('../../../assets/Image/1.jpg')} style={{
                                    marginTop: hp('0%'), width: wp('93%'), height: hp('30%'), borderRadius: hp('2%')
                                }}
                                />
                                <View style={{ marginTop: hp('1%'), marginLeft: hp('1%') }}>
                                    <Text style={{ fontSize: hp('2.5%'), fontWeight: '600' }}>Hand Wash</Text>
                                </View>
                                <View style={{ marginTop: hp('1%'), marginLeft: hp('1%'), marginRight: hp('1%') }}>
                                    <Text style={{ fontSize: hp('2%'), fontWeight: '600' }}>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam quis risus eget urna mollis ornare vel eu leo.</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: hp('0%'), marginBottom: hp('3%'), flex: 1 }}>
                        <View style={styles.listview}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ServiceDetailsScreen')}>
                                <Image source={require('../../../assets/Image/1.jpg')} style={{
                                    marginTop: hp('0%'), width: wp('93%'), height: hp('30%'), borderRadius: hp('2%')
                                }}
                                />
                                <View style={{ marginTop: hp('1%'), marginLeft: hp('1%') }}>
                                    <Text style={{ fontSize: hp('2.5%'), fontWeight: '600' }}>Hand Wash</Text>
                                </View>
                                <View style={{ marginTop: hp('1%'), marginLeft: hp('1%'), marginRight: hp('1%') }}>
                                    <Text style={{ fontSize: hp('2%'), fontWeight: '600' }}>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam quis risus eget urna mollis ornare vel eu leo.</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ marginBottom: hp('4%') }}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    menu: {
        height: hp('5%'),
        width: wp('10%'),
        backgroundColor: '#FFFFFF',
        borderRadius: hp('7%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: hp('2%'),
    },
    listview: {
        flexDirection: 'column',
        borderRadius: hp('2%'),
        backgroundColor: "#FFFFFF",
        width: wp('93%'),
        height: hp('45%'),
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        margin: hp('1%')
    },
})