import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

const TermsAndConditionScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={{ marginLeft: hp('3%'), marginRight: hp('3%') }}>
                    <Text style={{ fontSize: hp('2%'), textAlign: 'auto', flex: 1 }}>
                        The services provided by Laundry Chief are subject to your compliance with and acceptance of the terms and conditions set forth below.
                        Your use of Laundry Chief services(“Services”) indicates your agreement to be bound by the terms and conditions contained herein.</Text>
                </View>
                <View style={{ marginLeft: hp('3%'), margin: hp('1%') }}>
                    <Text style={{ fontSize: hp('2%'), fontWeight: 'bold' }}>Payment</Text>
                </View>
                <View style={{ marginLeft: hp('3%'), marginRight: hp('3%') }}>
                    <Text style={{ textAlign: 'auto', fontSize: hp('2%'), flex: 1 }}>The customer must complete payment of the agreed upon charges on or before the completion of the Services. All payments are non-refundable.</Text>
                </View>
                <View style={{ marginLeft: hp('3%'), margin: hp('1%') }}>
                    <Text style={{ fontSize: hp('2%'), fontWeight: 'bold' }}>Inventory</Text>
                </View>
                <View style={{ marginLeft: hp('3%'), marginRight: hp('3%') }}>
                    <Text style={{ textAlign: 'auto', fontSize: hp('2%'), flex: 1 }}>Laundry Chief is not responsible for any items not listed on the Collection Slip. The Customer agrees to be bound by the content of the Collection Slip.</Text>
                </View>
                <View style={{ marginLeft: hp('3%'), margin: hp('1%') }}>
                    <Text style={{ fontSize: hp('2%'), fontWeight: 'bold' }}>Garment Care</Text>
                </View>
                <View style={{ marginLeft: hp('3%'), marginRight: hp('3%') }}>
                    <Text style={{ textAlign: 'auto', fontSize: hp('2%'), flex: 1 }}>Laundry Chief will use reasonable efforts to maintain a high-quality cleaning service. Laundry Chief accepts no liability for damage due to normal cleaning of items with or without care instructions, or for dry clean only items, which are requested to be laundered by the Customer. </Text>
                </View>
                <View style={{ marginLeft: hp('3%'), margin: hp('1%') }}>
                    <Text style={{ fontSize: hp('2%'), fontWeight: 'bold' }}>Loss or Damage</Text>
                </View>
                <View style={{ marginLeft: hp('3%'), marginRight: hp('3%') }}>
                    <Text style={{ textAlign: 'auto', fontSize: hp('2%'), flex: 1 }}>Missing or damaged items must be reported to Laundry Chief at the time of delivery of your garments/linen. Failure to report the missing or damaged on delivery shall remove any liability of Laundry Chief for the missing or damaged item.</Text>
                </View>
                <View style={{ marginLeft: hp('3%'), margin: hp('1%') }}>
                    <Text style={{ fontSize: hp('2%'), fontWeight: 'bold' }}>Uncollected Items</Text>
                </View>
                <View style={{ marginLeft: hp('3%'), marginRight: hp('3%') }}>
                    <Text style={{ textAlign: 'auto', fontSize: hp('2%'), flex: 1 }}>Laundry Chief reserves the right to dispose of any items not collected within 120 days of the date stated on the collection slip. Laundry Chief shall have no liability whatsoever in respect of items disposed of pursuant to this clause.</Text>
                </View>
                <View style={{ marginLeft: hp('3%'), margin: hp('1%') }}>
                    <Text style={{ fontSize: hp('2%'), fontWeight: 'bold' }}>Use of Third-Party Service Providers</Text>
                </View>
                <View style={{ marginLeft: hp('3%'), marginRight: hp('3%') }}>
                    <Text style={{ textAlign: 'auto', fontSize: hp('2%'), flex: 1 }}>Laundry Chief reserves the right to utilize any outsourcer, vendor, or outside service provider for any service, without notice to the customer. </Text>
                </View>
                <View style={{ marginBottom: hp('15%') }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default TermsAndConditionScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
})