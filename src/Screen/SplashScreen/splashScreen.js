import { CommonActions } from '@react-navigation/native';
import React, { Component } from 'react';
import {
  View,
  Image,
  StatusBar,
  ImageBackground,
  Dimensions,
  Animated,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import NavigationApp from '../../Navigations/Navigations';


class SplashScreen extends Component {
  constructor() {
    super();
    this.state = {
      processing: false
    };
  }

  componentDidMount() {
    this.setState({ processing: true });
    setTimeout(() => {
      this.setState({ processing: false });
    }, 2000);
  }

  render() {
    const { width, height } = Dimensions.get('screen');
    const { processing } = this.state;

    return (
      <>
        { processing == true ?
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
          </ImageBackground> : <NavigationApp />
        }
      </>
    );
  }
}

export default SplashScreen;
