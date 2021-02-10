import React from "react";
import {
    View, TouchableOpacity, Button, StyleSheet, Text, Dimensions,
    Image, FlatList, TextInput, SafeAreaView, StatusBar, BackHandler, ToastAndroid
} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView from "react-native-maps";
import MyPermissionController from '../../Helpers/appPermission'
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import AsyncStorage from '@react-native-community/async-storage'
import { UpdateUserService } from '../../Services/UserService/UserService';
import Loader from '../../Components/Loader/LoaderMap'
var { width, height } = Dimensions.get('window')

export default class MapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.locationdata = this.props.route.params ? this.props.route.params.location.description : null;
        this.state = {
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
            Address: this.locationdata,
            error: null,
            latitude: 0,
            longitude: 0,
            userDetails: null,
            _id: null,
            loading: false
        };

        this._unsubscribeSiFocus = this.props.navigation.addListener('focus', e => {
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        });

        this._unsubscribeSiBlur = this.props.navigation.addListener('blur', e => {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton,
            );
        });
    }

    pickLocationHandler = event => {
        console.log('event', event)
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
            let latitude = position.coords.latitude
            let longitude = position.coords.longitude

            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: latitude,
                        longitude: longitude
                    }
                }
            };

            Geocoder.init("AIzaSyAEgSROnoWhlvU0hEox7NKpXM9wRXXEfKo");
            Geocoder.from([latitude, longitude])
                .then(json => {
                    var addressComponent = json.results[0].address_components;
                    var longAddress = Array.prototype.map.call(addressComponent, Loc => Loc.long_name).toString();
                    this.locationdata = longAddress
                    this.setState({ Address: longAddress })
                    this.pickLocationHandler(coordsEvent);
                })
                .catch(error => console.warn(error));
        },
            err => {
                console.log(err);
                alert("Fetching the Position failed, please pick one manually!");
            })
    }

    getLocationFirstTime() {
        let latitude;
        let longitude;
        let coordsEvent = {
            nativeEvent: {
                coordinate: {
                    latitude: latitude,
                    longitude: longitude
                }
            }
        };

        Geocoder.init("AIzaSyAEgSROnoWhlvU0hEox7NKpXM9wRXXEfKo");
        Geocoder.from(`${this.locationdata}`)
            .then(json => {
                var location = json.results[0].geometry.location;
                coordsEvent.nativeEvent.coordinate.latitude = location.lat;
                coordsEvent.nativeEvent.coordinate.longitude = location.lng;
                this.pickLocationHandler(coordsEvent);
            })
            .catch(error => console.warn(error));
    }

    checkPermisssion() {
        setTimeout(
            () =>
                MyPermissionController.checkAndRequestStoragePermission()
                    .then((granted) => console.log('>Storage Permission Granted'))
                    .catch((err) => console.log(err)),
            500,
        );
    }

    componentDidMount() {
        this.getdata();
        this.checkPermisssion();
        this.getLocationFirstTime();
    }

    authenticateUser = (user) => {
        AsyncStorage.setItem('@authuserlaundry', JSON.stringify(user));
    }

    onPressSubmit() {
        const { userDetails, Address, loading } = this.state;
        if (!this.locationdata || !this.state.Address) {
            return alert("Fetching the Position failed, Please Select Location!");
        }
        this.setState({ loading: true })
        userDetails.property.address = Address
        try {
            UpdateUserService(userDetails).then(response => {
                if (response != null) {
                    this.authenticateUser(response)
                    ToastAndroid.show("Your Location Update!", ToastAndroid.SHORT);
                    this.props.navigation.navigate('TabNavigation')
                }
            })
        }
        catch (error) {
            this.setState({ loading: false })
            console.log('error', error)
            ToastAndroid.show("Your Location Not Update!", ToastAndroid.SHORT)
        }
    }

    getdata = async () => {
        var getUser = await AsyncStorage.getItem('@authuserlaundry')
        if (getUser == null) {
            setTimeout(() => {
                this.setState({ loader: false })
                this.props.navigation.replace('LoginScreen')
            }, 3000);
        } else {
            var userData;
            userData = JSON.parse(getUser)
            this.setState({ _id: userData._id, userDetails: userData })
        }
    }

    componentWillUnmount() {
        this._unsubscribeSiFocus();
        this._unsubscribeSiBlur();
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        BackHandler.exitApp()
        return true;
    }

    render() {
        let marker = null;
        if (this.state.locationChosen) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
        }
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.statusbar}>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('SearchMapScreen') }}>
                                <Ionicons name="ios-location-sharp" size={23} color='#737373'
                                    style={{ alignItems: "flex-end", justifyContent: 'flex-end', marginLeft: hp('2%') }} />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.statInput}
                                defaultValue={this.locationdata}
                                placeholder="Search Location"
                                type='clear'
                                placeholderTextColor="#737373"
                                returnKeyType="done"
                                onTouchStart={() => this.props.navigation.navigate('SearchMapScreen')}
                            />
                        </View>
                        <TouchableOpacity style={styles.button} onPress={this.getLocationHandler}>
                            <Ionicons name="ios-locate" size={30} color='#000000' />
                        </TouchableOpacity>
                    </View>
                    <MapView
                        initialRegion={this.state.focusedLocation}
                        region={!this.state.locationChosen ? this.state.focusedLocation : null}
                        style={styles.mapcontainer}
                        onPress={this.pickLocationHandler}
                        ref={ref => this.map = ref}
                    >
                        {marker}
                    </MapView>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('3%') }}>
                        <TouchableOpacity style={this.state.Address == null ? styles.locationbtnError : styles.locationbtn} onPress={() => this.onPressSubmit()} disabled={this.state.Address == null ? true : false}>
                            {this.state.loading == true ? <Loader /> : <Text style={styles.locationText}>Done</Text>}
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    mapcontainer: {
        marginTop: 20,
        width: width,
        height: height - 180,
    },
    button: {
        margin: 8,
        alignSelf: 'flex-end',
        marginRight: '3%',
        alignItems: "center",
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
        width: wp('82%'),
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
    },
    locationbtn: {
        flexDirection: 'row',
        width: wp('100%'),
        backgroundColor: "#00C464",
        borderRadius: wp('2%'),
        height: hp('7%'),
        alignItems: "center",
        justifyContent: "center",
    },
    locationbtnError: {
        flexDirection: 'row',
        width: wp('100%'),
        backgroundColor: "#b3ffda",
        borderRadius: wp('2%'),
        height: hp('7%'),
        alignItems: "center",
        justifyContent: "center",
    },
    locationText: {
        color: '#FFFFFF',
        fontSize: hp('3%'),
    },
});