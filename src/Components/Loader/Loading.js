import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Button,
    ActivityIndicator
} from 'react-native';

const Loading = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <ActivityIndicator color='#00C464' size="small" />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
});

export default Loading;