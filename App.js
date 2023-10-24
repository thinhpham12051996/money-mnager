/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Platform} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import 'react-native-gesture-handler';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import StatusBar from './src/components/StatusBar';
import {colors} from './src/constants/colors';
import SplashScreen from 'react-native-splash-screen';
import {isAndroid} from './src/utils/deviceInfo';

const App = () => {
  useEffect(() => {
    if (isAndroid) {
      setTimeout(() => SplashScreen.hide(), 200);
    }
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <View style={{flex: 1}}>
          <StatusBar />
          <SafeAreaView
            style={[styles.container, {backgroundColor: colors.statusBar}]}
            edges={['right', 'left', 'bottom']}>
            <NavigationContainer>
              <Navigation />
            </NavigationContainer>
          </SafeAreaView>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
