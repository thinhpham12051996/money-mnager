import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const TopnavBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navbarContaint}>
      {/* <TouchableOpacity
        style={styles.menuStyle}
        onPress={() => navigation.openDrawer()}>
        <Feather name="menu" size={30} color="#000" />
      </TouchableOpacity> */}
      <Text style={styles.kachingText}>Money Manager</Text>
    </View>
  );
};

export default TopnavBar;

const styles = StyleSheet.create({
  navbarContaint: {
    flexDirection: 'row',
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  menuStyle: {
    marginRight: 20,
  },
  kachingText: {
    color: '#000',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 500,
  },
});
