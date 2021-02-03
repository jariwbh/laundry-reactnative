import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar
} from 'react-native';
import NavigationApp from './src/Navigations/Navigations';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#00C464" barStyle="light-content" />
      <NavigationApp />
    </SafeAreaView>
  );
};

export default App;
