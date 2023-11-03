import React from 'react';
import {StatusBar as StatusBarRN, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isIOS} from '../utils/deviceInfo';
import {colors} from '../constants/colors';

const StatusBar = React.memo(() => {
  const insets = useSafeAreaInsets();
  if (isIOS) {
    return (
      <View style={[styles.statusbarWrapper, {height: insets.top}]}>
        <StatusBarRN backgroundColor={'transparent'} barStyle="dark-content" />
      </View>
    );
  }
  return (
    <StatusBarRN backgroundColor={'transparent'} barStyle="light-content" />
  );
});

export default StatusBar;

const styles = StyleSheet.create({
  statusbarWrapper: {
    width: '100%',
    backgroundColor: 'transparent',
  },
});
