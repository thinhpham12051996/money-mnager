/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import 'react-native-gesture-handler';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import StatusBar from './src/components/StatusBar';
import {colors} from './src/constants/colors';
import SplashScreen from 'react-native-splash-screen';
import {isAndroid} from './src/utils/deviceInfo';
import MyContext, {WithState} from './src/states';
import {WebView} from 'react-native-webview';

const App = () => {
  const [generatedToken, setGeneratedToken] = useState();
  const {isOpenHelper} = useContext(MyContext);

  useEffect(() => {
    if (isAndroid) {
      setTimeout(() => SplashScreen.hide(), 200);
    }
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <StatusBar />

        {!isOpenHelper && (
          <SafeAreaView
            style={[styles.container, {backgroundColor: colors.statusBar}]}
            edges={['right', 'left', 'bottom']}>
            <View style={{flex: 1}}>
              <NavigationContainer>
                <Navigation />
              </NavigationContainer>
            </View>
          </SafeAreaView>
        )}
        {isOpenHelper && (
          <WebView
            style={{
              flex: 1,
            }}
            source={{
              uri: 'https://www.finfrenzy.games/',
            }}
          />
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default WithState(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
