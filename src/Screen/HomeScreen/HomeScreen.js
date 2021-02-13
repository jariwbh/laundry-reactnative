import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, BackHandler, RefreshControl, FlatList, StatusBar } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Loader from '../../Components/Loader/Loader'
import { CategoryService } from '../../Services/CategoryService/CategoryService';
import HTML from 'react-native-render-html'

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceList: [],
            loader: true,
            refreshing: false,
        };
        this._unsubscribeSiFocus = this.props.navigation.addListener('focus', e => {
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        });

        this._unsubscribeSiBlur = this.props.navigation.addListener('blur', e => {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton,
            );
        });
    }

    wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    onRefresh = () => {
        this.setState({ refreshing: true })
        this.getServiceList();
        this.wait(3000).then(() => this.setState({ refreshing: false }));
    }

    getServiceList() {
        CategoryService().then(response => {
            this.setState({ serviceList: response })
        })
    }

    componentDidMount() {
        this.getServiceList();
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

    renderServiceList = ({ item }) => (
        <View style={styles.listview}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ServiceDetailsScreen', { item })}>
                <Image source={{ uri: item.gallery[0].attachment }} resizeMode='stretch' style={{
                    width: wp('93%'), height: hp('30%'), borderRadius: hp('0.5%')
                }}
                />
                <View style={{ marginTop: hp('1%'), marginLeft: hp('1%') }}>
                    <Text style={{ fontSize: hp('3%'), fontWeight: '600', textTransform: 'capitalize' }}>{item.title}</Text>
                </View>
                <View style={{ marginTop: hp('1%'), marginLeft: hp('1%'), marginRight: hp('1%') }}>
                    <HTML baseFontStyle={{ fontSize: hp('2%'), textTransform: 'capitalize' }} html={`<html> ${item.description.length < 100 ? `${item.description}` : `${item.description.substring(0, 100)}...`} </html>`} />
                </View>
            </TouchableOpacity>
        </View>
    )

    render() {
        const { serviceList, loader, refreshing } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
                {serviceList == null || serviceList.length == 0 ? <Loader /> :
                    <>
                        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} tintColor="green"
                            title="Pull to refresh" tintColor="#00C464" titleColor="#00C464" colors={["#00C464"]} onRefresh={this.onRefresh} />}
                            showsVerticalScrollIndicator={false}>
                            <View style={{ alignItems: 'center', marginTop: hp('1%'), flex: 1, }}>
                                <FlatList
                                    data={serviceList}
                                    renderItem={this.renderServiceList}
                                    keyExtractor={item => `${item._id}`}
                                />
                            </View>
                            <View style={{ marginBottom: hp('12%') }}></View>
                        </ScrollView>
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
    menu: {
        height: hp('5%'),
        width: wp('10%'),
        backgroundColor: '#FFFFFF',
        borderRadius: hp('7%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: hp('2%'),
    },
    listview: {
        flexDirection: 'column',
        borderRadius: hp('2%'),
        backgroundColor: "#FFFFFF",
        width: wp('93%'),
        height: hp('45%'),
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        elevation: 2,
        margin: hp('1%')
    },
})