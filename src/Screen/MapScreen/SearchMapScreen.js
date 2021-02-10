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
        this.state = {
            location: null
        }
    }

    async onPressToMapScreen(location) {
        this.setlocation = location
        this.setState({ location: location })
    }

    async onPressSubmit() {
        if (this.state.location == null && this.state.location == undefined) {
            alert('Search Location.')
        } else {
            var location = this.setlocation
            await this.props.navigation.replace('MapScreen', { location })
        }
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
                                errorStyle: { color: 'red' }
                            }}
                        />

                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('3%') }}>
                            <TouchableOpacity style={this.state.location == null ? styles.update_BtnError : styles.update_Btn} onPress={() => this.onPressSubmit()} disabled={this.state.location == null ? true : false}>
                                <Text style={styles.update_text}>GO</Text>
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
        padding: hp('2%'),
        alignItems: "center",
    },
    update_Btn: {
        flexDirection: 'row',
        width: wp('50%'),
        backgroundColor: "#00C464",
        borderRadius: wp('2%'),
        height: hp('7%'),
        alignItems: "center",
        justifyContent: "center",
    },
    update_BtnError: {
        flexDirection: 'row',
        width: wp('50%'),
        backgroundColor: "#b3ffda",
        borderRadius: wp('2%'),
        height: hp('7%'),
        alignItems: "center",
        justifyContent: "center",
    },
    update_text: {
        color: '#FFFFFF',
        fontSize: hp('2.5%'),
    },
})
