import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, TextInput, SafeAreaView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
navigator.geolocation = require('react-native-geolocation-service');
import { Input } from 'react-native-elements';

class SearchMapScreen extends Component {
    constructor(props) {
        super(props);
        this.setlocation = null
    }

    async onPressToMapScreen(location) {
        this.setlocation = location
    }

    async onPressSubmit() {
        var location = this.setlocation
        console.log('location', location)
        await this.props.navigation.replace('MapScreen', { location })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
                        <GooglePlacesAutocomplete
                            placeholder='Search Location'
                            onPress={(data, details = null) => {
                                this.onPressToMapScreen(data);
                            }}
                            query={{
                                key: 'AIzaSyAEgSROnoWhlvU0hEox7NKpXM9wRXXEfKo',
                                language: 'en',
                            }}
                            textInputProps={{
                                InputComp: Input,
                                errorStyle: { color: 'red' },
                            }}
                        />
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}>
                            <TouchableOpacity style={styles.update_Btn} onPress={() => this.onPressSubmit()}>
                                <Text style={styles.update_text} >GO</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default SearchMapScreen;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
    },
    statusbar: {
        flexDirection: 'row',
        borderRadius: hp('1%'),
        backgroundColor: "#fff",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        marginTop: hp('2%'),
        width: wp('90%'),
        height: hp('8%'),
        marginLeft: hp('2.5%'),
        justifyContent: "flex-end",
        alignItems: "center"
    },
    statInput: {
        fontSize: hp('2.5%'),
        flex: 1,
        padding: hp('2%'),
        alignItems: "center",
    },
    update_Btn: {
        flexDirection: 'row',
        width: wp('15%'),
        backgroundColor: "#e6fff3",
        borderRadius: wp('2%'),
        height: hp('7%'),
        alignItems: "center",
        justifyContent: "center",
        marginBottom: hp('20%')
    },
    update_text: {
        color: '#00C464',
        fontSize: hp('2.5%'),
    },
})
