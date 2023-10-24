import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../constants/colors';
import { windowWidth } from '../utils/deviceInfo';

const WrongInputWarning = ({ warningText, style }) => {
  return (
    <View style={[styles.warningWrapper, style]}>
      <Icon name={'alert'} size={20} color={colors.white} />
      <Text style={styles.errorText}>{warningText}</Text>
    </View>
  )
}

export default WrongInputWarning

const styles = StyleSheet.create({
  warningWrapper: {
    alignSelf: 'center',
    width: windowWidth - 60,
    paddingVertical: 6,
    backgroundColor: "red",
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
    marginHorizontal: 20
  },
  errorText: {
    width: windowWidth - 115,
    fontSize: 12,
    // fontFamily: 'Karla-SemiBold',
    color: colors.white,
    marginLeft: 10
  }
})