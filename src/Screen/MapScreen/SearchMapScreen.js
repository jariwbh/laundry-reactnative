import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, TextInput, SafeAreaView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp, } from 'react-native-responsive-screen'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class SearchMapScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.statusbar}>
                        <TouchableOpacity onPress={() => { }}>
                            <FontAwesome5 name="search" size={20} color='#737373'
                                style={{ alignItems: "flex-end", justifyContent: 'flex-end', marginLeft: hp('2%') }} />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.statInput}
                            placeholder="Search Location"
                            type='clear'
                            placeholderTextColor="#737373"
                            returnKeyType="done"
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

export default SearchMapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
})