import React, { useEffect } from 'react';
import {
  View,
  StatusBar,
  ImageBackground,
  Dimensions,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MyPermissionController from '../../Helpers/appPermission'

function SplashScreen(props) {
  useEffect(() => {
    async function fetchMyAPI() {
      var getUser = await AsyncStorage.getItem('@authuserlaundry')
      var userData;
      userData = JSON.parse(getUser)
      if (userData != null) {
        // if (userData && userData.property && userData.property.address) {
        return props.navigation.navigate('TabNavigation')
        // } else {
        //   return props.navigation.navigate('MapScreen')
        // }
      } else {
        props.navigation.navigate('LoginScreen')
      }
    }

    setTimeout(() => {
      fetchMyAPI();
    }, 3000);

    setTimeout(
      () =>
        MyPermissionController.checkAndRequestStoragePermission()
          .then((granted) => console.log('>Storage Permission Granted'))
          .catch((err) => console.log(err)),
      500,
    );
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
          height: 200,
        }}>
        <Animated.Image
          resizeMode="center"
          style={{
            width: 100,
            height: 50,
          }}
          source={require('../../assets/Image/Logo.png')}
        />
      </View>
    </ImageBackground>
  );
}

export default SplashScreen;
