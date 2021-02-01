import React from "react";
import { View, Text, TouchableOpacity, Animated, ScrollView, Image, Dimensions, StyleSheet, SafeAreaView } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Entypo from 'react-native-vector-icons/Entypo';
const { width } = Dimensions.get("window");

export default class App extends React.Component {
    state = {
        active: 0,
        xTabOne: 0,
        xTabTwo: 0,
        xTabThree: 0,
        translateX: new Animated.Value(0),
        translateXTabOne: new Animated.Value(0),
        translateXTabTwo: new Animated.Value(width),
        translateXTabThree: new Animated.Value(width),
        translateY: -5000
    };

    handleSlide = type => {
        let { active, xTabOne, xTabTwo, xTabThree, translateXTabThree, translateX, translateXTabOne, translateXTabTwo } = this.state;
        Animated.spring(translateX, { toValue: type, duration: 100 }).start();
        if (active === 0) {
            Animated.parallel([
                Animated.spring(translateXTabOne, { toValue: 0, duration: 100 }).start(),
                Animated.spring(translateXTabTwo, { toValue: width, duration: 100 }).start(),
                Animated.spring(translateXTabThree, { toValue: width, duration: 100 }).start()
            ]);
        } else {
            Animated.parallel([
                Animated.spring(translateXTabOne, { toValue: -width, duration: 100 }).start(),
                Animated.spring(translateXTabTwo, { toValue: 0, duration: 100 }).start(),
                Animated.spring(translateXTabThree, { toValue: 0, duration: 100 }).start()
            ]);
        }
    };

    render() {
        let { xTabOne, xTabTwo, xTabThree, translateXTabThree, translateX, active, translateXTabOne, translateXTabTwo, translateY } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ marginTop: hp('5%'), flexDirection: 'row', justifyContent: 'space-between', marginLeft: hp('2%'), marginRight: hp('2%') }}>
                    <Text style={{ fontSize: hp('3.5%'), fontWeight: 'bold' }}>History</Text>
                    <Entypo name="bell" size={30} color='#000000' style={{}} />
                </View>
                <View style={{ marginTop: hp('3%'), marginLeft: hp('2%'), marginRight: hp('2%') }}>
                    <Text style={{ fontSize: hp('2%'), color: '#193628' }}>Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum.</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
                        <View style={{ flexDirection: "row", marginTop: 40, marginBottom: 20, height: 36, position: "relative" }}>
                            <Animated.View
                                style={{
                                    position: "absolute", width: "50%", height: "100%", top: 0, left: 0, backgroundColor: "#00C464",
                                    transform: [{ translateX }]
                                }} />
                            <TouchableOpacity
                                style={{ flex: 1, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#00C464", }}
                                onLayout={event => this.setState({ xTabOne: event.nativeEvent.layout.x })}
                                onPress={() => this.setState({ active: 0 }, () => this.handleSlide(xTabOne))}>
                                <Text style={{ color: active === 0 ? "#fff" : "#00C464" }}> All</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ flex: 1, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#00C464", }}
                                onLayout={event => this.setState({ xTabTwo: event.nativeEvent.layout.x })}
                                onPress={() => this.setState({ active: 1 }, () => this.handleSlide(xTabTwo))} >
                                <Text style={{ color: active === 1 ? "#fff" : "#00C464" }} > In Progress </Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity
                                style={{
                                    flex: 1, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#00C464",
                                }}
                                onLayout={event => this.setState({ xTabThree: event.nativeEvent.layout.x })}
                                onPress={() => this.setState({ active: 3 }, () => this.handleSlide(xTabThree))}>
                                <Text style={{ color: active === 3 ? "#fff" : "#00C464" }}>Deliver</Text>
                            </TouchableOpacity> */}
                        </View>

                        <ScrollView
                            showsVerticalScrollIndicator={false}>
                            <Animated.View
                                style={{
                                    justifyContent: "center", alignItems: "center",
                                    transform: [{ translateX: translateXTabOne }]
                                }}
                                onLayout={event => this.setState({ translateY: event.nativeEvent.layout.height })}>
                                <View style={styles.Allview}>
                                    <View style={{ marginTop: hp('1%'), marginLeft: hp('1%') }}>
                                        <Text style={{ fontSize: hp('2%'), color: '#193628' }}>12th June 2018, 09:30 AM</Text>
                                    </View>
                                    <View style={{ marginTop: hp('1%'), marginLeft: hp('1%'), flexDirection: 'row', justifyContent: 'space-between', marginRight: hp('1%') }}>
                                        <Text style={{ fontSize: hp('2%'), color: '#193628' }}>10 Quantity</Text>
                                        <Text style={{ fontSize: hp('2%'), color: '#FF5555' }}>Yet to pickup</Text>
                                    </View>
                                </View>
                                <View style={styles.Allview}>
                                    <View style={{ marginTop: hp('1%'), marginLeft: hp('1%') }}>
                                        <Text style={{ fontSize: hp('2%'), color: '#193628' }}>24th May 2018, 05:00 PM</Text>
                                    </View>
                                    <View style={{ marginTop: hp('1%'), marginLeft: hp('1%'), flexDirection: 'row', justifyContent: 'space-between', marginRight: hp('1%') }}>
                                        <Text style={{ fontSize: hp('2%'), color: '#193628' }}>4 Quantity</Text>
                                        <Text style={{ fontSize: hp('2%'), color: '#193628' }}>3rd Ironoing</Text>
                                    </View>
                                </View>
                                <View style={styles.Allview}>
                                    <View style={{ marginTop: hp('1%'), marginLeft: hp('1%') }}>
                                        <Text style={{ fontSize: hp('2%'), color: '#193628' }}>11th Jan 2018, 03:30 PM</Text>
                                    </View>
                                    <View style={{ marginTop: hp('1%'), marginLeft: hp('1%'), flexDirection: 'row', justifyContent: 'space-between', marginRight: hp('1%') }}>
                                        <Text style={{ fontSize: hp('2%'), color: '#193628' }}>4 Quantity</Text>
                                        <Text style={{ fontSize: hp('2%'), color: '#00C464' }}>Completed</Text>
                                    </View>
                                    <View style={{ marginTop: hp('1%'), marginLeft: hp('1%'), flexDirection: 'row', justifyContent: 'space-between', marginRight: hp('1%') }}>
                                        <Text style={{ fontSize: hp('2%'), color: '#193628' }}>Total</Text>
                                        <Text style={{ fontSize: hp('2%'), color: '#193628' }}>₹1000</Text>
                                        <Text style={{ fontSize: hp('2%'), color: '#FF1313' }}>Pending Payment</Text>
                                    </View>
                                </View>
                                <View style={styles.Allview}>
                                    <View style={{ marginTop: hp('1%'), marginLeft: hp('1%') }}>
                                        <Text style={{ fontSize: hp('2%'), color: '#193628' }}>24th May 2018, 05:00 PM</Text>
                                    </View>
                                    <View style={{ marginTop: hp('1%'), marginLeft: hp('1%'), flexDirection: 'row', justifyContent: 'space-between', marginRight: hp('1%') }}>
                                        <Text style={{ fontSize: hp('2%'), color: '#193628' }}>4 Quantity</Text>
                                        <Text style={{ fontSize: hp('2%'), color: '#00C464' }}>Delivered</Text>
                                    </View>
                                </View>
                            </Animated.View>
                            <Animated.View
                                style={{
                                    justifyContent: "center", alignItems: "center",
                                    transform: [{ translateX: translateXTabTwo }, { translateY: -translateY }]
                                }}>
                                <View style={styles.Allview}>
                                    <View style={{ marginTop: hp('1%'), marginLeft: hp('1%') }}>
                                        <Text style={{ fontSize: hp('2%'), color: '#193628' }}>18th Feb 2018, 03:30 PM</Text>
                                    </View>
                                    <View style={{ marginTop: hp('1%'), marginLeft: hp('1%'), flexDirection: 'row', justifyContent: 'space-between', marginRight: hp('1%') }}>
                                        <Text style={{ fontSize: hp('2%'), color: '#193628' }}>4 Quantity</Text>
                                        <Text style={{ fontSize: hp('2%'), color: '#193628' }}>3rd Ironong</Text>
                                    </View>
                                    <View style={{ marginTop: hp('1%'), marginLeft: hp('1%'), flexDirection: 'row', justifyContent: 'space-between', marginRight: hp('1%') }}>
                                        <Text style={{ fontSize: hp('2%'), color: '#193628' }}>Total</Text>
                                        <Text style={{ fontSize: hp('2%'), color: '#193628' }}>₹1000</Text>
                                        <Text style={{ fontSize: hp('2%'), color: '#FF1313' }}>Pending Payment</Text>
                                    </View>
                                </View>
                                <View style={styles.Allview}>
                                    <View style={{ marginTop: hp('1%'), marginLeft: hp('1%') }}>
                                        <Text style={{ fontSize: hp('2%'), color: '#193628' }}>11th Jan 2018, 03:30 PM</Text>
                                    </View>
                                    <View style={{ marginTop: hp('1%'), marginLeft: hp('1%'), flexDirection: 'row', justifyContent: 'space-between', marginRight: hp('1%') }}>
                                        <Text style={{ fontSize: hp('2%'), color: '#193628' }}>4 Quantity</Text>
                                        <Text style={{ fontSize: hp('2%'), color: '#00C464' }}>Completed</Text>
                                    </View>
                                    <View style={{ marginTop: hp('1%'), marginLeft: hp('1%'), flexDirection: 'row', justifyContent: 'space-between', marginRight: hp('1%') }}>
                                        <Text style={{ fontSize: hp('2%'), color: '#193628' }}>Total</Text>
                                        <Text style={{ fontSize: hp('2%'), color: '#193628' }}>₹5000</Text>
                                        <Text style={{ fontSize: hp('2%'), color: '#FF1313' }}>Pending Payment</Text>
                                    </View>
                                </View>
                            </Animated.View>
                            {/* <Animated.View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    transform: [
                                        {
                                            translateX: translateXTabThree
                                        },
                                        {
                                            translateX: translateXTabTwo
                                        },
                                        {
                                            translateY: -translateY
                                        }
                                    ]
                                }}
                            >
                            </Animated.View> */}
                        </ScrollView>
                    </View>
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
    Allview: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#FFFFFF",
        width: wp('90%'),
        height: hp('13%'),
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        margin: hp('1%'),
    },
})