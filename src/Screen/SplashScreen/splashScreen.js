import React, { useEffect } from 'react';
import {
  View,
  StatusBar,
  ImageBackground,
  Dimensions,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

function SplashScreen(props) {
  useEffect(() => {
    async function fetchMyAPI() {
      var getUser = await AsyncStorage.getItem('@authuserlaundry')
      if (getUser != null) {
        props.navigation.navigate('TabNavigation')
      } else {
        props.navigation.navigate('LoginScreen')
      }
    }

    setTimeout(() => {
      fetchMyAPI();
    }, 3000);
  }, []);

  const { width, height } = Dimensions.get('screen');
  return (
    <ImageBackground
      imageStyle={{ width, height }}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
      }}
    >
      <StatusBar backgroundColor="#FFFFFF" barStyle="light-content" />
      <View
        style={{
          width: '85%',
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: 350,
        }}>
        <Animated.Image
          resizeMode="center"
          style={{
            width: 300,
            height: 200,
          }}
          source={require('../../assets/Image/Logo.png')}
        />
      </View>
    </ImageBackground>
  );
}

export default SplashScreen;
