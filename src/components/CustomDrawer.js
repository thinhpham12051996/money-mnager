/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {windowWidth} from '../utils/deviceInfo';

const CustomDrawer = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <View>
          <Image
            style={{
              resizeMode: 'contain',
              width: windowWidth * 0.51,
              height: windowWidth * 0.39,
              marginBottom: 20,
            }}
            source={require('../../assets/Image/logo.png')}
          />
        </View>
        <Text style={{fontSize: 16}}>Don't forget to add your</Text>
        <Text style={{fontSize: 16}}> expenses everday.</Text>
      </View>
      <TouchableOpacity
        title={'Submit'}
        onPress={() => navigation.navigate('Login')}
        style={styles.buttonStyle}>
        <Text style={{color: '#fff', fontWeight: 700, fontSize: 17}}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#07295B',
    marginHorizontal: 100,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 80,
  },
});
