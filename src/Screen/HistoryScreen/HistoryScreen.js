import React from "react";
import { View, Text, TouchableOpacity, Animated, ScrollView, Image, Dimensions, StyleSheet, SafeAreaView } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Entypo from 'react-native-vector-icons/Entypo';
const { width } = Dimensions.get("window");
import moment from 'moment'
import { BookHistoryService } from '../../Services/BookHistoryService/BookHistoryService';
import AsyncStorage from '@react-native-community/async-storage'
import Loading from '../../Components/Loader/Loading'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.userid = null;
        this.state = {
            _id: null,
            BookHistoryService: [],
            refreshing: false,
            loader: true,
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
    }

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

    getdata = async () => {
        var getUser = await AsyncStorage.getItem('@authuserlaundry')
        if (getUser == null) {
            setTimeout(() => {
                this.props.navigation.replace('LoginScreen')
            }, 5000);
        } else {
            this.userid = JSON.parse(getUser)
            this.BookHistoryService(this.userid._id)
            this.setState({ _id: this.userid._id })
        }
    }

    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    onRefresh = () => {
        const { _id } = this.state;
        this.setState({ refreshing: true })
        this.BookHistoryService(_id)
        this.wait(3000).then(() => this.setState({ refreshing: false }));
    }

    componentDidMount() {
        this.getdata()
    }

    BookHistoryService(id) {
        BookHistoryService(id).then(data => {
            this.setState({ BookHistoryService: data })
            this.wait(1000).then(() => this.setState({ loader: false }));
        })
    }

    renderBookService = ({ item }) => (
        <View style={{ alignItems: 'center', marginBottom: hp('3%'), flex: 1 }}>
            <View style={styles.listview}>
                <Text style={{ fontSize: hp('2.5%'), marginLeft: hp('2.2%') }}>{item.refid.resortid.resortname}</Text>
                <Text style={{ fontSize: hp('2%'), marginLeft: hp('2.2%'), color: '#605C5C' }}>{item.refid.resortid.property.address.length < 40 ? `${item.refid.resortid.property.address}` : `${item.refid.resortid.property.address.substring(0, 40)}...`}</Text>
                <Text style={styles.bookingtext}> BOOKING ID #{item.prefix + item.bookingnumber + ' ' + '(' + item.refid.title + ')'} </Text>
                <View style={{ marginLeft: hp('2%') }}>
                    <Image source={{ uri: (item.refid.gallery[0].attachment ? item.refid.gallery[0].attachment : 'https://www.icon0.com/static2/preview2/stock-photo-photo-icon-illustration-design-70325.jpg') }}
                        style={{ alignItems: 'center', height: hp('30%'), width: wp('85%'), marginTop: hp('1%'), borderRadius: hp('2%') }} />
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: hp('2%'), color: "black", paddingTop: hp('1%'), marginLeft: hp('2%') }}> CHECKIN - {moment(item.checkin).format('ll')}</Text>
                        <Text style={{ marginTop: hp('1%'), marginRight: hp('5%'), fontSize: hp('3%') }}>₹ {item.refid.charges}</Text>
                    </View>
                    <TouchableOpacity style={styles.chargestext}>
                        <Text style={{ fontSize: hp('2%'), color: "black", marginLeft: hp('2%'), marginTop: hp('-0.5%'), }}> CHECKOUT - {moment(item.checkout).format('ll')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    render() {
        const { BookHistoryService, refreshing, loader } = this.state;
        this.wait(3000).then(() => this.setState({ refreshing: false }));
        const { xTabOne, xTabTwo, xTabThree, translateX, active, translateXTabOne, translateXTabTwo, translateXTabThree, translateY } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1 }}>
                    <View style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
                        <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 20, height: 36, position: "relative" }}>
                            <Animated.View
                                style={{
                                    position: "absolute", width: "33%", height: "100%", top: 0, left: 0, backgroundColor: "#00C464",
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

                            <TouchableOpacity
                                style={{ flex: 1, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#00C464", }}
                                onLayout={event => this.setState({ xTabThree: event.nativeEvent.layout.x })}
                                onPress={() => this.setState({ active: 2 }, () => this.handleSlide(xTabThree))}>
                                <Text style={{ color: active === 2 ? "#fff" : "#00C464" }}>Deliver</Text>
                            </TouchableOpacity>
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

                            <Animated.View
                                style={{
                                    justifyContent: "center", alignItems: "center",
                                    transform: [{ translateX: translateXTabThree }, { translateY: -translateY }]
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
                            </Animated.View>
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