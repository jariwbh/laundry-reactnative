import React, { Component } from "react";
import {
    View, TouchableOpacity, Button, StyleSheet, Text, Dimensions,
    Image, FlatList, TextInput, SafeAreaView, StatusBar
} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView from "react-native-maps";
import MyPermissionController from '../../Helpers/appPermission'
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class MapScreen extends Component {
    state = {
        focusedLocation: {
            latitude: 37.7900352,
            longitude: -122.4013726,
            latitudeDelta: 0.0122,
            longitudeDelta:
                Dimensions.get("window").width /
                Dimensions.get("window").height *
                0.0122
        },
        locationChosen: false,
        Address: null,
        error: null,
        latitude: 0,
        longitude: 0,
    }

    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        });
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChosen: true
            };
        });
    };

    getLocationHandler = () => {
        Geolocation.getCurrentPosition((position) => {
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                }
            };

            var latitude = position.coords.latitude
            var longitude = position.coords.longitude
            Geocoder.init("AIzaSyAEgSROnoWhlvU0hEox7NKpXM9wRXXEfKo");
            Geocoder.from([latitude, longitude])
                .then(json => {
                    var addressComponent = json.results[0].address_components;
                    this.setState({ Address: addressComponent })
                })
                .catch(error => console.warn(error));
            this.pickLocationHandler(coordsEvent);
        },
            err => {
                console.log(err);
                alert("Fetching the Position failed, please pick one manually!");
            })
    }

    componentDidMount() {
        setTimeout(
            () =>
                MyPermissionController.checkAndRequestStoragePermission()
                    .then((granted) => console.log('>Storage Permission Granted'))
                    .catch((err) => console.log(err)),
            500,
        );
    }

    render() {
        let marker = null;

        if (this.state.locationChosen) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation} title="title"
                description="description" />;
        }

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

                <View style={styles.container}>
                    {/* <GooglePlacesAutocomplete
                        placeholder='Search'
                        onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            console.log(data, details);
                        }}
                        query={{
                            key: 'AIzaSyAEgSROnoWhlvU0hEox7NKpXM9wRXXEfKo',
                            language: 'en',
                        }}
                    /> */}
                    <MapView
                        initialRegion={this.state.focusedLocation}
                        region={!this.state.locationChosen ? this.state.focusedLocation : null}
                        style={styles.map}
                        onPress={this.pickLocationHandler}
                        ref={ref => this.map = ref}
                    >
                        {marker}
                    </MapView>
                    <TouchableOpacity style={styles.button} onPress={this.getLocationHandler}>
                        <Ionicons name="ios-locate" size={23} color='blue' />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    map: {
        width: "100%",
        height: 600
    },
    button: {
        margin: 8,
        position: 'absolute',
        top: '65%',
        alignSelf: 'flex-end',
        marginRight: '5%',
        borderRadius: 30,
        backgroundColor: 'green',
        alignItems: "center",
    },
    statusbar: {
        position: 'absolute',
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
        alignItems: "center",
    },
    statInput: {
        fontSize: hp('2.5%'),
        flex: 1,
        padding: hp('2%'),
        alignItems: "center",
    }
});