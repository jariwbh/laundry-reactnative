import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, StyleSheet, SafeAreaView, FlatList, RefreshControl } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import moment from 'moment'
import { BookHistoryService } from '../../Services/BookHistoryService/BookHistoryService';
import AsyncStorage from '@react-native-community/async-storage'
import Loading from '../../Components/Loader/Loader'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.userid = null;
        this.state = {
            _id: null,
            BookHistoryService: [],
            refreshing: false,
            loader: true,
            status: 'ALL',
            listTab: [
                {
                    _id: '1',
                    status: 'ALL'
                },
                {
                    _id: '2',
                    status: 'In Process'
                },
                {
                    _id: '3',
                    status: 'Complated'
                }
            ]
        };
        this.setstateFilter = this.setstateFilter.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }

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

    onRefresh = async () => {
        const { _id } = this.state;
        this.setState({ refreshing: true });
        await this.BookHistoryService(_id);
        this.wait(3000).then(() => this.setState({ refreshing: false }));
    }

    componentDidMount() {
        this.getdata()
    }

    async BookHistoryService(id) {
        await BookHistoryService(id).then(data => {
            this.setState({ BookHistoryService: data })
            this.wait(1000).then(() => this.setState({ loader: false }));
        })
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

    setstateFilter = status => {
        this.setState({ status: status })
    }

    renderFirstRoute = ({ item }) => (
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
                    {item.status == "requested" &&
                        <Text style={{ fontSize: hp('2%'), textTransform: 'capitalize', color: '#3788D8' }}>{item.status}</Text>
                    }
                    {item.status == "confirmed" &&
                        <Text style={{ fontSize: hp('2%'), textTransform: 'capitalize', color: '#9C27B0' }}>{item.status}</Text>
                    }
                    {item.status == "checkout" &&
                        <Text style={{ fontSize: hp('2%'), textTransform: 'capitalize', color: '#4CAF50' }}>{item.status}</Text>
                    }
                    {item.status == "cancel" &&
                        <Text style={{ fontSize: hp('2%'), textTransform: 'capitalize', color: '#F44336' }}>{item.status}</Text>
                    }
                    {item.status == "noshow" &&
                        <Text style={{ fontSize: hp('2%'), textTransform: 'capitalize', color: '#FF9800' }}>{item.status}</Text>
                    }
                </View>
            </View>
        </View>
    );

    renderSecondRoute = ({ item }) => (
        item.status == "requested" &&
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
                    {item.status == "requested" &&
                        <Text style={{ fontSize: hp('2%'), textTransform: 'capitalize', color: '#3788D8' }}>{item.status}</Text>
                    }
                </View>
            </View>
        </View>
    );

    renderThiredRoute = ({ item }) => (
        item.status == "checkout" &&
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
                    {item.status == "checkout" &&
                        <Text style={{ fontSize: hp('2%'), textTransform: 'capitalize', color: '#9C27B0' }}>{item.status}</Text>
                    }
                </View>
            </View>
        </View>
    );

    render() {
        const { refreshing, loader, BookHistoryService, status } = this.state;
        this.wait(3000).then(() => this.setState({ refreshing: false }));

        return (
            <SafeAreaView style={styles.container}>
                {(BookHistoryService == null) || (BookHistoryService && BookHistoryService.length == 0)
                    ?
                    (loader == false ?
                        <View style={{ alignItems: "center", justifyContent: 'center', marginTop: ('30%') }}>
                            <Text style={{ alignItems: "center", justifyContent: 'center', fontSize: hp('2%'), color: '#595959' }}>Data Not Available</Text>
                        </View>
                        : <View style={{ marginTop: hp('15%') }}><Loading /></View>
                    )
                    :
                    <>
                        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} tintColor="green"
                            title="Pull to refresh" tintColor="#00C464" titleColor="#00C464" colors={["#00C464"]} onRefresh={this.onRefresh} />}
                            showsVerticalScrollIndicator={false}>
                            <View style={styles.listTab}>
                                {
                                    this.state.listTab.map(e => (
                                        <TouchableOpacity
                                            style={[styles.btnTab, status == e.status && styles.btnTabActive]} onPress={() => this.setstateFilter(e.status)}
                                        >
                                            <Text style={styles.textTab, status == e.status ? styles.textTabActive : styles.textTabInActive}>{e.status}</Text>
                                        </TouchableOpacity>
                                    ))
                                }

                            </View>

                            {status == 'ALL' &&
                                <FlatList
                                    data={this.state.BookHistoryService}
                                    renderItem={this.renderFirstRoute}
                                    keyExtractor={item => `${item._id}`}
                                />
                            }

                            {status == 'In Process' &&
                                <FlatList
                                    data={this.state.BookHistoryService}
                                    renderItem={this.renderSecondRoute}
                                    keyExtractor={item => `${item._id}`}
                                />
                            }

                            {status == 'Complated' &&
                                <FlatList
                                    data={this.state.BookHistoryService}
                                    renderItem={this.renderThiredRoute}
                                    keyExtractor={item => `${item._id}`}
                                />
                            }
                        </ScrollView>
                        <View style={{ marginBottom: 60 }}></View>
                    </>
                }
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
    listTab: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 20
    },
    btnTab: {
        width: Dimensions.get('window').width / 3.3,
        flexDirection: 'row',
        borderColor: '#00C464',
        borderWidth: 1,
        padding: 10,
        justifyContent: 'center'
    },
    textTab: {
        fontSize: 16
    },
    btnTabActive: {
        backgroundColor: '#00C464'
    },
    textTabActive: {
        color: '#FFF'
    },
    textTabInActive: {
        color: '#00C464'
    },
    itemContainer: {
        flexDirection: 'row',
        paddingVertical: 15
    }
})