import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, TextInput, SafeAreaView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import MapView, { Marker } from 'react-native-maps';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const MapScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.statusbar}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('SearchMapScreen') }}>
                        <FontAwesome5 name="search" size={20} color='#737373'
                            style={{ alignItems: "flex-end", justifyContent: 'flex-end', marginLeft: hp('2%') }} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.statInput}
                        placeholder="Search Location"
                        type='clear'
                        placeholderTextColor="#737373"
                        returnKeyType="done"
                        onTouchStart={() => this.props.navigation.navigate('SearchMapScreen')}
                    />
                </View>
                <MapView
                    style={styles.mapStyle}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <Marker
                        draggable
                        coordinate={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        }}
                    />
                </MapView>
            </View>
        </SafeAreaView>
    )
}

export default MapScreen

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FFFFFF'
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
    mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
})
