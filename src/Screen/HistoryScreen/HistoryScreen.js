import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, StyleSheet, SafeAreaView, FlatList, RefreshControl } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment'
import { BookHistoryService } from '../../Services/BookHistoryService/BookHistoryService';
import AsyncStorage from '@react-native-community/async-storage'
import Loading from '../../Components/Loader/Loading'
import { TabView, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import { appModel } from '../../Helpers/appModel';

const renderBookHistoryAllService = ({ item }) => (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.Allview}>
            <View style={{ marginTop: hp('1%'), marginLeft: hp('1%') }}>
                <Text style={{ fontSize: hp('2%'), color: '#193628' }}>{moment(item.appointmentdate).format('LL') + ' ' + item.timeslot.starttime}</Text>
            </View>
            <View style={{ marginTop: hp('1%'), marginLeft: hp('1%'), flexDirection: 'row', justifyContent: 'space-between', marginRight: hp('1%') }}>
                <Text style={{ fontSize: hp('2%'), color: '#193628' }}>{item.property.quentity} Quantity</Text>
            </View>
            <View style={{ marginTop: hp('1%'), marginLeft: hp('1%'), flexDirection: 'row', justifyContent: 'space-between', marginRight: hp('1%') }}>
                <Text style={{ fontSize: hp('2%'), color: '#193628' }}>Total</Text>
                <Text style={{ fontSize: hp('2%'), color: '#193628' }}>₹ {item.refid.charges}</Text>
                <Text style={{ fontSize: hp('2%'), color: '#FF1313', textTransform: 'capitalize' }}>{item.status}</Text>
            </View>
        </View>
    </View>
);

const FirstRoute = () => (
    <FlatList
        data={appModel.bookdata}
        renderItem={renderBookHistoryAllService}
        keyExtractor={item => `${item._id}`}
    />
);

const SecondRoute = () => (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
    </View>
);

const ThiredRoute = () => (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
    </View>
);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.userid = null;
        this.state = {
            _id: null,
            BookHistoryService: [],
            refreshing: false,
            loader: true,
            index: 0,
            routes: [
                { key: 'first', title: 'ALL' },
                { key: 'second', title: 'In Process' },
                { key: 'thired', title: 'Complated' },
            ],
        };
    }

    _handleIndexChange = index => this.setState({ index });
    _renderTabBar = props => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    const color = Animated.color(
                        Animated.round(
                            Animated.interpolate(props.position, {
                                inputRange,
                                outputRange: inputRange.map(inputIndex =>
                                    inputIndex === i ? 255 : 0
                                ),
                            })
                        ),
                        0,
                        0
                    );
                    return (
                        <TouchableOpacity
                            style={styles.tabItem}
                            onPress={() => this.setState({ index: i })}>
                            <Animated.Text style={{ color }}>{route.title}</Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    _renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        thired: ThiredRoute,
    });

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
            appModel.bookdata = data
            this.wait(1000).then(() => this.setState({ loader: false }));
        })
    }

    setstateFilter = async (status) => {
        if (status !== 'ALL') {
            let datalist = dataObj.filter(x => x.status == status)
            this.setState({ datalist: datalist })
        }
        else {
            this.setState({ datalist: dataObj })
        }
        await this.setState({ status: status });
    }

    renderItem = ({ item, index }) => {
        return (
            <View key={index} style={styles.itemContainer}>
                <View style={styles.itemBody}>
                    <Text style={styles.itemName}>{item.name}</Text>
                </View>
            </View>
        )
    }

    render() {
        const { BookHistoryService, refreshing, loader, status } = this.state;
        this.wait(3000).then(() => this.setState({ refreshing: false }));

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} tintColor="green"
                    title="Pull to refresh" tintColor="#00C464" titleColor="#00C464" colors={["#00C464"]} onRefresh={this.onRefresh} />}
                    showsVerticalScrollIndicator={false}>
                    <TabView
                        navigationState={this.state}
                        renderScene={this._renderScene}
                        renderTabBar={this._renderTabBar}
                        onIndexChange={this._handleIndexChange}
                    />
                </ScrollView>
                <View style={{ marginBottom: 60 }}></View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    tabBar: {
        flexDirection: 'row',
        paddingTop: 10,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    Allview: {
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