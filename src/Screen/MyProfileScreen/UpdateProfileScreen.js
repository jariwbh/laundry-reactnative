import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class UpdateProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ marginTop: hp('5%'), flexDirection: 'row', justifyContent: 'space-between', marginLeft: hp('2%'), marginRight: hp('2%') }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                        <Ionicons name="arrow-back" size={30} color='#000000' style={{}} />
                    </TouchableOpacity>
                    <Text style={{ fontSize: hp('2.5%'), }}>Profile</Text>
                    <TouchableOpacity>
                        <Text style={{ fontSize: hp('2.5%'), color: '#00C464' }}>Edit</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.profileView}>
                    <View style={{ marginTop: hp('0%'), margin: hp('1%'), justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../../assets/Image/1.jpg')} style={{
                            marginTop: hp('0%'), width: 100, height: 100, borderRadius: hp('7%'), marginLeft: hp('0%')
                        }}
                        />
                    </View>
                    <View style={{ margin: hp('0.5%'), justifyContent: 'center', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontSize: hp('2.5%'), }} >Phillip Mathis </Text>
                        </View>
                    </View>
                    <View style={{ margin: hp('0.5%'), justifyContent: 'center', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontSize: hp('2%'), }} >Phone Number </Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontSize: hp('2%'), }} >Address </Text>
                        </View>
                    </View>
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
    profileView: {
        marginTop: hp('10%'),
    },
})